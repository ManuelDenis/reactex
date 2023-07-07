from django.contrib.auth.models import User
from django.db import models


class Judet(models.Model):
    name = models.CharField(max_length=25)

    def __str__(self):
        return self.name


class Loc(models.Model):
    name = models.CharField(max_length=50)
    jud = models.ForeignKey(Judet, on_delete=models.CASCADE, related_name='loc')

    def __str__(self):
        return self.name


class Stylist(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='stylist')
    name = models.CharField(max_length=30)

    def __str__(self):
        return self.name.capitalize()


class Client(models.Model):
    stylist = models.ForeignKey(Stylist, on_delete=models.CASCADE, related_name='clients', null=True, blank=True)
    name = models.CharField(max_length=30)
    loc = models.ForeignKey(Loc, on_delete=models.DO_NOTHING, null=True, blank=True)
    appoint_date = models.DateField(null=True, blank=True)
    appoint_time = models.TimeField(null=True, blank=True)

    def __str__(self):
        return self.name.capitalize()

    class Meta:
        unique_together = ('stylist', 'name')
        ordering = ['appoint_date', 'appoint_time']
