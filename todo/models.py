from django.db import models


class Note(models.Model):
    title = models.CharField(max_length=60)
    content = models.CharField(max_length=120, null=True, blank=True)

    def __str__(self):
        return self.title


class Book(models.Model):
    book_name = models.CharField(max_length=100)
    author = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return self.book_name
