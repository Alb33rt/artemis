from django.urls import path

from . import views

"""
The Router for the Carbon App is written here 
"""

urlpatterns = [
    path("carbon-logs", views.PersonalCarbonEntriesAPI.as_view(), name="carbon-logs"),
    path("green-logs", views.PersonalGreenEntriesAPI.as_view(), name="carbon-logs"),
    path("create-carbon", views.AddCarbonEntriesAPI.as_view(), name="create-carbon"),
    path("create-green", views.AddGreenEntriesAPI.as_view(), name="create-green"),
    path(
        "recent-combine-entries/<int:days>",
        views.recentCombinedDataAPI,
        name="recent-combine-entries",
    ),
    path(
        "recent-carbon-entries/<int:days>/",
        views.recentCarbonDataAPI,
        name="recent-carbon-entries",
    ),
    path(
        "recent-green-entries/<int:days>/",
        views.recentGreenDataAPI,
        name="recent-green-entries",
    ),
    path(
        "related-carbon-items",
        views.relatedCarbonItemsAPI.as_view({"get": "retrieve"}),
        name="related-carbon-items",
    ),
    path(
        "related-green-items",
        views.relatedGreenItemsAPI.as_view({"get": "retrieve"}),
        name="related-green-items",
    ),
    path(
        "create-carbon-item",
        views.postCarbonItemsAPI.as_view(),
        name="create-carbon-item",
    ),
    path(
        "create-green-item",
        views.postGreenItemsAPI.as_view(),
        name="create-green-item",
    ),
    path("all-carbon-item", views.allCarbonItemsAPI.as_view(), name="all-item"),
    path("all-green-item", views.allGreenItemsAPI.as_view(), name="all-item"),
]