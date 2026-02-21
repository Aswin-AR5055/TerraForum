import mongoengine
import os

def db_connect():
    mongoengine.connect(
        db=os.getenv("DB_NAME", "terraforum"),
        host=os.getenv("DB_HOST", 'localhost'),
        port=int(os.getenv("DB_PORT", 27017)),
    )