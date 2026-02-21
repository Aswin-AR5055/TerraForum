import jwt
from django.conf import settings
from rest_framework.response import Response
from rest_framework import status


def jwt_required(view_func):

    def wrapper(request, *args, **kwargs):

        auth_header = request.headers.get("Authorization") or request.META.get("HTTP_AUTHORIZATION")

        if not auth_header:
            return Response(
                {"error": "Authorization header missing"},
                status=status.HTTP_401_UNAUTHORIZED
            )

        try:
            token = auth_header.split(" ")[1]

            payload = jwt.decode(
                token,
                settings.JWT_SECRET,
                algorithms=[settings.JWT_ALGORITHM]
            )

            request.user = payload

        except jwt.ExpiredSignatureError:
            return Response(
                {"error": "Token expired"},
                status=status.HTTP_401_UNAUTHORIZED
            )

        except jwt.InvalidTokenError:
            return Response(
                {"error": "Invalid token"},
                status=status.HTTP_401_UNAUTHORIZED
            )

        return view_func(request, *args, **kwargs)

    return wrapper
