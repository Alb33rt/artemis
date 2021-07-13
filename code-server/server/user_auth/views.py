from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response

from .serializers import RegisterSerializer

# Create your views here.
class RegisterAPI(APIView):
    def post(self, request, format=None):
        '''
        There should 4 variables here which is also defined in the serializer which will be verified and saved through Django's user systems.
        '''
        serializer = RegisterSerializer(data=request.data)
        data = {}
        if serializer.is_valid():
            user = serializer.save()
            data['response'] = "Successfully Registered"
            data['email'] = user.email
            data['username'] = user.username
        else:
            data = serializer.errors
        return Response(data)

class LoginAPI(APIView):
    def post(self, request, format=None):
        '''
        The Login API retrives the data from the request and verified through the REST API's authentication system, if not respond with a failed request as passwords are different.
        '''
        serializer = RegisterSerializer(request.data)
        data = {}
