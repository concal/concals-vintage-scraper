from multiprocessing import Process
from scrapy.crawler import CrawlerProcess
from scrapy.utils.project import get_project_settings
from product_scraper.spiders.shopify_scraper import ShopifyScraperSpider


def execute_crawling():
    process = CrawlerProcess(get_project_settings())
    process.crawl(ShopifyScraperSpider)
    process.start()


def run_scraper():
    p = Process(target=execute_crawling)
    p.start()
    p.join()
