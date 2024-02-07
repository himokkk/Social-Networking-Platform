import django_filters
from django.contrib.auth.models import User
from rest_framework import status, viewsets
from rest_framework.generics import (
    CreateAPIView,
    ListAPIView,
    RetrieveAPIView,
    UpdateAPIView,
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from users.filters import UserProfileFilter
from users.models import Notification, UserProfile
from users.serializers import (
    NotificationSerializer,
    UserProfileLimitedSerializer,
    UserProfileSerializer,
    UserProfileUpdateSerializer,
    UserProfileWithFriendsSerializer,
    UserSerializer,
)


class RegisterView(CreateAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def perform_create(self, serializer):
        user = serializer.save()
        user.set_password(serializer.validated_data["password"])
        user.save()

    def create(self, request):
        super().create(request)
        return Response(
            {"message": "User created successfully"}, status=status.HTTP_201_CREATED
        )


class UserProfileRetrieveView(RetrieveAPIView):
    serializer_class = UserProfileSerializer
    queryset = UserProfile.objects.all()


class UserProfileRetrieveByTokenView(APIView):
    permission_classes = [IsAuthenticated]

    serializer_class = UserProfileWithFriendsSerializer
    queryset = UserProfile.objects.all()

    def get(self, request):
        profile = UserProfile.objects.get(user=request.user)
        serializer = self.serializer_class(profile)
        return Response(serializer.data)


class UserProfileUpdateView(UpdateAPIView):
    permission_classes = [IsAuthenticated]

    serializer_class = UserProfileUpdateSerializer
    queryset = UserProfile.objects.all()

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.user == self.request.user:
            super().update(request, *args, **kwargs)
            return Response(
                {"detail": "Profile updated successfully."},
                status=status.HTTP_204_NO_CONTENT,
            )
        else:
            return Response(
                {"detail": "You don't have permission to update this profile."},
                status=status.HTTP_403_FORBIDDEN,
            )


class AddFriendView(UpdateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = UserProfile.objects.all()

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        user = request.user.profile
        if instance == user:
            return Response(
                {"detail": "You cannot add yourself."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        if instance.is_friend(user):
            return Response(
                {"detail": "You are already friends."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if Notification.objects.filter(
            notification_type="friend_request", to_user=instance, from_user=user
        ).exists():
            return Response(
                {"detail": "Friend request already sent."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        Notification.objects.create(
            notification_type="friend_request", to_user=instance, from_user=user
        )
        return Response(
            {"detail": "Friend requests sent successfully."}, status=status.HTTP_200_OK
        )


class AcceptFriendView(UpdateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Notification.objects.all()

    def patch(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.to_user != request.user.profile:
            return Response(
                {"detail": "You don't have permission to accept this friend request."},
                status=status.HTTP_403_FORBIDDEN,
            )
        if instance.notification_type != "friend_request":
            return Response(
                {"detail": "This is not a friend request."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        instance.to_user.add_friend(instance.from_user)
        instance.delete()
        return Response(
            {"detail": "Friend request accepted successfully."},
            status=status.HTTP_200_OK,
        )


class RemoveFriendView(UpdateAPIView):
    permission_classes = [IsAuthenticated]

    serializer_class = UserProfileUpdateSerializer
    queryset = UserProfile.objects.all()

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        user = request.user.profile
        if instance == user:
            return Response(
                {"detail": "You cannot remove yourself."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        instance.remove_friend(user)
        instance.save()
        return Response(
            {"detail": "Friend removed successfully."}, status=status.HTTP_200_OK
        )


class SearchUserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileLimitedSerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    filterset_class = UserProfileFilter


class NotificationListView(ListAPIView):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Notification.objects.filter(to_user=self.request.user.profile).order_by(
            "-created_at"
        )[:10]
