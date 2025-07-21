import os
from fastapi import APIRouter, Body, Request
from typing import List
from models import Product
from models import SearchFilters


router = APIRouter()

sort_direction = {
    "DESC": -1,
    "ASC": 1,
}

sort_fields = {
    "PUBLISHED_AT": "published_at",
    "PRICE": "price",
}


@router.post(
    "/search", response_description="Search for products", response_model=List[Product]
)
def list_all_products(request: Request, filters: SearchFilters = Body(...)):
    # filters
    query = {}
    if filters.available is not None:
        query["available"] = filters.available

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
