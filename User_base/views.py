from knox.views import LoginView as KnoxLoginView
from django.contrib.auth import login
from rest_framework import permissions, generics
from . import serializers
from .models import *


class LoginView(KnoxLoginView):
    serializer_class = serializers.AuthTokenSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, format=None):
        serializer = serializers.AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        return super(LoginView, self).post(request, format=None)


class UserCreateView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer
    permission_classes = {
        permissions.IsAuthenticatedOrReadOnly,
    }

    def get_queryset(self):
        queryset = User.objects.all()
        email = self.request.query_params.get('email', None)
        if email is not None:
            queryset = queryset.filter(email__icontains=email)
        return queryset


class UserListView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer
    permission_classes = {
        permissions.IsAuthenticatedOrReadOnly,
    }

    def get_queryset(self):
        queryset = Profile.objects.all()
        email = self.request.query_params.get('email', None)
        if email is not None:
            queryset = queryset.filter(email=email)
        return queryset


class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer
    permission_classes = {
        permissions.IsAuthenticatedOrReadOnly,
    }


class ProfileCreateView(generics.ListCreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = serializers.ProfileSerializer
    permission_classes = {
        permissions.IsAuthenticatedOrReadOnly,
    }


class ProfileListView(generics.ListCreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = serializers.ProfileListSerializer

    # search_fields = ('username',)
    filter_fields = ('preference',)

    # ordering_fields = ('username',)
    # ordering = ('-username',)
    def get_queryset(self):
        queryset = Profile.objects.all()
        username = self.request.query_params.get('username', None)
        email = self.request.query_params.get('email', None)
        if username is not None:
            queryset = queryset.filter(username__icontains=username)
        if email is not None:
            queryset = queryset.filter(user__email__icontains=email)
        return queryset


class ProfileDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Profile.objects.all()
    serializer_class = serializers.ProfileSerializer
    permission_classes = {
        permissions.IsAuthenticatedOrReadOnly,
    }


class FriendCreateView(generics.ListCreateAPIView):
    queryset = FriendList.objects.all()
    serializer_class = serializers.FriendSerializer
    permission_classes = {
        permissions.IsAuthenticatedOrReadOnly,
    }


class FriendListView(generics.ListCreateAPIView):
    queryset = FriendList.objects.all()
    serializer_class = serializers.FriendListSerializer
    permission_classes = {
        permissions.IsAuthenticatedOrReadOnly,
    }

    def get_queryset(self):
        queryset = FriendList.objects.all()
        email = self.request.query_params.get('email', None)
        if email is not None:
            queryset = queryset.filter(user__email__icontains=email)
        return queryset


class FriendDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = FriendList.objects.all()
    serializer_class = serializers.FriendSerializer
    permission_classes = {
        permissions.IsAuthenticatedOrReadOnly,
    }


class PreferenceCreateView(generics.ListCreateAPIView):
    queryset = Preference.objects.all()
    serializer_class = serializers.PreferenceSerializers
    permission_classes = {
        permissions.IsAuthenticatedOrReadOnly,
    }


class PreferenceListView(generics.ListCreateAPIView):
    queryset = Preference.objects.all()
    serializer_class = serializers.PreferenceSerializers
    permission_classes = {
        permissions.IsAuthenticatedOrReadOnly,
    }


class PreferenceDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Preference.objects.all()
    serializer_class = serializers.PreferenceSerializers
    permission_classes = {
        permissions.IsAuthenticatedOrReadOnly,
    }
