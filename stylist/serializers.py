from rest_framework import serializers
from stylist.models import Stylist, Client


class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ('id', 'stylist', 'name', 'appoint_date', 'appoint_time')


class StylistSerializer(serializers.ModelSerializer):
    clients = ClientSerializer(many=True, read_only=True)

    class Meta:
        model = Stylist
        fields = ('name', 'clients')
