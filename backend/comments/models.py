from mongoengine import Document, StringField, DateTimeField
from datetime import datetime

class Comment(Document):
    post_id = StringField(required=True)
    author_id = StringField(required=True)
    author_username = StringField(required=True)
    content = StringField(required=True)
    created_at = DateTimeField(default=datetime.utcnow)

    meta = {
        "collection": "comments",
    }