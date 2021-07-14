from django.urls import path

from . import views

'''
The Router for the Carbon App is written here 
'''

urlpatterns = [
    path('logs', views.PersonalEntriesAPI.as_view(), name="logs"),
    path('create', views.AddEntriesAPI.as_view(), name="create"),
    path('recent-items', views.recentDataAPI.as_view({'get': 'list'}), name="recent-data"),
    path('related-items', views.relatedItemsAPI.as_view({"get": "retrieve"}), name="related-items"),
    path('create-item', views.postItemsAPI.as_view(), name="create-item"),
]