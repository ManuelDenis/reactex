from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from knox.models import AuthToken
from rest_framework import viewsets, generics, permissions
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from menu.models import Product, Category, Ingredient, Comment, Review, Cart
from menu.serializers import ProductSerializer, CategorySerializer, IngredientSerializer, CommentSerializer, \
    ReviewSerializer, CartSerializer, CreateUserSerializer, UsersSerializer, LoginUserSerializer


class RegistrationAPI(viewsets.ModelViewSet):
    serializer_class = CreateUserSerializer
    queryset = User.objects.all()

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UsersSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })


class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": UsersSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })


class UserAPI(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = UsersSerializer

    def get_object(self):
        return self.request.user


class UsersView(viewsets.ReadOnlyModelViewSet):
    serializer_class = UsersSerializer
    queryset = User.objects.all()


class ProductViewSet(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()


class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()


class IngredientViewSet(viewsets.ModelViewSet):
    serializer_class = IngredientSerializer
    queryset = Ingredient.objects.all()


class CommentViewSet(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()


class ReviewViewSet(viewsets.ModelViewSet):
    serializer_class = ReviewSerializer
    queryset = Review.objects.all()


class CartViewSet(viewsets.ModelViewSet):
    serializer_class = CartSerializer
    queryset = Cart.objects.all()