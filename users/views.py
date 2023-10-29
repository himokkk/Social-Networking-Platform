from django.contrib.auth.models import User
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response

from users.serializers import UserSerializer


class RegisterView(CreateAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def create(self, request, *args, **kwargs):
        super().create(request, args, kwargs)
        return Response({"message": "User created successfully"})
