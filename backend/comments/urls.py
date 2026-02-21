from django.urls import path
from .views import create_comment, get_comments

urlpatterns = [
    path("create/", create_comment),
    path("<str:post_id>/", get_comments),
]