from django.contrib.auth.models import User
from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=30)

    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=100)
    price = models.FloatField()
    category = models.ForeignKey(Category, on_delete=models.DO_NOTHING, null=True,  blank=True, related_name='products')

    def __str__(self):
        return self.name


class Ingredient(models.Model):
    name = models.CharField(max_length=100)
    products = models.ManyToManyField(Product, related_name='ingredients', blank=True, null=True)

    def __str__(self):
        return self.name


class Comment(models.Model):
    content = models.TextField()
    added = models.DateField(auto_now_add=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='comments')

    def __str__(self):
        return self.content[:15]


class Review(models.Model):
    stars = models.IntegerField()
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='reviews')

    def __str__(self):
        return str(self.stars)


class Cart(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    cart_products = models.ManyToManyField(Product, related_name='cart', null=True, blank=True)

    def __str__(self):
        return f"{self.user}'s cart"
