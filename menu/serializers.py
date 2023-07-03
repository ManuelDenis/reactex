from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework import serializers
from menu.models import Product, Category, Ingredient, Comment, Review, Cart


class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'],
                                        None,
                                        validated_data['password'])
        return user


class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username',)


class LoginUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password')

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Invalid Details.")


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ('id', 'stars', 'product')


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('id', 'content', 'added', 'product')


class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ('id', 'name', 'products')


class ProductSerializer(serializers.ModelSerializer):
    ingredients = IngredientSerializer(many=True, read_only=True)
    comments = CommentSerializer(many=True)
    reviews = ReviewSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = ('id', 'name', 'price', 'category', 'ingredients', 'comments', 'reviews')


class CategorySerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True, read_only=True)

    class Meta:
        model = Category
        fields = ('id', 'name', 'products')


class CartSerializer(serializers.ModelSerializer):

    class Meta:
        model = Cart
        fields = ('id', 'user', 'cart_products')
