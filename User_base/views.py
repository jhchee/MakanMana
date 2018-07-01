from knox.views import LoginView as KnoxLoginView
from django.contrib.auth import login
from rest_framework import permissions, generics
from . import serializers
from .models import *


class LoginView(KnoxLoginView):
    """
    Use this view to\n
    1) Get user access token
    """
    serializer_class = serializers.AuthTokenSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, format=None):
        serializer = serializers.AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        return super(LoginView, self).post(request, format=None)


class IsOwner(permissions.BasePermission):
    """
    Use this view to\n
    1) Verify that target object belongs to that particular user
    2) Give access to modify that object if he/she is the owner
    """

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        # if request.method in permissions.SAFE_METHODS:
        #     return True

        # Instance must have an attribute named `owner`.
        return obj.user == request.user


class UserCreateView(generics.ListCreateAPIView):
    """
    Use this view to\n
    1) Create user using
       - email*\n
       - password*
    """
    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer
    permission_classes = {
        permissions.IsAdminUser,
    }


class UserListView(generics.ListAPIView):
    """
    Use this view to\n
    1) Get a list of user matching query string\n
       - email (?email=)
    """
    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer
    permission_classes = {
        # permissions.IsAdminUser,
    }

    def get_queryset(self):
        queryset = User.objects.all()
        email = self.request.query_params.get('email', None)
        if email is not None:
            queryset = queryset.filter(email=email)
        return queryset


class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    Use this view to\n
    1) Retrieve user object\n
    2) Update user object\n
    3) Delete user object
    """
    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer
    permission_classes = {
        IsOwner,
    }


class ProfileCreateView(generics.ListCreateAPIView):
    """
    Use this view to\n
    1) Create user profile\n
       - username*\n
       - profile picture\n
       - status\n
       - preference\n
    """
    queryset = Profile.objects.all()
    serializer_class = serializers.ProfileSerializer
    permission_classes = {
        IsOwner,
    }


class ProfileListView(generics.ListAPIView):
    """
    Use this view to\n
    1) Get a list of profile matching query string\n
       - username (?name=)\n
       - email (?email=)
    """
    queryset = Profile.objects.all()
    serializer_class = serializers.ProfileListSerializer

    def get_queryset(self):
        queryset = Profile.objects.all()
        name = self.request.query_params.get('name', None)
        email = self.request.query_params.get('email', None)
        if name is not None:
            queryset = queryset.filter(profile_name__icontains=name)
        if email is not None:
            queryset = queryset.filter(user__email=email)
        return queryset


class ProfileClassificationView(generics.ListAPIView):
    """
    Use this view to\n
    1) Filter user(profile) by preference
    """

    queryset = Profile.objects.all()
    serializer_class = serializers.ProfileListSerializer
    filter_fields = ('preference',)


class ProfileDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    Use this view to\n
    1) Retrieve profile object\n
    2) Update profile object\n
    3) Delete profile object
    """
    queryset = Profile.objects.all()
    serializer_class = serializers.ProfileSerializer
    permission_classes = {
        permissions.IsAuthenticatedOrReadOnly,
    }


class FriendCreateView(generics.ListCreateAPIView):
    """
    Use this view to\n
    1) Create(form) a friend list
       - user(email)
    """
    queryset = FriendList.objects.all()
    serializer_class = serializers.FriendSerializer
    permission_classes = {
        permissions.IsAuthenticatedOrReadOnly,
    }


class FriendListView(generics.ListAPIView):
    """
    Use this view to\n
    1) List
    """
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


class FriendBarView(generics.RetrieveAPIView):
    """
    Use this view to \n
    1) Get friend's basic profile information to render friend bar
    """
    queryset = FriendList.objects.all()
    serializer_class = serializers.FriendBarSerializer
    permission_classes = {
        # IsOwner,
    }


class FriendListDetailView(generics.RetrieveDestroyAPIView):
    queryset = FriendList.objects.all()
    serializer_class = serializers.FriendSerializer
    permission_classes = {}


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
