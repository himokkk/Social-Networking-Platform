from django.db.models.query import QuerySet
from django.shortcuts import get_object_or_404
from rest_framework import status
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

from posts.models import Post, PostComment
from posts.pagination import ExploreFeedPagination, FollowingFeedPagination
from posts.serializers import (
    CommentCreateSerializer,
    CommentsSerializer,
    PostCreateSerializer,
    PostSerializer,
)


class CreatePostView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PostCreateSerializer

    def perform_create(self, serializer) -> None:
        serializer.save(author=self.request.user)


class DeletePostView(DestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def destroy(self, request: Request, *args, **kwargs) -> Response:
        instance = self.get_object()
        if instance.author == self.request.user:
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
    # TODO SHOW POPULAR POSTS FIRST
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    pagination_class = ExploreFeedPagination


class FollowingFeedView(ListAPIView):
    # TODO feed of posts from users that current user follows
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    pagination_class = FollowingFeedPagination


class PostDetailView(RetrieveAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class PostLikeView(UpdateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Post.objects.all()

    def update(self, request: Request, *args, **kwargs) -> Response:
        post = self.get_object()
        user = request.user
        user_has_liked_post = post.user_has_liked(user)
        if not user_has_liked_post:
            post.likes.add(user)
            post.save()
            return Response(
                {"detail": "Post liked successfully."}, status=status.HTTP_200_OK
            )
        return Response(
            {"detail": "Post liked unsuccessfully. Post was already liked"},
            status=status.HTTP_200_OK,
        )


class PostUnlikeView(UpdateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Post.objects.all()

    def update(self, request: Request, *args, **kwargs) -> Response:
        post = self.get_object()
        user = request.user
        user_has_liked_post = post.user_has_liked(user)
        if user_has_liked_post:
            post.likes.remove(request.user)
            post.save()
            return Response(
                {"detail": "Post unliked successfully."}, status=status.HTTP_200_OK
            )
        return Response(
            {"detail": "Post unliked unsuccessfully. Post was already unliked"},
            status=status.HTTP_200_OK,
        )


class CommentCreateView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Post.objects.all()
    serializer_class = CommentCreateSerializer

    def perform_create(self, serializer: CommentCreateSerializer) -> None:
        post = self.get_object()
        serializer.save(user=self.request.user, post=post)


class CommentsView(ListAPIView):
    serializer_class = CommentsSerializer

    def get_queryset(self) -> QuerySet:
        post_id = self.kwargs.get("pk")
        get_object_or_404(Post, pk=post_id)
        queryset = PostComment.objects.filter(post_id=post_id)
        return queryset
