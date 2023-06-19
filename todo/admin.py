from django.contrib import admin
from todo.models import Book


@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ['book_name', 'author']



