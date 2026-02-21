from mongoengine import Document, StringField, DateTimeField
from datetime import datetime

class Like(Document):

    post_id = StringField(required=True)
    user_id = StringField(required=True)

    created_at = DateTimeField(default=datetime.utcnow)

    meta = {
        "collection": "likes",
        "indexes": [
            ("post_id", "user_id")
        ]
    }