from django.urls import path

from posts.views import (CreatePostView, DeletePostView, ExploreFeedView,
                         PostView)

urlpatterns = [
    path("create-post", CreatePostView.as_view()),
    path("delete-post/<int:post_id>", DeletePostView.as_view()),
    path("home", ExploreFeedView.as_view()),
    path("post/<int:post_id>", PostView.as_view()),
]
