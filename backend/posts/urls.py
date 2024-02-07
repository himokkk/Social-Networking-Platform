from django.urls import path

from posts.views import (
    CommentCreateView,
    CommentsView,
    CreatePostView,
    DeleteCommentView,
    DeletePostView,
    ExploreFeedView,
    FollowingFeedView,
    PostDetailView,
    PostLikeView,
    PostReportCreateView,
    PostUnlikeView,
    ProfileFeedView,
)

urlpatterns = [
    path("create", CreatePostView.as_view()),
    path("<int:pk>/delete", DeletePostView.as_view()),
    path("explore", ExploreFeedView.as_view()),
    path("following", FollowingFeedView.as_view()),
    path("users/<int:author_pk>", ProfileFeedView.as_view()),
    path("<int:pk>", PostDetailView.as_view()),
    path("<int:pk>/like", PostLikeView.as_view()),
    path("<int:pk>/unlike", PostUnlikeView.as_view()),
    path("<int:pk>/comment/create", CommentCreateView.as_view()),
    path("<int:pk>/comments", CommentsView.as_view()),
    path("<int:post_id>/comments/<int:pk>/delete", DeleteCommentView.as_view()),
    path("<int:pk>/report", PostReportCreateView.as_view()),
]
