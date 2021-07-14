from django.shortcuts import render

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

# from .serializers import CarbonEntrySerializer, DonationSerializer
# from .models import CarbonEntry, Donation

from user_auth.models import User
from user_auth.serializers import UserSerializer

# Create your views here.
# class Overview(APIView):
#     def get(self, request, format=None):
#         entries = CarbonEntry.objects.all()
#         serializer = CarbonEntrySerializer(entries, many=True)
#         return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

#     def post(self, request, format=None):
#         serializer = CarbonEntrySerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserOverviewAPI(APIView):
    def get(self, request, format=None):
        queryset = User.objects.all()
        serializer = UserSerializer(queryset, many=True)
        return Response(serializer.data)


# class DonationAPI(APIView):
#     def get(self, request, format=None):
#         pass

#     def post(self, request, format=None):
#         serializer = DonationSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
