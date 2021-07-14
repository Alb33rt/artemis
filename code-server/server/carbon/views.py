from django.shortcuts import render

import datetime

from rest_framework import serializers, status
from rest_framework import viewsets
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view

from .models import CarbonEntry, Item
from .serializers import CarbonEntrySerializer, ItemSerializer

# Create your views here.
class PersonalEntriesAPI(APIView):
    authentication_classes = [TokenAuthentication]

    def post(self, request, format=None):
        logs = CarbonEntry.objects.filter(owner=request.user)
        serializer = CarbonEntrySerializer(logs, many=True)
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)


class AddEntriesAPI(APIView):

    """
    During the Post sequence, we create an entry of a carbon log using sent data through the form, this includes the item (which is a dropdown menu), quantity and details, the user is the current user sending the api request.
    """

    def post(self, request, format=None):
        serializer = CarbonEntrySerializer(data=request.data)
        data = {}
        if serializer.is_valid():
            carbon_entry = serializer.save(owner=request.user)
            data["message"] = "Success! Thank you for caring for the Earth!"
            data["quantity"] = carbon_entry.validated_data["quantity"]
            data["item"] = carbon_entry.validated_data["item"]
        else:
            data["message"] = "Failed, Please Try Again"
        return Response(data)

@api_view(['GET'])
def recentDataAPI(request, days):
    try:
        today = datetime.date.today()
        data = []
        for i in range(1, days+1):
            timedelta_front = datetime.timedelta(days=i)
            timedelta_rear = datetime.timedelta(days=(i + 1))
            queryset = CarbonEntry.objects.filter(
                time_created__lte=today - timedelta_front,
                time_created__gt=today - timedelta_rear,
                owner=request.user,
            )
            sum_of_day = 0
            for q in queryset:
                sum_of_day += q.emission

            data.append({"days": i, "emissions": sum_of_day})
            
    except CarbonEntry.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == "GET":
        return Response(data, status=status.HTTP_202_ACCEPTED)



class myItemsAPI(APIView):

    """
    Used to get the items that a user created personally
    """

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
        detailitems = Item.objects.filter(details__icontains=query)
        items += detailitems
        serializer = ItemSerializer(items, many=True)
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)


class postItemsAPI(APIView):
    # permission_classes = [ IsAuthenticated ]
    """
    Used to post items online to contribute to the growing database
    """

    def post(self, request, format=None):
        data = {}
        user = request.user
        serializer = ItemSerializer(data=request.data)
        if serializer.is_valid():
            item = serializer.save(owner=user)
            data["status"] = "Success!"
            data["item"] = item.validated_data["name"]
        else:
            data["status"] = "Item Creation Failed, please try again."
        return Response(data)