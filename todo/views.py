from django.contrib.auth.models import User
from django.views.generic import TemplateView
from rest_framework import viewsets
from todo.models import Note, Book, Comment
from todo.serializers import TodoSerializer, BookSerializer, CommentSerializer, UserSerializer


class Index(TemplateView):
    template_name = 'index.html'


class UserView(viewsets.ReadOnlyModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()


class TodoView(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    queryset = Note.objects.all().order_by("-id")


class BookView(viewsets.ModelViewSet):
    serializer_class = BookSerializer
    queryset = Book.objects.all().order_by("-id")


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
