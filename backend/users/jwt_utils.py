import jwt
from datetime import datetime, timedelta
from django.conf import settings


def generate_jwt(user):
    payload = {
        "user_id": str(user.id),
        "username": user.username,
        "exp": datetime.utcnow() + timedelta(seconds=settings.JWT_EXP_DELTA_SECONDS),
        "iat": datetime.utcnow()
    }

    token = jwt.encode(
        payload,
        settings.JWT_SECRET,
        algorithm=settings.JWT_ALGORITHM
    )

    return token