from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404

from posts.models import Post
from posts.serializers import PostSerializer, CreatePostSerializer


class CreatePostView(APIView):
    # permission_classes = [IsAuthenticated]

    def post(self, request, format=None) -> Response:
        serializer = CreatePostSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        content = serializer.data.get('content')
        media = serializer.validated_data['media']
        author = User.objects.get(username='lukmik')
        # author = request.user
        post = Post(author=author, content=content, media=media)
        post.save()
        return Response(CreatePostSerializer(post).data, status=status.HTTP_201_CREATED)


class DeletePostView(APIView):
    # permission_classes = [IsAuthenticated]

    def delete(self, request, post_id, format=None) -> Response:
        post = get_object_or_404(Post, id=post_id)
        if post.author != User.objects.get(username='lukmik'):  # request.user
            return Response({"detail": "You are not allowed to delete this post."}, status=status.HTTP_403_FORBIDDEN)
        post.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ExploreFeedView(generics.ListAPIView):
    # TODO SHOW POPULAR POSTS FIRST
    queryset = Post.objects.all().order_by('-likes')
    serializer_class = PostSerializer


class FollowingFeedView(generics.ListAPIView):
    # TODO feed of posts from users that current user follows
    pass


class PostView(APIView):
    def get(self, request, post_id) -> Response:
        post = get_object_or_404(Post, id=post_id)
        serializer = PostSerializer(post)
        return Response(serializer.data, status=status.HTTP_200_OK)
