from django.contrib import admin
from django.contrib.auth.models import User
from django.db import models


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    friends = models.ManyToManyField("self", symmetrical=True, blank=True)
    image = models.ImageField(blank=True, null=True, upload_to="profile")
    description = models.TextField(default="")
    birth = models.DateField(blank=True, null=True)

    def __str__(self) -> str:
        return str(self.user)

    def add_friend(self, profile):
        self.friends.add(profile)

    def remove_friend(self, profile):
        self.friends.remove(profile)

    def get_friends(self):
        return self.friends.all()

    def is_friend(self, profile):
        return self.friends.filter(id=profile.id).exists()


admin.site.register(UserProfile)


class Notification(models.Model):
    NOTIFICATION_TYPES = [
        ("friend_request", "Friend Request"),
        ("post_like", "Post Like"),
        ("post_comment", "Post Comment"),
    ]

    to_user = models.ForeignKey(
        UserProfile, on_delete=models.CASCADE, related_name="to_user"
    )
    from_user = models.ForeignKey(
        UserProfile,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="from_user",
    )
    notification_type = models.CharField(max_length=15, choices=NOTIFICATION_TYPES)
    post = models.ForeignKey(
        "posts.Post",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="post",
    )
    count = models.IntegerField(default=0)
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f"{self.to_user}: {self.from_user}"


admin.site.register(Notification)
