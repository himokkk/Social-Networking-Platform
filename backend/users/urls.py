from django.urls import path
from rest_framework_simplejwt import views as jwt_views

from .views import (AddFriendView, NotificationListView, RegisterView,
                    RemoveFriendView, SearchUserProfileViewSet,
                    UserProfileRetrieveByTokenView, UserProfileRetrieveView,
                    UserProfileUpdateView, AcceptFriendView)

urlpatterns = [
    path("register/", RegisterView.as_view()),
    path("login/", jwt_views.TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("login/refresh/", jwt_views.TokenRefreshView.as_view(), name="token_refresh"),
    path("current/", UserProfileRetrieveByTokenView.as_view()),
    path("<pk>", UserProfileRetrieveView.as_view()),
    path("update/<pk>", UserProfileUpdateView.as_view()),
    path("add/<pk>", AddFriendView.as_view()),
    path("remove/<pk>", RemoveFriendView.as_view()),
    path("notification/list", NotificationListView.as_view()),
    path("notification/<pk>/accept", AcceptFriendView.as_view()),
    path("search/", SearchUserProfileViewSet.as_view({"get": "list"})),
]
