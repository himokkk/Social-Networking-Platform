from rest_framework import serializers
from Social_Networking_Platform import settings

from posts.models import Post, PostComment, PostLike

POST_LIKE_INTERACTIONS = settings.POST_LIKE_INTERACTIONS


class PostCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ("content", "media")


class PostSerializer(serializers.ModelSerializer):
    author_username = serializers.SerializerMethodField()
    likes_count = serializers.SerializerMethodField()
    comments_count = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = "__all__"

    def get_author_username(self, obj) -> str | None:
        if obj.author:
            return str(obj.author)

    def get_likes_count(self, obj) -> int | None:
        if obj.likes:
            return obj.likes.count()

    def get_comments_count(self, obj) -> int | None:
        if obj.comments:
            return obj.comments.count()


class PostLikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ()


class CommentCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostComment
        fields = ("content",)


class CommentsSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()

    class Meta:
        model = PostComment
        fields = "__all__"

    def get_username(self, obj) -> str | None:
        if obj.user:
            return str(obj.user)
