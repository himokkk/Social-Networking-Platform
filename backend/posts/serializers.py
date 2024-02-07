from rest_framework import serializers

from posts.models import Post, PostComment, PostReport


class PostCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ("id", "content", "media", "privacy")


class PostSerializer(serializers.ModelSerializer):
    author_username = serializers.SerializerMethodField()
    likes_count = serializers.SerializerMethodField()
    comments_count = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = (
            "id",
            "author",
            "content",
            "media",
            "likes",
            "comments",
            "timestamp",
            "author_username",
            "likes_count",
            "comments_count",
        )

    def get_author_username(self, obj) -> str:
        if obj.author:
            return str(obj.author)

    def get_likes_count(self, obj) -> int:
        if obj.likes:
            return obj.likes.count()

    def get_comments_count(self, obj) -> int:
        if obj.comments:
            return obj.comments.count()


class PostReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostReport
        fields = (
            "id",
            "description",
        )


class CommentCreateSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()

    class Meta:
        model = PostComment
        fields = ("id", "content", "timestamp", "username")

    def get_username(self, obj) -> str | None:
        if obj.user:
            return str(obj.user)


class CommentsSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()

    class Meta:
        model = PostComment
        fields = "__all__"

    def get_username(self, obj) -> str | None:
        if obj.user:
            return str(obj.user)
