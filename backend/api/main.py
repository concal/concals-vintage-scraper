import os
from fastapi import FastAPI
from dotenv import load_dotenv
from pymongo import MongoClient
from routes import router

load_dotenv("../.env")

app = FastAPI()


@app.on_event("startup")
def startup_db_client():
    app.client = MongoClient(os.environ.get("MONGO_URI"))
    app.db = app.client[os.environ.get("MONGO_DB_NAME")]
    try:
        app.client.admin.command('ping')
        print("Successfully connected to MongoDB!")
    except Exception as e:
        print(e)


@app.on_event("shutdown")
def shutdown_db_client():
    app.client.close()


app.include_router(router, tags=["Products"], prefix="/products")
