from django.shortcuts import render
from knox.views import LoginView as KnoxLoginView
from django.contrib.auth import login
from rest_framework import permissions, generics, viewsets
from . import serializers
from .models import *
from rest_framework import status
from rest_framework.response import Response


class LoginView(KnoxLoginView):
    serializer_class = serializers.AuthTokenSerializer
    permission_classes = [permissions.AllowAny]
    def post(self, request, format=None):
        serializer = serializers.AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        return super(LoginView, self).post(request, format=None)

class UserDetailsView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer
    permission_classes = {
        permissions.IsAuthenticatedOrReadOnly,
    }

class UserCreateView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer
    permission_classes = {
        permissions.IsAuthenticatedOrReadOnly,
    }

class UserProfileListView(generics.ListCreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = serializers.ProfileSerializer
    def get_queryset(self):
        queryset = Profile.objects.all()
        username = self.request.query_params.get('username', None)
        if username is not None:
            queryset = queryset.filter(username__icontains=username)
        return queryset

class ProfileCreateView(generics.ListCreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = serializers.ProfileSerializer
    # permission_classes = {
    #     permissions.IsAuthenticatedOrReadOnly,
    # }

class FriendListCreateView(generics.ListCreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = serializers.FriendListSerializer
    # permission_classes = {
    #     permissions.IsAuthenticatedOrReadOnly,
    # }

class FriendListView(generics.ListCreateAPIView):
    queryset = FriendList.objects.all()
    serializer_class = serializers.FriendListSerializer
    # permission_classes = {
    #     permissions.IsAuthenticated,
    # }
    def get_queryset(self):
        queryset = FriendList.objects.all()
        email = self.request.query_params.get('email', None)
        if email is not None:
            queryset = queryset.filter(email__icontains=email)
        return queryset
