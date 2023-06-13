from rest_framework import serializers
from todo.models import Note


class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ('id', 'title', 'content')
