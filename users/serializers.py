from django.contrib.auth.models import User
from rest_framework import serializers

from users.models import UserProfile


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]


class UserProfileSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    username = serializers.SerializerMethodField()

    class Meta:
        model = UserProfile
        fields = ["description", "birth", "image_url", "username"]

    def get_image_url(self, obj):
        if obj.image:
            return obj.image.url

    def get_username(self, obj):
        if obj.user:
            return obj.user.username