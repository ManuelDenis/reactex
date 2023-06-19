from django.contrib.auth.models import User
from django.db import models


class Note(models.Model):
    title = models.CharField(max_length=60)
    content = models.CharField(max_length=120, null=True, blank=True)

    def __str__(self):
        return self.title


class Book(models.Model):
    book_name = models.CharField(max_length=100)
    author = models.CharField(max_length=100, null=True, blank=True)
    like = models.ManyToManyField(User, related_name='book', null=True, blank=True)

    def __str__(self):
        return self.book_name


class Comment(models.Model):
    content = models.TextField()
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='comments', null=True, blank=True)

    def __str__(self):
        return self.content[:15]
