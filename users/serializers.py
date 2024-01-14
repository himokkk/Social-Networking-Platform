from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.fields import SerializerMethodField
from rest_framework.serializers import ModelSerializer

from users.models import UserProfile


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]


class UserProfileSerializer(ModelSerializer):
    image_url = SerializerMethodField()
    username = SerializerMethodField()

    class Meta:
        model = UserProfile
        fields = ["description", "birth", "image_url", "username"]

    def get_image_url(self, obj):
        if obj.image:
            return obj.image.url

    def get_username(self, obj):
        if obj.user:
            return obj.user.username


class UserProfileUpdateSerializer(ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ["description", "birth", "image"]
