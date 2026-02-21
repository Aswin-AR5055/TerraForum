from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Comment
from .serializers import CreateCommentSerializer
from users.auth import jwt_required

@api_view(["POST"])
@jwt_required
def create_comment(request):
    serializer = CreateCommentSerializer(data=request.data)

    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    post_id = serializer.validated_data["post_id"]
    content = serializer.validated_data["content"]

    comment = Comment(
        post_id = post_id,
        author_id = request.user["user_id"],
        author_username = request.user["username"],
        content = content
    )

    comment.save()

    return Response(
        {
            "message": "Comment created successfully",
            "comment_id": str(comment.id)
        },

        status=status.HTTP_201_CREATED
    )

@api_view(["GET"])
def get_comments(request, post_id):
    comments = Comment.objects(post_id=post_id).order_by("-created_at")
    result = []
    for comment in comments:
        result.append({
            "id": str(comment.id),
            "post_id": comment.post_id,
            "author_username": comment.author_username,
            "content": comment.content,
            "created_at": comment.created_at
        })
    return Response(result, status=status.HTTP_200_OK)

@api_view(["DELETE"])
@jwt_required
def delete_comment(request, comment_id):
    try:
        comment = Comment.objects.get(id=comment_id)
        if comment.author_id != request.user["user_id"]:
            return Response({"error": "Unauthorized"}, status=status.HTTP_403_FORBIDDEN)
        comment.delete()
        return Response({"message": "Comment deleted"}, status=status.HTTP_200_OK)
    except Comment.DoesNotExist:
        return Response({"error": "Comment not found"}, status=status.HTTP_404_NOT_FOUND)