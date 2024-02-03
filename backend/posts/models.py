from django.db import models
from users.models import UserProfile


class Post(models.Model):
    class Privacy(models.IntegerChoices):
        PUBLIC = 1, "Public"
        FOLLOWERS = 2, "Followers"
        PRIVATE = 3, "Private"

    author = models.ForeignKey(
        UserProfile, related_name="post", on_delete=models.CASCADE
    )
    content = models.TextField(blank=True, null=True)
    media = models.FileField(upload_to="posts/", blank=True, null=True)
    likes = models.ManyToManyField(
        UserProfile, blank=True, related_name="post_like", through="PostLike"
    )
    comments = models.ManyToManyField(
        UserProfile, blank=True, related_name="post_comment", through="PostComment"
    )
    privacy = models.IntegerField(choices=Privacy.choices, default=Privacy.PUBLIC)
    timestamp = models.DateTimeField(auto_now_add=True)

    def user_has_liked(self, user) -> bool:
        return self.likes.filter(id=user.id).exists()


class PostLike(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)


class PostComment(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    content = models.TextField(blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)


class PostReport(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    description = models.TextField(blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)
