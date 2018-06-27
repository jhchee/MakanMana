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


class IsOwner(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        # if request.method in permissions.SAFE_METHODS:
        #     return True

        # Instance must have an attribute named `owner`.
        return obj.user == request.user


class UserCreateView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer
    permission_classes = {
        permissions.IsAdminUser,
    }


class UserListView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer
    permission_classes = {
        permissions.IsAdminUser,
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
        IsOwner,
    }


class ProfileCreateView(generics.ListCreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = serializers.ProfileSerializer
    permission_classes = {
        IsOwner,
    }


class ProfileListView(generics.ListCreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = serializers.ProfileListSerializer
    filter_fields = ('preference',)

    def get_queryset(self):
        queryset = Profile.objects.all()
        name = self.request.query_params.get('name', None)
        email = self.request.query_params.get('email', None)
        if name is not None:
            queryset = queryset.filter(profile_name__icontains=name)
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
        IsOwner,
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


class RelationshipListView(generics.ListCreateAPIView):
    queryset = Relationship.objects.all()
    serializer_class = serializers.RelationshipListSerializers
    permission_classes = {
        permissions.IsAuthenticatedOrReadOnly,
    }
