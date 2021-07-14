from django.urls import path

from . import views

urlpatterns = [
    path("donate", views.DonationAPI.as_view(), name="donate"),
]