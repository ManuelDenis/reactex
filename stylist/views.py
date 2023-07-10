from rest_framework import viewsets
from rest_framework.authentication import BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from stylist.models import Stylist, Client, Loc, Judet
from stylist.serializers import StylistSerializer, ClientSerializer, LocSerializer, JudetSerializer


class StylistView(viewsets.ModelViewSet):
    authentication_classes = [BasicAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = StylistSerializer

    def get_queryset(self):
        return Stylist.objects.filter(user=self.request.user)


class LocView(viewsets.ModelViewSet):
    serializer_class = LocSerializer
    queryset = Loc.objects.all()


class JudetView(viewsets.ModelViewSet):
    serializer_class = JudetSerializer
    queryset = Judet.objects.all()


class ClientView(viewsets.ModelViewSet):
    authentication_classes = [BasicAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = ClientSerializer

    def get_queryset(self):
        client = Client.objects.filter(stylist__user=self.request.user).order_by('name')
        return client

    def perform_create(self, serializer):
        user = self.request.user
        stylist = Stylist.objects.get(user=user)
        serializer.save(stylist=stylist)

    def perform_update(self, serializer):
        user = self.request.user
        stylist = Stylist.objects.get(user=user)
        serializer.save(stylist=stylist)
