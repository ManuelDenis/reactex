from django.views.generic import TemplateView
from rest_framework import viewsets
from todo.models import Note
from todo.serializers import TodoSerializer


class Index(TemplateView):
    template_name = 'index.html'


class TodoView(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    queryset = Note.objects.all()


