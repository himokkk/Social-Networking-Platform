from rest_framework import serializers

from posts.models import Post


class PostSerializer(serializers.ModelSerializer):
    author_username = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = "__all__"

    def get_author_username(self, obj) -> str | None:
        if obj.author:
            return str(obj.author)


class CreatePostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ("content", "media")
