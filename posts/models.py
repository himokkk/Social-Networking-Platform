from django.contrib.auth.models import User
from django.db import models


class Post(models.Model):
    class Privacy(models.IntegerChoices):
        PUBLIC = 1, 'Public'
        FOLLOWERS = 2, 'Followers'
        PRIVATE = 3, 'Private'

    author = models.ForeignKey(User, related_name="post", on_delete=models.CASCADE)
    content = models.TextField(blank=True, null=True)
    media = models.FileField(upload_to="posts/", blank=True, null=True)
    likes = models.ManyToManyField(
        User, blank=True, related_name="post_like", through="PostLike"
    )
    comments = models.ManyToManyField(
        User, blank=True, related_name="post_comment", through="PostComment"
    )
    privacy = models.IntegerField(choices=Privacy.choices, default=Privacy.PUBLIC)
    timestamp = models.DateTimeField(auto_now_add=True)

    def user_has_liked(self, user) -> bool:
        return self.likes.filter(id=user.id).exists()


class PostLike(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)


class PostComment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    content = models.TextField(blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)
