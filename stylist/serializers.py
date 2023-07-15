from rest_framework import serializers
from rest_framework.fields import CharField
from stylist.models import Stylist, Client, Judet, Loc


class LocSerializer(serializers.ModelSerializer):
    class Meta:
        model = Loc
        fields = ('id', 'name')


class JudetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Judet
        fields = ('id', 'name')


class ClientSerializer(serializers.ModelSerializer):

    class Meta:
        model = Client
        fields = ('id', 'stylist', 'name', 'appoint_date', 'appoint_time', 'jud', 'loc')


class StylistSerializer(serializers.ModelSerializer):
    clients = ClientSerializer(many=True, read_only=True)

    class Meta:
        model = Stylist
        fields = ('name', 'clients')
