from django.contrib.auth.models import User
from django.conf import settings
from rest_framework import serializers

from .validators import *


class RegisterAPISerializer(serializers.Serializer):
    username = serializers.CharField(
        validators=[SafeString('username'), MinLength('username', settings.MIN_USERNAME_LENGTH),
                    MaxLength('username', settings.MAX_USERNAME_LENGTH)],
    )

    password = serializers.CharField(
        validators=[SafeString('password'), MinLength('password', settings.MIN_PASSWORD_LENGTH),
                    MaxLength('password', settings.MAX_PASSWORD_LENGTH)]
    )

    def validate(self, data):
        username = data.get('username')
        if User.objects.filter(username=username):
            raise serializers.ValidationError('username existed')
        return data


class LoginAPISerializer(serializers.Serializer):
    username = serializers.CharField(max_length=settings.MAX_USERNAME_LENGTH)
    password = serializers.CharField(max_length=settings.MAX_PASSWORD_LENGTH)
