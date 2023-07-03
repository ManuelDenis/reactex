from django.contrib.auth.models import User
from django.db import models


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    name = models.CharField(max_length=30)

    def __str__(self):
        return self.name.upper()


class Artist(models.Model):
    name = models.CharField(max_length=25)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='artist', null=True, blank=True)
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, null=True, blank=True, related_name='artist_profile')

    def __str__(self):
        return self.name
