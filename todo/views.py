from django.views.generic import TemplateView
from rest_framework import viewsets
from todo.models import Note, Book
from todo.serializers import TodoSerializer, BookSerializer


class Index(TemplateView):
    template_name = 'index.html'


class TodoView(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    queryset = Note.objects.all().order_by("-id")


class BookView(viewsets.ModelViewSet):
    serializer_class = BookSerializer
    queryset = Book.objects.all().order_by("-id")

