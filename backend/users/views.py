import django_filters
from django.contrib.auth.models import User
from rest_framework import status, viewsets
from rest_framework.generics import (CreateAPIView, RetrieveAPIView,
                                     UpdateAPIView)
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from users.filters import UserProfileFilter
from users.models import UserProfile
from users.serializers import (UserProfileLimitedSerializer,
                               UserProfileSerializer,
                               UserProfileUpdateSerializer, UserSerializer)


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

    serializer_class = UserProfileSerializer
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

    serializer_class = UserProfileUpdateSerializer
    queryset = UserProfile.objects.all()

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        user = request.user.profile
        if instance == user:
            return Response(
                {"detail": "You cannot add yourself."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        instance.add_friend(user)
        instance.save()
        return Response(
            {"detail": "Friend added successfully."}, status=status.HTTP_200_OK
        )


class SearchUserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileLimitedSerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    filterset_class = UserProfileFilter
