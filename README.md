# Scrapinator

A personal tool I built to keep tabs on vintage and archival clothing across multiple Shopify stores. Live at **[concal.io](https://concal.io)**.

## What it does

Scrapy spiders crawl a curated list of Shopify stores by hitting their `/products.json` endpoints, pulling listings, prices, availability, and images. Everything gets stored in MongoDB and served through a FastAPI backend to a React frontend that lets me browse and save items I'm interested in. This could theoritically scale to scrape any Shopify storefront, since they all natively support the `/products.json` route.

The scraper handles pagination, tracks whether items are still available, and de-duplicates listings using a composite key of store domain + product slug.

## Stack

**Backend:** Python, FastAPI, Scrapy, MongoDB (pymongo)

**Frontend:** React 19, TypeScript, Vite, Tailwind v4, shadcn/ui

**Deployed on:** Koyeb (API) + custom domain (frontend)

## Architecture

```
backend/
  api/
    main.py               # FastAPI app + MongoDB connection
    routes.py             # /products endpoints
    product_scraper/      # Scrapy project
      spiders/
        shopify_scraper.py  # main spider — crawls Shopify store APIs
      pipelines.py          # MongoDB upsert pipeline

frontend/
  src/
    components/           # hand-written UI components
    generated/            # shadcn-generated components (untouched)
    containers/           # page-level components
    api/                  # API client
```

## API

| Method | Path                       | Description                                 |
| ------ | -------------------------- | ------------------------------------------- |
| POST   | `/products/search`         | Filtered + paginated product listing        |
| POST   | `/products/save`           | Save a product (auth required)              |
| POST   | `/products/unsave`         | Unsave a product (auth required)            |
| GET    | `/products/saved-products` | Retrieve saved product list (auth required) |
