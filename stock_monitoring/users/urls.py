from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import RegisterUserView, LoginView

urlpatterns = [
    path('register/', RegisterUserView.as_view(), name='register'),  # User registration
    # path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # Login
    # path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # Token refresh
    path('login/', LoginView.as_view(), name='login'),
]
