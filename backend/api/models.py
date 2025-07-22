from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional


class ProductFilters(BaseModel):
    available: Optional[bool] = None
    search_term: Optional[str] = None
    price_max: Optional[int] = None
    price_min: Optional[int] = None
    sizes: Optional[list[str]] = None
    source: Optional[str] = None
    limit: Optional[int] = 100
    page: Optional[int] = 1
    sort: Optional[str] = "CREATED_AT"
    sort_direction: Optional[str] = "DESC"

    class Config:
        validate_by_name = True
        json_schema_extra = {"example": {}}


class Product(BaseModel):
    available: bool = Field()
    created_at: datetime = Field()
    deleted_by_merchant: bool = Field()
    index: str = Field()
    published_at: datetime = Field()
    name: str = Field()
    price: int = Field()
    product_url: str = Field()
    scraped_at: datetime = Field()
    sizes: list[str] = Field()
    source: str = Field()
    thumbnail_url: Optional[str] = Field(default=None)

    class Config:
        validate_by_name = True
        json_schema_extra = {
            "example": {
                "available": True,
                "created_at": datetime.today(),
                "deleted_by_merchant": False,
                "index": "test.domain-super-cool-shirt",
                "published_at": datetime.today(),
                "name": "Super cool shirt",
                "price": 10000,
                "product_url": "https://google.com",
                "scraped_at": datetime.today(),
                "sizes": ["SM"],
                "source": "Super Cool Store",
                "thumbnail_url": "https://picsum.photos/200/300",
            }
        }
