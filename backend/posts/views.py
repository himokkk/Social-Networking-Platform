from django.db.models import Q
from django.db.models.query import QuerySet
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.exceptions import PermissionDenied
from rest_framework.generics import (
    CreateAPIView,
    DestroyAPIView,
    ListAPIView,
    RetrieveAPIView,
    UpdateAPIView,
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response

from users.models import Notification, UserProfile
from posts.models import Post, PostComment, PostReport
from posts.pagination import DefaultFeedPagination, ExploreFeedPagination
from posts.serializers import (
    CommentCreateSerializer,
    CommentsSerializer,
    PostCreateSerializer,
    PostReportSerializer,
    PostSerializer,
)


class PostObjectMixin:
    """Post mixin to be used in CreateAPIView, UpdateAPIView or RetrieveAPIView"""

    def get_object(self) -> Post:
        post = super().get_object()  # type: ignore
        author_profile = post.author
        if post.privacy == Post.Privacy.PUBLIC:
            return post
        if self.request.user.is_authenticated:  # type: ignore
            user_profile = self.request.user.profile  # type: ignore
            if user_profile == author_profile:
                return post
            elif (
                user_profile.is_friend(author_profile)
                and post.privacy == Post.Privacy.FOLLOWERS
            ):
                return post
        raise PermissionDenied(
            {"detail": "You don't have permission to access this post."}
        )


class CreatePostView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PostCreateSerializer

    def perform_create(self, serializer) -> None:
        serializer.save(author=self.request.user.profile)  # type: ignore


class DeletePostView(DestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def destroy(self, request: Request, *args, **kwargs) -> Response:
        instance = self.get_object()
        if instance.author == self.request.user.profile:  # type: ignore
            self.perform_destroy(instance)
            return Response(
                {"detail": "Post deleted successfully."},
                status=status.HTTP_204_NO_CONTENT,
            )
        else:
            return Response(
                {"detail": "You don't have permission to delete this post."},
                status=status.HTTP_403_FORBIDDEN,
            )


class ExploreFeedView(ListAPIView):
    serializer_class = PostSerializer
    pagination_class = ExploreFeedPagination

    def get_queryset(self) -> QuerySet:
        if self.request.user.is_authenticated:
            user_profile = self.request.user.profile  # type: ignore
            return Post.objects.filter(
                Q(author=user_profile)
                | Q(author__in=user_profile.get_friends())
                | Q(privacy=Post.Privacy.PUBLIC)
            )
        else:
            return Post.objects.filter(privacy=Post.Privacy.PUBLIC)


class FollowingFeedView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PostSerializer
    pagination_class = DefaultFeedPagination

    def get_queryset(self) -> QuerySet:
        user_profile = self.request.user.profile  # type: ignore
        return Post.objects.filter(author__in=user_profile.get_friends())


class ProfileFeedView(ListAPIView):
    serializer_class = PostSerializer
    pagination_class = DefaultFeedPagination

    def get_queryset(self) -> QuerySet:
        author_id = self.kwargs.get("author_pk")
        author_profile = get_object_or_404(UserProfile, pk=author_id)
        if self.request.user.is_authenticated:
            user_profile = self.request.user.profile  # type: ignore
            if user_profile == author_profile:
                return Post.objects.filter(author=author_profile)
            elif user_profile.is_friend(author_profile):
                return Post.objects.filter(
                    author=author_profile,
                    privacy__in=[Post.Privacy.PUBLIC, Post.Privacy.FOLLOWERS],
                )
        return Post.objects.filter(author=author_profile, privacy=Post.Privacy.PUBLIC)


class PostDetailView(PostObjectMixin, RetrieveAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class PostLikeView(PostObjectMixin, UpdateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Post.objects.all()

    def update(self, request: Request, *args, **kwargs) -> Response:
        post = self.get_object()
        user_profile = request.user.profile
        user_has_liked_post = post.user_has_liked(user_profile)
        if not user_has_liked_post:
            post.likes.add(user_profile)
            post.save()

            Notification.objects.filter(
                from_user=user_profile, to_user=post.author, post=post
            ).delete()
            Notification.objects.create(
                from_user=user_profile,
                to_user=post.author,
                post=post,
                notification_type="post_like",
                count=post.likes.count(),
            )

            return Response(
                {"detail": "Post liked successfully."}, status=status.HTTP_200_OK
            )
        return Response(
            {"detail": "Post liked unsuccessfully. Post was already liked"},
            status=status.HTTP_200_OK,
        )


class PostUnlikeView(PostObjectMixin, UpdateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Post.objects.all()

    def update(self, request: Request, *args, **kwargs) -> Response:
        post = self.get_object()
        user_profile = request.user.profile
        user_has_liked_post = post.user_has_liked(user_profile)
        if user_has_liked_post:
            post.likes.remove(user_profile)
            post.save()

            obj = Notification.objects.filter(
                from_user=user_profile, to_user=post.author, post=post
            )
            obj.count = post.likes.count()
            obj.save()

            return Response(
                {"detail": "Post unliked successfully."}, status=status.HTTP_200_OK
            )
        return Response(
            {"detail": "Post unliked unsuccessfully. Post was already unliked"},
            status=status.HTTP_200_OK,
        )


class PostReportCreateView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = PostReport.objects.all()
    serializer_class = PostReportSerializer

    def perform_create(self, serializer: PostReportSerializer) -> None:
        post_id = self.kwargs.get("pk")
        post = get_object_or_404(Post, pk=post_id)
        user_profile = self.request.user.profile  # type: ignore
        if (
            post.privacy == Post.Privacy.FOLLOWERS
            and not user_profile.is_friend(post.author)
        ) or (post.privacy == Post.Privacy.PRIVATE and post.author != user_profile):
            raise PermissionDenied(
                {"detail": "You don't have permission to report this post."}
            )
        serializer.save(user=user_profile, post=post)


class CommentCreateView(PostObjectMixin, CreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Post.objects.all()
    serializer_class = CommentCreateSerializer

    def perform_create(self, serializer: CommentCreateSerializer) -> None:
        post = self.get_object()
        serializer.save(user=self.request.user.profile, post=post)  # type: ignore
        user_profile = self.request.user.profile  # type: ignore

        Notification.objects.filter(
            from_user=user_profile, to_user=post.author, post=post
        ).delete()
        Notification.objects.create(
            from_user=user_profile,
            to_user=post.author,
            post=post,
            notification_type="post_comment",
            count=post.comments.count(),
        )


class CommentsView(ListAPIView):
    serializer_class = CommentsSerializer

    def get_queryset(self) -> QuerySet:
        post_id = self.kwargs.get("pk")
        post = get_object_or_404(Post, pk=post_id)
        author_profile = post.author
        if post.privacy == Post.Privacy.PUBLIC:
            pass
        elif self.request.user.is_authenticated:
            user_profile = self.request.user.profile  # type: ignore
            if user_profile == author_profile or (
                user_profile.is_friend(author_profile)
                and post.privacy == Post.Privacy.FOLLOWERS
            ):
                pass
            else:
                raise PermissionDenied(
                    {"detail": "You don't have permission to view this post."}
                )
        else:
            raise PermissionDenied(
                {"detail": "You don't have permission to view this post."}
            )
        queryset = PostComment.objects.filter(post_id=post_id)
        return queryset


class DeleteCommentView(DestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = PostComment.objects.all()
    serializer_class = CommentsSerializer

    def destroy(self, request: Request, *args, **kwargs) -> Response:
        instance = self.get_object()
        user_profile = request.user.profile
        if instance.user == user_profile:  # type: ignore
            self.perform_destroy(instance)

            obj = Notification.objects.filter(
                from_user=user_profile, to_user=instance.post.author, post=instance.post
            )
            obj.count = instance.post.comments.count()
            obj.save()

            return Response(
                {"detail": "Comment deleted successfully."},
                status=status.HTTP_204_NO_CONTENT,
            )
        else:
            return Response(
                {"detail": "You don't have permission to delete this comment."},
                status=status.HTTP_403_FORBIDDEN,
            )
