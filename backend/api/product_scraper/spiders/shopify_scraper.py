import json
import logging
import scrapy
from urllib.parse import urlparse
from datetime import datetime


def get_domain_from_url(response):
    parsed_uri = urlparse(response.url)
    domain = "{uri.netloc}".format(uri=parsed_uri)
    return domain


def format_urls(urls):
    def format_url(url):
        return f"https://{url}/products.json?limit=250&page=1"

    return list(map(format_url, urls))


# TODO: Store this in DB
stores = {
    "groupie.store": "Groupie",
    "lostfilesnyc.com": "Lost Files NYC",
    "twofoldvintage.com": "Two Fold Vintage",
}


class ShopifyScraperSpider(scrapy.Spider):
    name = "shopify_scraper"
    allowed_domains = list(stores.keys())
    start_urls = format_urls(stores.keys())

    custom_settings = {
        "ITEM_PIPELINES": {
            "product_scraper.pipelines.MongoPipeline": 1000,
        },
    }

    def parse(self, response):
        try:
            logging.getLogger("pymongo").setLevel(logging.WARN)
            logging.getLogger("scrapy").setLevel(logging.WARNING)
            logging.getLogger("protego").setLevel(logging.WARN)

            data = json.loads(response.text)
            products = data.get("products", [])
            product_domain = get_domain_from_url(response)

            for product in products:
                product_data = {
                    "_id": None,
                    "available": False,
                    "name": product.get("title", "").strip(),
                    "price": None,
                    "product_url": None,
                    "sizes": [],
                    "source": stores.get(product_domain),
                    "thumbnail_url": None,
                    "created_at": datetime.fromisoformat(product.get("created_at", "")),
                    "published_at": datetime.fromisoformat(
                        product.get("published_at", "")
                    ),
                    "scraped_at": datetime.today(),
                    "deleted_by_merchant": False,
                }

                # Get product URL (handle is the URL slug)
                slug = product.get("handle", "")
                product_data["product_url"] = (
                    f"https://{product_domain}/products/{slug}"
                )

                # Get thumbnail image URL
                images = product.get("images", [])
                if len(images) > 0:
                    product_data["thumbnail_url"] = images[0].get("src", "")

                # Get price and availability
                variants = product.get("variants", [])
                prices = []
                for variant in variants:
                    price = variant.get("price")
                    prices.append(int(float(price) * 100))
                    if variant.get("available"):
                        product_data["available"] = True
                product_data["price"] = min(prices)

                # TODO: # Get size options
                # sizes = []
                # for option in product.get('options', []):
                #     option_name = option.get('name', '').lower()
                #     if option_name in ['size', 'sizes']:
                #         sizes = option.get('values', [])
                #         break
                # product_data['sizes'] = sizes

                # Combines the domain and slug to create the id
                product_data["_id"] = f"{product_domain}-{slug}"

                # Only yield products that have essential data
                if product_domain and slug:
                    yield product_data

            # Check if we need to fetch the next page

            # If we got 250 products, there might be more pages
            if len(products) == 250:
                if "?limit=250&page=" in response.url:
                    # Extract current page number
                    page_param = response.url.split("page=")[1]
                    current_page = (
                        int(page_param.split("&")[0])
                        if "&" in page_param
                        else int(page_param)
                    )
                else:
                    current_page = 1
                next_page = current_page + 1
                next_url = (
                    f"https://{product_domain}/products.json?limit=250&page={next_page}"
                )
                yield response.follow(next_url, callback=self.parse)

        except json.JSONDecodeError as e:
            self.logger.error(f"Failed to parse JSON response from {response.url}: {e}")
        except Exception as e:
            self.logger.error(f"Error processing products from {response.url}: {e}")
