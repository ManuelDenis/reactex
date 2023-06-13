from django.urls import path
from todo.views import Index

urlpatterns = [
    path('', Index.as_view(), name='index'),
]