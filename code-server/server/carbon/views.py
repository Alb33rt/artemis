from django.shortcuts import render

import datetime
import json

from rest_framework import serializers, status
from rest_framework import viewsets
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes

from .models import CarbonEntry, GreenEntry, CarbonItem, GreenItem
from .serializers import (
    CarbonEntrySerializer,
    GreenEntrySerializer,
    CarbonItemSerializer,
    GreenItemSerializer,
    PostCarbonEntrySerializer,
)

# Create your views here.
class PersonalCarbonEntriesAPI(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        logs = CarbonEntry.objects.filter(owner=request.user)
        serializer = CarbonEntrySerializer(logs, many=True)
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)


class PersonalGreenEntriesAPI(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        logs = GreenEntry.objects.filter(owner=request.user)
        serializer = GreenEntrySerializer(logs, many=True)
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)


class AddCarbonEntriesAPI(APIView):
    permission_classes = [IsAuthenticated]

    """
    During the Post sequence, we create an entry of a carbon log using sent data through the form, this includes the item (which is a dropdown menu), quantity and details, the user is the current user sending the api request.
    """

    def post(self, request, format=None):
        print("IN the API")
        print(request.data)
        serializer = PostCarbonEntrySerializer(data=request.data)
        data = {}
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AddGreenEntriesAPI(APIView):
    permission_classes = [IsAuthenticated]

    """
    During the Post sequence, we create an entry of a carbon log using sent data through the form, this includes the item (which is a dropdown menu), quantity and details, the user is the current user sending the api request.
    """

    def post(self, request, format=None):
        serializer = GreenEntrySerializer(data=request.data)
        data = {}
        print(serializer.data)
        if serializer.is_valid():
            print(request.data)
            green_entry = serializer.save(owner=request.user)
            data["message"] = "Success! Thank you for caring for the Earth!"
            data["quantity"] = green_entry.validated_data["quantity"]
            data["Greenitem"] = green_entry.validated_data["item_envolved"]
        else:
            data["message"] = "Failed, Please Try Again"
        return Response(data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def recentCarbonDataAPI(request, days):
    try:
        today = datetime.date.today() + datetime.timedelta(1)
        data = []
        for i in range(1, days + 1):
            timedelta_front = datetime.timedelta(days=i)
            timedelta_rear = datetime.timedelta(days=(i + 1))
            queryset = CarbonEntry.objects.filter(
                time_created__lte=today - timedelta_front,
                time_created__gt=today - timedelta_rear,
                owner=request.user,
            )
            sum_of_day = 0
            for q in queryset:
                amount_of_item = q.quantity
                emission = q.get_emissions
                sum_of_day += amount_of_item * int(emission)
            date_str = (today - datetime.timedelta(i + 1)).strftime("%m%d")
            data.append({"days": date_str, "emissions": sum_of_day})
        data.reverse()

    except CarbonEntry.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == "GET":
        print("Authenticated")
        return Response(data, status=status.HTTP_202_ACCEPTED)


api_view(["GET"])


@permission_classes([IsAuthenticated])
def recentGreenDataAPI(request, days):
    try:
        today = datetime.date.today() + datetime.timedelta(1)
        data = []
        for i in range(1, days + 1):
            timedelta_front = datetime.timedelta(days=i)
            timedelta_rear = datetime.timedelta(days=(i + 1))
            queryset = GreenEntry.objects.filter(
                time_created__lte=today - timedelta_front,
                time_created__gt=today - timedelta_rear,
                owner=request.user,
            )
            sum_of_day = 0
            for q in queryset:
                sum_of_day += q.quantity
            date_str = (today - datetime.timedelta(i + 1)).strftime("%m%d")
            data.append({"days": date_str, "emissions": sum_of_day})
        data.reverse()

    except GreenEntry.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == "GET":
        print("Authenticated")
        return Response(data, status=status.HTTP_202_ACCEPTED)


class allCarbonItemsAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        user = request.user
        my_items = CarbonItem.objects.all()
        serializer = CarbonItemSerializer(my_items, many=True)
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)


class allGreenItemsAPI(APIView):
    def get(self, request, format=None):
        user = request.user
        my_items = GreenItem.objects.filter(owner=user)
        serializer = GreenItemSerializer(my_items, many=True)
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)


class relatedCarbonItemsAPI(viewsets.ViewSet):
    def retrieve(self, request, pk=None):
        # There should be a query here which is passed as the pk
        if pk:
            query = pk.strip.lower()
        else:
            query = None
        all_items = CarbonItem.objects.all()

        # Direct Search
        items = []
        for item_iter in all_items:
            if query in item_iter.name:
                items.append(item_iter)
        # Django Integration
        detailitems = CarbonItem.objects.filter(details__icontains=query)
        items += detailitems
        serializer = CarbonItemSerializer(items, many=True)
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)


class relatedGreenItemsAPI(viewsets.ViewSet):
    def retrieve(self, request, pk=None):
        # There should be a query here which is passed as the pk
        if pk:
            query = pk.strip.lower()
        else:
            query = None
        all_items = GreenItem.objects.all()

        # Direct Search
        items = []
        for item_iter in all_items:
            if query in item_iter.name:
                items.append(item_iter)
        # Django Integration
        detailitems = GreenItem.objects.filter(details__icontains=query)
        items += detailitems
        serializer = GreenItemSerializer(items, many=True)
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)


class postCarbonItemsAPI(APIView):
    # permission_classes = [ IsAuthenticated ]
    """
    Used to post items online to contribute to the growing database
    """

    def post(self, request, format=None):
        data = {}
        user = request.user
        serializer = CarbonItemSerializer(data=request.data)
        if serializer.is_valid():
            item = serializer.save(owner=user)
            data["status"] = "Success!"
            data["item"] = item.validated_data["name"]
        else:
            data["status"] = "Item Creation Failed, please try again."
        return Response(data)


class postGreenItemsAPI(APIView):
    # permission_classes = [ IsAuthenticated ]
    """
    Used to post items online to contribute to the growing database
    """

    def post(self, request, format=None):
        data = {}
        user = request.user
        serializer = GreenItemSerializer(data=request.data)
        if serializer.is_valid():
            item = serializer.save(owner=user)
            data["status"] = "Success!"
            data["item"] = item.validated_data["name"]
        else:
            data["status"] = "Item Creation Failed, please try again."
        return Response(data)