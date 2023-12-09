from django.urls import path

from posts.views import (
    CommentCreateView,
    CommentsView,
    CreatePostView,
    DeletePostView,
    ExploreFeedView,
    FollowingFeedView,
    PostDetailView,
    PostLikeView,
    PostUnlikeView,
)

urlpatterns = [
    path("create", CreatePostView.as_view()),
    path("<int:pk>/delete", DeletePostView.as_view()),
    path("explore", ExploreFeedView.as_view()),
    path("following", FollowingFeedView.as_view()),
    path("<int:pk>", PostDetailView.as_view()),
    path("<int:pk>/like", PostLikeView.as_view()),
    path("<int:pk>/unlike", PostUnlikeView.as_view()),
    path("<int:pk>/comment/create", CommentCreateView.as_view()),
    path("<int:pk>/comments", CommentsView.as_view()),
]
