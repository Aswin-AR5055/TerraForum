from django.urls import path
from .views import create_post, get_posts, delete_post, toggle_like

urlpatterns = [
    path("create/", create_post),
    path("", get_posts),
    path("<str:post_id>/delete/", delete_post),
    path("<str:post_id>/like/", toggle_like),
]