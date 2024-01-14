from django.urls import path
from rest_framework_simplejwt import views as jwt_views

from .views import (
    AddFriendView,
    RegisterView,
    SearchUserProfileViewSet,
    UserProfileRetrieveView,
    UserProfileUpdateView,
)

urlpatterns = [
    path("register/", RegisterView.as_view()),
    path("login/", jwt_views.TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("login/refresh/", jwt_views.TokenRefreshView.as_view(), name="token_refresh"),
    path("<pk>", UserProfileRetrieveView.as_view()),
    path("update/<pk>", UserProfileUpdateView.as_view()),
    path("add/<pk>", AddFriendView.as_view()),
    path("search/", SearchUserProfileViewSet.as_view({"get": "list"})),
]
