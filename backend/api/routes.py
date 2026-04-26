import os

from fastapi import APIRouter, Body, Request, BackgroundTasks, Header, HTTPException, Depends
from fastapi.responses import JSONResponse

from models import ProductResponse, ProductFilters, ProductIndexBody
from constants import SORT_DIRECTION, SORT_FIELDS
from run_scraper import run_scraper


router = APIRouter()


def verify_token(authorization: str = Header(None)):
    token = os.environ.get("ADMIN_TOKEN")
    if not token or authorization != f"Bearer {token}":
        raise HTTPException(status_code=401, detail="Unauthorized")


# =======================
# = Auth check endpoint =
# =======================
@router.get("/auth", dependencies=[Depends(verify_token)], include_in_schema=False)
def check_auth():
    return {}


# ===================
# = Scrape endpoint =
# ===================
@router.get("/scrape", include_in_schema=False)
def scrape_script(background_tasks: BackgroundTasks):
    background_tasks.add_task(run_scraper)

    return JSONResponse(
        content={"status": "success", "message": "Scraper started successfully"},
        status_code=200,
    )


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
    price_query = {}
    if filters.price_min is not None:
        price_query["$gte"] = filters.price_min
    if filters.price_max is not None:
        price_query["$lte"] = filters.price_max
    if price_query:
        query["price"] = price_query
    if filters.products is not None:
        query["index"] = {"$in": filters.products}

    # sort
    direction = SORT_DIRECTION[filters.sort_direction]
    sort = SORT_FIELDS[filters.sort]

    # pagination
    limit = filters.limit
    page = filters.page

    collection = request.app.db[os.environ.get("MONGO_COLLECTION_NAME")]
    count = collection.count_documents(query)
    products = list(
        collection
        .find(query, {"_id": False})
        .sort(sort, direction)
        .skip((page - 1) * limit)
        .limit(limit)
    )

    return {"products": products, "count": count}


# =================
# = Save endpoint =
# =================
@router.post("/save", response_description="Save product", dependencies=[Depends(verify_token)])
def save_product(request: Request, body: ProductIndexBody = Body(...)):

    productIndex = body.productIndex
    saved_products_collection = request.app.db["saved_products"]

    if saved_products_collection.count_documents({"user": "Concal"}, limit=1) < 1:
        saved_products_collection.insert_one({"user": "Concal", "products": []})

    saved_products_collection.update_one(
        {"user": "Concal"}, {"$push": {"products": productIndex}}
    )

    return {}


# ===================
# = Unsave endpoint =
# ===================
@router.post("/unsave", response_description="Unsave product", dependencies=[Depends(verify_token)])
def save_product(request: Request, body: ProductIndexBody = Body(...)):

    productIndex = body.productIndex
    saved_products_collection = request.app.db["saved_products"]

    if saved_products_collection.count_documents({"user": "Concal"}, limit=1) < 1:
        saved_products_collection.insert_one({"user": "Concal", "products": []})

    saved_products_collection.update_one(
        {"user": "Concal"}, {"$pull": {"products": productIndex}}
    )

    return {}


# ===============================
# = get saved products endpoint =
# ===============================
@router.get("/saved-products", response_description="Get saved products", dependencies=[Depends(verify_token)])
def get_saved_products(request: Request):

    saved_products_collection = request.app.db["saved_products"]
    saved_products = list(saved_products_collection.find({"user": "Concal"}))[0].get(
        "products"
    )

    return saved_products
