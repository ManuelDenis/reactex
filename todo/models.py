from django.db import models


class Note(models.Model):
    title = models.CharField(max_length=60)
    content = models.CharField(max_length=120, null=True, blank=True)

    def __str__(self):
        return self.title
