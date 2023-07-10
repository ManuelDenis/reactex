from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from menu.views import CategoryViewSet, CommentViewSet, CartViewSet, UsersView, RegistrationAPI, LoginAPI, UserAPI
from sport.views import SportivView
from stylist.views import StylistView, ClientView, LocView
from todo.views import TodoView, BookView
from users.views import ArtistView, UserView, ProfileView, LogoutView

router = routers.DefaultRouter()
router.register(r'todo', TodoView, 'todo')
router.register(r'book', BookView, 'book')
router.register(r'users', UsersView, basename='users')
router.register(r'category', CategoryViewSet, 'category')
router.register(r'comment', CommentViewSet, 'comment')
router.register(r'cart', CartViewSet, 'cart')
router.register(r'register', RegistrationAPI, 'register')
router.register(r'artist', ArtistView, 'artist')
router.register(r'user_log', UserView, basename='user')
router.register(r'profile', ProfileView, 'profile')
router.register(r'logout', LogoutView, 'logout')
router.register(r'stylist', StylistView, 'stylist')
router.register(r'client', ClientView, 'client')
router.register(r'loc', LocView, 'loc')
router.register(r'sport', SportivView, 'sport')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('todo.urls')),
    path('api/', include(router.urls)),
    path('api/auth/', include('knox.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
