import os
from fastapi import Request
from datetime import datetime, timedelta


def run_cleanup(request: Request):
    products = list(request.app.db[os.environ.get("MONGO_COLLECTION_NAME")].find())
    deletedProducts = []
    for product in products:
        if product.get("scraped_at") is None:
            product["deleted_by_merchant"] = True
            deletedProducts.append(product)
        # elif datetime.fromisoformat(product.get("published_at", "")):
        #     product["deleted_by_merchant"] = True
        #     deletedProducts.append(product)
        else:
            print(product.get("scraped_at"))
            print(datetime.now())
            print((datetime.now() - product.get("scraped_at")).total_seconds())

    print(deletedProducts)
