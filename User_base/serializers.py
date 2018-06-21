from rest_framework import serializers
from .models import *
from django.contrib.auth import authenticate
from django.utils.translation import ugettext as _


class AuthTokenSerializer(serializers.Serializer):
    email = serializers.CharField(label=_("Email"))
    password = serializers.CharField(
        label=_("Password"),
        style={'input_type': 'password'},
        trim_whitespace=False
    )

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        if email and password:
            user = authenticate(request=self.context.get('request'),
                                email=email, password=password)

            # The authenticate call simply returns None for is_active=False
            # users. (Assuming the default ModelBackend authentication
            # backend.)
            if not user:
                msg = _('Unable to log in with provided credentials.')
                raise serializers.ValidationError(msg, code='authorization')
        else:
            msg = _('Must include "username" and "password".')
            raise serializers.ValidationError(msg, code='authorization')

        attrs['email'] = email
        attrs['user'] = authenticate(email=email, password=password)
        return attrs


class CustomKnoxSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class ProfileListSerializer(serializers.ModelSerializer):
    preference = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='tag',
    )
    user = serializers.SlugRelatedField(
        many=False,
        read_only=True,
        slug_field='email'
    )

    class Meta:
        model = Profile
        fields = '__all__'


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'
        # depth = 1


class FriendListSerializer(serializers.ModelSerializer):
    friend_list = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='username',
    )
    user = serializers.SlugRelatedField(
        many=False,
        read_only=True,
        slug_field='email',
    )

    class Meta:
        model = FriendList
        fields = '__all__'

class FriendSerializer(serializers.ModelSerializer):
    class Meta:
        model = FriendList
        fields = '__all__'

class PreferenceSerializers(serializers.ModelSerializer):
    class Meta:
        model = Preference
        fields = '__all__'
