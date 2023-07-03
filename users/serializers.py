from rest_framework import serializers
from users.models import Artist, Profile


class ArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artist
        fields = '__all__'


class ProfileSerializer(serializers.ModelSerializer):
    artist_profile = ArtistSerializer(many=True, read_only=True)

    class Meta:
        model = Profile
        fields = ('user', 'name', 'artist_profile')
