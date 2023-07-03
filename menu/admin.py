from django.contrib import admin
from menu.models import Product, Category, Ingredient, Comment, Review, Cart


class ReviewInline(admin.TabularInline):
    model = Review
    extra = 1


class CommentInline(admin.TabularInline):
    model = Comment
    extra = 0


class ProductInline(admin.TabularInline):
    model = Product
    extra = 1


class IngredientInline(admin.TabularInline):
    model = Ingredient.products.through
    extra = 1


class ProductAdmin(admin.ModelAdmin):
    inlines = (IngredientInline, CommentInline, ReviewInline)
    list_display = ('name', 'category')
    search_fields = ['name']
    list_filter = ('category',)


class CategoryAdmin(admin.ModelAdmin):
    inlines = [ProductInline]
    search_fields = ['name']


class CartAdmin(admin.ModelAdmin):
    list_display = ('user',)


admin.site.register(Cart)
admin.site.register(Review)
admin.site.register(Comment)
admin.site.register(Ingredient)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Product, ProductAdmin)