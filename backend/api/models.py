from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional


class ProductFilters(BaseModel):
    id: Optional[str] = Field(default="None", alias="_id")
    available: Optional[bool] = None
    search_term: Optional[str] = None
    price_max: Optional[int] = None
    price_min: Optional[int] = None
    sizes: Optional[list[str]] = None
    source: Optional[str] = None
    limit: Optional[int] = 100
    page: Optional[int] = 1
    sort: Optional[str] = "PUBLISHED_AT"
    sort_direction: Optional[str] = "DESC"

    class Config:
        validate_by_name = True
        json_schema_extra = {"example": {}}


class Product(BaseModel):
    id: str = Field(alias="_id")
    available: bool = Field()
    created_at: datetime = Field()
    published_at: datetime = Field()
    name: str = Field()
    price: int = Field()
    product_url: str = Field()
    sizes: list[str] = Field()
    source: str = Field()
    thumbnail_url: Optional[str] = Field(default=None)
    scraped_at: datetime = Field()
    deleted_by_merchant: bool = Field()

    class Config:
        validate_by_name = True
        json_schema_extra = {
            "example": {
                "_id": "test.domain-super-cool-shirt",
                "available": True,
                "published_at": datetime.today(),
                "published_at": datetime.today(),
                "name": "Super cool shirt",
                "price": 10000,
                "product_url": "https://google.com",
                "sizes": ["SM"],
                "source": "Super Cool Store",
                "thumbnail_url": "https://picsum.photos/200/300",
            }
        }
