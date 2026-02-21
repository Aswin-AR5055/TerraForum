from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import User
from .serializers import RegisterSerializer, LoginSerializer
import bcrypt
from .jwt_utils import generate_jwt


@api_view(["POST"])
def register(request):

    serializer = RegisterSerializer(data=request.data)

    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    username = serializer.validated_data["username"]
    password = serializer.validated_data["password"]

    # Check if user exists
    if User.objects(username=username).first():
        return Response(
            {"error": "Username already exists"},
            status=status.HTTP_400_BAD_REQUEST
        )

    # Hash password
    hashed_password = bcrypt.hashpw(
        password.encode("utf-8"),
        bcrypt.gensalt()
    ).decode("utf-8")

    # Create user
    user = User(
        username=username,
        password=hashed_password
    )

    user.save()

    return Response(
        {"message": "User registered successfully"},
        status=status.HTTP_201_CREATED
    )

@api_view(["POST"])
def login(request):
    serializer = LoginSerializer(data=request.data)

    if not serializer.is_valid():
        return Response(serializer.error, status=status.HTTP_400_BAD_REQUEST)

    username = serializer.validated_data["username"]
    password = serializer.validated_data["password"]

    user = User.objects(username=username).first()

    if not user:
        return Response(
            {"error": "Invalid username or password"},
            status=status.HTTP_401_UNAUTHORIZED
        )

    if not bcrypt.checkpw(
        password.encode("utf-8"),
        user.password.encode("utf-8")
    ):

        return Response(
            {"error": "Invalid username or password"},
        )
    
    token = generate_jwt(user)

    return Response({
        "message": "Login successful",
        "token": token,
        "username": user.username
    })