from django.contrib.auth import logout
from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework.authentication import BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from menu.serializers import UsersSerializer
from users.models import Artist, Profile
from users.serializers import ArtistSerializer, ProfileSerializer


class ArtistView(viewsets.ModelViewSet):
    authentication_classes = [BasicAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = ArtistSerializer

    def get_queryset(self):
        return Artist.objects.filter(user=self.request.user)

    def get(self, request):
        content = {
            'user': str(request.user),
            'auth': str(request.auth),
        }
        return Response(content)


class ProfileView(viewsets.ModelViewSet):
    authentication_classes = [BasicAuthentication]
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Profile.objects.filter(user=self.request.user)


class UserView(viewsets.ReadOnlyModelViewSet):
    authentication_classes = [BasicAuthentication]
    serializer_class = UsersSerializer
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()

    def get_object(self):
        return User.objects.get(user=self.request.user)


class LogoutView(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        logout(request)
        return Response({"detail": "Logout successful"})
