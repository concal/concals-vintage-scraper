import os

from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from dotenv import load_dotenv

from constants import ALLOWED_ORIGINS
from routes import router


load_dotenv("../.env")


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Open client connection on start up
    app.client = MongoClient(os.environ.get("MONGO_URI"))
    app.db = app.client[os.environ.get("MONGO_DB_NAME")]
    try:
        app.client.admin.command("ping")
        print("Successfully connected to MongoDB!")
    except Exception as e:
        print(e)
    yield
    # Close client connection on shutdown
    app.client.close()


app = FastAPI(lifespan=lifespan)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router, tags=["Products"], prefix="/products")
