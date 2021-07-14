from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

from .models import Donation
from .serializers import DonationSerializer, AddDonationSerializer

# Create your views here.
class DonationAPI(APIView):
    def get(self, request, format=None):
        pass

    def post(self, request, format=None):
        serializer = AddDonationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)