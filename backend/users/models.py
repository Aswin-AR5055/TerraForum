from mongoengine import Document, StringField, DateTimeField
from datetime import datetime

class User(Document):
    username = StringField(required=True, unique=True)
    password = StringField(required=True)
    profile_picture = StringField(default="")
    created_at = DateTimeField(default=datetime.utcnow)

    meta = {
        "collection": "users"
    }