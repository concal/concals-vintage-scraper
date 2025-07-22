import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from pymongo import MongoClient
from routes import router
import logging

logging.getLogger("pymongo").setLevel(logging.WARN)

load_dotenv("../.env")

app = FastAPI()

# Add CORS middleware
allowed_origins = [
    "http://localhost:5173",
    "http://localhost:5173/",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup_db_client():
    app.client = MongoClient(os.environ.get("MONGO_URI"))
    app.db = app.client[os.environ.get("MONGO_DB_NAME")]
    try:
        app.client.admin.command("ping")
        print("Successfully connected to MongoDB!")
    except Exception as e:
        print(e)


@app.on_event("shutdown")
def shutdown_db_client():
    app.client.close()


app.include_router(router, tags=["Products"], prefix="/products")
