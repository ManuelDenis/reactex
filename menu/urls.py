from django.urls import path
from knox import views as knox_views
from menu.views import RegistrationAPI, LoginAPI, UserAPI

urlpatterns = [
    path('register/', RegistrationAPI.as_view()),
    path('logout/', knox_views.LogoutView.as_view(), name='knox_logout'),
    path('login/', LoginAPI.as_view()),
    path('user/', UserAPI.as_view()),
]
