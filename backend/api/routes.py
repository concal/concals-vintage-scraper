import os
from fastapi import APIRouter, Body, Request
from typing import List
from models import Product
from models import ProductFilters
from run_scraper import run


router = APIRouter()

sort_direction = {
    "DESC": -1,
    "ASC": 1,
}

sort_fields = {
    "PUBLISHED_AT": "published_at",
    "PRICE": "price",
}


# Serves scrape script at url to be used by cron job
@router.get("/scrape", include_in_schema=False)
def scrape_script():
    run()


@router.post(
    "/search", response_description="Search for products", response_model=List[Product]
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
    sort = sort_fields[filters.sort]
    direction = sort_direction[filters.sort_direction]

    # pagination
    limit = filters.limit
    page = filters.page

    products = list(
        request.app.db[os.environ.get("MONGO_COLLECTION_NAME")]
        .find(query)
        .sort(sort, direction)
        .skip((page - 1) * limit)
        .limit(limit)
    )
    return products
