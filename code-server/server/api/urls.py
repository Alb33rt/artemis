from django.urls import path

from . import views

urlpatterns = [
    path('', views.Overview.as_view(), name=""),
    path('users', views.UserOverviewAPI.as_view(), name="user_overview"),
]