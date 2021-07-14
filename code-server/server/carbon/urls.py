from django.urls import path

from . import views

"""
The Router for the Carbon App is written here 
"""

urlpatterns = [
    path("logs", views.PersonalEntriesAPI.as_view(), name="logs"),
    path("create", views.AddEntriesAPI.as_view(), name="create"),
    path(
        "recent-entries/<int:days>/",
        views.recentDataAPI,
        name="recent-entries",
    ),
    path(
        "related-items",
        views.relatedItemsAPI.as_view({"get": "retrieve"}),
        name="related-items",
    ),
    path("create-item", views.postItemsAPI.as_view(), name="create-item"),
    path("all-item", views.allItemsAPI.as_view(), name="all-item"),
]