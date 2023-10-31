from django.urls import path

from posts.views import (
    CreatePostView,
    DeletePostView,
    ExploreFeedView,
    PostDetailView,
    PostLikeView,
    PostUnlikeView,
    CommentCreateView,
    CommentsView,
)

urlpatterns = [
    path("post/create", CreatePostView.as_view()),
    path("post/<int:pk>/delete", DeletePostView.as_view()),
    path("home", ExploreFeedView.as_view()),
    path("post/<int:pk>", PostDetailView.as_view()),
    path("post/<int:pk>/like", PostLikeView.as_view()),
    path("post/<int:pk>/unlike", PostUnlikeView.as_view()),
    path("post/<int:pk>/comment/create", CommentCreateView.as_view()),
    path("post/<int:pk>/comments", CommentsView.as_view()),
]
