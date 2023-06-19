from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from todo import views

router = routers.DefaultRouter()
router.register(r'todo', views.TodoView, 'todo')
router.register(r'book', views.BookView, 'book')
router.register(r'comment', views.CommentViewSet)
router.register(r'users', views.UserView, basename='user')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('todo.urls')),
    path('api/', include(router.urls)),
]
