import os
from fastapi import APIRouter, Request
from dotenv import dotenv_values
from typing import List

from models import Product


router = APIRouter()


@router.get('/all', response_description="List of all products", response_model=List[Product])
def list_all_products(request: Request):
    products = list(
        request.app.db[os.environ.get('MONGO_COLLECTION_NAME')].find())
    return products
