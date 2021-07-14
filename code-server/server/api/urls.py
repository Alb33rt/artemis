from django.urls import path, include

from . import views

urlpatterns = [
    # path("", views.Overview.as_view(), name=""),
    path("users", views.UserOverviewAPI.as_view(), name="user_overview"),
    # path("donate", views.DonationAPI.as_view(), name="donate"),
]