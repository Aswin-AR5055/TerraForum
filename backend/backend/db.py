import mongoengine
import os

def db_connect():
    mongoengine.connect(
        db=os.getenv("DB_NAME"),
        host=os.getenv("DB_HOST"),
        port=int(os.getenv("DB_PORT")),
    )