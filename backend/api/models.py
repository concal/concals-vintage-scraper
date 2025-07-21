from pydantic import BaseModel, Field
from datetime import datetime


class Product(BaseModel):
    id: str = Field(alias="_id")
    available: bool = Field()
    created_at: datetime = Field()
    name: str = Field()
    price: int = Field()
    product_url: str = Field()
    sizes: list[str] = Field()
    source: str = Field()
    thumbnail_url: str = Field()

    class Config:
        validate_by_name = True
        json_schema_extra = {
            "example": {
                "_id": "test.domain-super-cool-shirt",
                "available": True,
                "created_at": datetime.today(),
                "name": "Super cool shirt",
                "price": 10000,
                "product_url": "https://google.com",
                "sizes": ["SM"],
                "source": "Super Cool Store",
                "thumbnail_url": "https://picsum.photos/200/300"
            }
        }
