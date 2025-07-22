from product_scraper.spiders.shopify_scraper import ShopifyScraperSpider
from scrapy.crawler import CrawlerProcess
from scrapy.utils.project import get_project_settings


def run():
    settings = get_project_settings()
    process = CrawlerProcess(settings)
    process.crawl(ShopifyScraperSpider)
    process.start()
