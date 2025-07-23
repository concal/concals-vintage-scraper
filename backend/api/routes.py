import os

from fastapi import APIRouter, Body, Request

from models import ProductResponse, ProductFilters
from constants import SORT_DIRECTION, SORT_FIELDS
from run_scraper import run_scraper


router = APIRouter()


# ===================
# = Scrape endpoint =
# ===================
@router.get("/scrape", include_in_schema=False)
def scrape_script():
    run_scraper()


# ==================
# = Clean endpoint =
# ==================
# @router.get("/clean", include_in_schema=False)
# def clean_script(request: Request):
#     run_cleanup(request)


# ===================
# = Search endpoint =
# ===================
@router.post(
    "/search",
    response_description="Search for products",
    response_model=ProductResponse,
)
def list_all_products(request: Request, filters: ProductFilters = Body(...)):
    # filters
    query = {}
    if filters.available is not None:
        query["available"] = filters.available
    if filters.price_min is not None:
        query["price"] = {"$gte": filters.price_min}
    if filters.price_max is not None:
        query["price"] = {"$lte": filters.price_max}
    if filters.price_max is not None and filters.price_min is not None:
        query["price"] = {"$gte": filters.price_min, "$lte": filters.price_max}

    # sort
    direction = SORT_DIRECTION[filters.sort_direction]
    sort = SORT_FIELDS[filters.sort]

    # pagination
    limit = filters.limit
    page = filters.page

    all_products = list(
        request.app.db[os.environ.get("MONGO_COLLECTION_NAME")]
        .find(query, {"_id": False})
        .sort(sort, direction)
    )

    products = all_products[(page - 1) * limit : page * limit]
    count = len(all_products)

    return {"products": products, "count": count}
