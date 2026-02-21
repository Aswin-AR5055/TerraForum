from django.urls import path
from .views import create_comment, get_comments, delete_comment

urlpatterns = [
    path("create/", create_comment),
    path("<str:post_id>/", get_comments),
    path("delete/<str:comment_id>/", delete_comment),
]