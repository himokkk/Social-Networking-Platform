from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response

from users.serializers import UserSerializer


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
