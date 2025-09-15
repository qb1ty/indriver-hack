from django.urls import path

from rest_framework_simplejwt.views import TokenRefreshView

from .views import SignInAPIView, SignUpAPIView, ProfileAPIView, ValidateTokenAPIView, CarValidAPIView


urlpatterns = [
    path("refresh/", TokenRefreshView.as_view(), name="refresh"),
    path("sign-up/", SignUpAPIView.as_view(), name="sign up"),
    path("sign-in/", SignInAPIView.as_view(), name="sign in"),
    path("profiles/", ProfileAPIView.as_view(), name="profiles"),
    path("token-valid/", ValidateTokenAPIView.as_view(), name="token valid"),
    path("car-valid/", CarValidAPIView.as_view(), name="car valid")

]
