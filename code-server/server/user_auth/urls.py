from django.urls import path

from rest_framework import routers
from rest_framework.authtoken.views import obtain_auth_token

from . import views

urlpatterns = [
    path(r'register', views.RegisterAPI.as_view(), name="register"),
    path(r'login', obtain_auth_token, name="login"),
    path(r'logout', views.LogoutAPI.as_view(), name="logout"),
    path(r'auth-check', views.AuthCheckAPI.as_view(), name="auth-check"),
]