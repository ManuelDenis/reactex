from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.parsers import MultiPartParser, FormParser

from sport.models import Sportiv
from sport.serializers import SportivSerializer


class SportivView(viewsets.ModelViewSet):
    serializer_class = SportivSerializer
    queryset = Sportiv.objects.all()
    parser_classes = (MultiPartParser, FormParser)
