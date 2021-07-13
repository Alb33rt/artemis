from django.urls import path

from rest_framework import routers

from . import views

urlpatterns = [
    path('register', views.RegisterAPI.as_view(), name="register"),
    path('login', views.LoginAPI.as_view(), name="login"),
]