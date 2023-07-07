from rest_framework import serializers
from sport.models import Sportiv


class SportivSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sportiv
        fields = ('id', 'name', 'image')
