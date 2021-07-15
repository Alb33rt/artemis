from django.shortcuts import render
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

from .models import Donation
from .serializers import DonationSerializer, AddDonationSerializer

from user_auth.models import User

# Create your views here.
class DonationAPI(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        pass

    def post(self, request, format=None):
        print("In POST API")
        serializer = AddDonationSerializer(data=request.data)
        data = {}
        if serializer.is_valid():
            serializer.save(owner=request.user)
            # print(serializer.data['Authorization'])
            data["status"] = "Donation Request Success"
            data["quantity"] = serializer.validated_data["quantity"]
            data["firstname"] = serializer.validated_data["firstname"]
            print("Donate Record Success")
        else:
            data = serializer.errors
        return Response(data)