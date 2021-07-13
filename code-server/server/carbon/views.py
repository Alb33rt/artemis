from django.shortcuts import render

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from .models import CarbonEntry
from .serializers import CarbonEntrySerializer

# Create your views here.
class PersonalEntriesAPI(APIView):
    authentication_classes=[ TokenAuthentication ]
    permission_classes = [ IsAuthenticated ]

    def get(self, request, format=None):
        logs = CarbonEntry.objects.filter(user=request.user)
        serializer = CarbonEntrySerializer(logs, many=True)
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

class AddEntriesAPI(APIView):
    authentication_classes = [ TokenAuthentication ]
    permission_classes = [ IsAuthenticated ]

    '''
    During the Post sequence, we create an entry of a carbon log using sent data through the form, this includes the item (which is a dropdown menu), quantity and details, the user is the current user sending the api request. 
    '''

    def post(self, request, format=None):
        serializer = CarbonEntrySerializer(data=request.data)
        data = {}
        if serializer.is_valid():
            carbon_entry = serializer.save(user=request.user) 
            data['message'] = "Success! Thank you for caring for the Earth!"
            data['quantity'] = carbon_entry.quantity
            data['item'] = carbon_entry.item_involved
        else:
            data['message'] = "Failed, Please Try Again"
        return Response(data)