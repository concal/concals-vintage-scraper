import os
from pymongo import MongoClient
from pymongo import UpdateOne
from dotenv import load_dotenv
from itemadapter import ItemAdapter

load_dotenv("../../.env")


class MongoPipeline:
    collection_name = os.environ.get("MONGO_COLLECTION_NAME")
    updates = []

    def __init__(self, mongo_uri, mongo_db):
        self.mongo_uri = mongo_uri
        self.mongo_db = mongo_db

    @classmethod
    def from_crawler(cls, crawler):
        return cls(
            mongo_uri=os.environ.get("MONGO_URI"),
            mongo_db=os.environ.get("MONGO_DB_NAME"),
        )

    def open_spider(self, spider):
        self.client = MongoClient(self.mongo_uri)
        self.db = self.client[self.mongo_db]

    def close_spider(self, spider):
        # bulk upsert all updates
        if len(self.updates) > 0:
            self.db[self.collection_name].bulk_write(self.updates)
        self.client.close()

    def process_item(self, item, spider):
        # store updates for one single bulk upsert
        self.updates.append(
            UpdateOne(
                {"_id": item["_id"]}, {"$set": ItemAdapter(item).asdict()}, upsert=True
            )
        )
        return item
