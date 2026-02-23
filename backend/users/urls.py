from django.urls import path
from .views import register, login, get_profile

urlpatterns = [
    path("register/", register),
    path("login/", login),
    path("profile/", get_profile),
]