from django.urls import path

from . import views

'''
The Router for the Carbon App is written here 
'''

urlpatterns = [
    path('logs', views.PersonalEntriesAPI, name="logs"),
    path('create', views.AddEntriesAPI, name="create"),
    path('related-items', views.relatedItemsAPI, name="related-items"),
    path('create-item', views.postItemsAPI, name="create-item"),
]