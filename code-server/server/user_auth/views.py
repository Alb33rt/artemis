from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated

from .serializers import RegisterSerializer, LoginSerializer, EditProfileSerializer

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
            login(request, user)
            token = Token.objects.get(user=user).key 
            data['token'] = token
        else:
            data = serializer.errors
        return Response(data)

'''
Basic Authentication Login Method as Below, for backup.
'''
class LogoutAPI(APIView):
    def post(self, request, format=None):
        logout(request)
        print(request)
        data = {}
        data['logout'] = "Success"
        return Response(data)

class AuthCheckAPI(APIView):
    permission_classes = [ IsAuthenticated ]
    def post(self, request, format=None):
        data = {}
        data['response'] = "Authentication Success"
        return Response(data, status=status.HTTP_202_ACCEPTED)

class EditProfileAPI(APIView):
    permission_classes = [ IsAuthenticated ]
    def get(self, request, format=None):
        user = request.user
        serializer = EditProfileSerializer(user, many=True)
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

    def post(self, request, format=None):
        user = request.user
        pass

# class LoginAPI(APIView):
#     def post(self, request, format=None):
#         '''
#         The Login API retrives the data from the request and verified through the REST API's authentication system, if not respond with a failed request as passwords are different.
#         '''
#         serializer = LoginSerializer(request.data)
#         data = {}
#         user = authenticate(
#             username=serializer.validated_data['username'], 
#             password=serializer.validated_data['password'],
#         )
#         if user is not None:
#             login(request, user)
#             data['response'] = "Successfully Logged In"
#             data['success'] = True
#             data['email'] = user.email
#             data['username'] = user.username
#         else: 
#             data['response'] = "Logged in Failed"
#             data['success']= False
#         return Response(data)