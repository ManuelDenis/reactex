from django.db import models


class Sportiv(models.Model):
    name = models.CharField(max_length=25)
    image = models.ImageField(upload_to='post_images', null=True, blank=True)

    def __str__(self):
        return self.name
