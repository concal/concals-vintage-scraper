BOT_NAME = "concal scraper"

SPIDER_MODULES = ["product_scraper.spiders"]
NEWSPIDER_MODULE = "product_scraper.spiders"

ADDONS = {}

# USER_AGENT = "scraper (+http://www.yourdomain.com)"

ROBOTSTXT_OBEY = True

CONCURRENT_REQUESTS_PER_DOMAIN = 1
DOWNLOAD_DELAY = 1

FEED_EXPORT_ENCODING = "utf-8"
