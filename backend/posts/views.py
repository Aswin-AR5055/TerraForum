from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Post
from .likes_models import Like
from .serializer import CreatePostSerializer 
from users.auth import jwt_required
from users.auth import jwt_required
from bson import ObjectId

@api_view(["POST"])
@jwt_required
def create_post(request):
    serializer = CreatePostSerializer(data=request.data)

    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    title = serializer.validated_data["title"]
    content = serializer.validated_data["content"]

    post = Post(
        title = title,
        content = content,
        author_id = request.user["user_id"],
        author_username = request.user["username"]
    )

    post.save()

    return Response(
        {
            "message": "Post created successfully",
            "post_id": str(post.id)
        },

        status=status.HTTP_201_CREATED
    )

@api_view(["GET"])
def get_posts(request):
    posts = Post.objects().order_by("-created_at")

    result = []

    for post in posts:
        post_id_str = str(post.id)

        like_count = Like.objects(post_id=post_id_str).count()

        result.append({
            "id": str(post.id),
            "title": post.title,
            "content": post.content,
            "author_username": post.author_username,
            "created_at": post.created_at,
            "like_count": like_count
        })

    return Response(result, status=status.HTTP_200_OK)

@api_view(["DELETE"])
@jwt_required
def delete_post(request, post_id):

    try:
        post = Post.objects(id=ObjectId(post_id)).first()
    except:
        return Response(
            {"error": "Invalid post ID"},
            status=status.HTTP_400_BAD_REQUEST
        )

    if not post:
        return Response(
            {"error": "Post not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    # Ownership check
    if post.author_id != request.user["user_id"]:
        return Response(
            {"error": "You are not allowed to delete this post"},
            status=status.HTTP_403_FORBIDDEN
        )

    post.delete()

    return Response(
        {"message": "Post deleted successfully"},
        status=status.HTTP_200_OK
    )

@api_view(["POST"])
@jwt_required
def toggle_like(request, post_id):

    user_id = request.user["user_id"]

    # Validate post exists
    try:
        post = Post.objects(id=ObjectId(post_id)).first()
    except:
        return Response(
            {"error": "Invalid post ID"},
            status=status.HTTP_400_BAD_REQUEST
        )

    if not post:
        return Response(
            {"error": "Post not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    post_id_str = str(post.id)

    # Check existing like
    existing_like = Like.objects(
        post_id=post_id_str,
        user_id=user_id
    ).first()

    # Unlike
    if existing_like:
        existing_like.delete()

        return Response({
            "message": "Post unliked",
            "liked": False
        })

    # Like
    like = Like(
        post_id=post_id_str,
        user_id=user_id
    )

    like.save()

    return Response({
        "message": "Post liked",
        "liked": True
    })
