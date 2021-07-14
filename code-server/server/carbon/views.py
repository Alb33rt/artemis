from django.shortcuts import render

import datetime

from rest_framework import serializers, status
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from .models import CarbonEntry, Item
from .serializers import CarbonEntrySerializer, ItemSerializer

# Create your views here.
class PersonalEntriesAPI(APIView):

    def post(self, request, format=None):
        logs = CarbonEntry.objects.filter(owner=request.user)
        serializer = CarbonEntrySerializer(logs, many=True)
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

class AddEntriesAPI(APIView):

    '''
    During the Post sequence, we create an entry of a carbon log using sent data through the form, this includes the item (which is a dropdown menu), quantity and details, the user is the current user sending the api request. 
    '''

    def post(self, request, format=None):
        serializer = CarbonEntrySerializer(data=request.data)
        data = {}
        if serializer.is_valid():
            carbon_entry = serializer.save(owner=request.user) 
            data['message'] = "Success! Thank you for caring for the Earth!"
            data['quantity'] = carbon_entry.validated_data['quantity']
            data['item'] = carbon_entry.validated_data['item']
        else:
            data['message'] = "Failed, Please Try Again"
        return Response(data)

class recentDataAPI(viewsets.ViewSet):
   
    def list(self, request, pk=None):
        items = []
        today = datetime.date.today()
        queryset = CarbonEntry.objects.filter(time_created_lte = datetime.date.today(), time_created__gt=datetime.date.today()-datetime.timedelta(days=7), owner=request.user)
        serializer = CarbonEntrySerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

class myItemsAPI(APIView):

    '''
    Used to get the items that a user created personally
    '''
    def post(self, request, format=None):
        user = request.user
        my_items = Item.objects.filter(owner=user)
        serializer = ItemSerializer(my_items, many=True)
        
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

class relatedItemsAPI(viewsets.ViewSet):
    def retrieve(self, request, pk=None):
        # There should be a query here which is passed as the pk
        if pk:
            query = pk.strip.lower()
        else:
            query = None
        all_items = Item.objects.all()

        # Direct Search
        items = []
        for item_iter in all_items:
            if query in item_iter.name:
                items.append(item_iter)
        # Django Integration
        detailitems = Item.objects.filter(details__icontains = query)
        items += detailitems
        serializer = ItemSerializer(items, many=True)
        return Response(serializer.data, status= status.HTTP_202_ACCEPTED)

class postItemsAPI(APIView):
    # permission_classes = [ IsAuthenticated ]
    '''
    Used to post items online to contribute to the growing database
    '''
    def post(self, request, format=None):
        data = {}
        user = request.user
        serializer = ItemSerializer(data=request.data)
        if serializer.is_valid():
            item = serializer.save(owner=user)
            data['status'] = "Success!"
            data['item'] = item.validated_data['name']
        else:
            data['status']= "Item Creation Failed, please try again."
        return Response(data)