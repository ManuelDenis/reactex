# Generated by Django 3.2 on 2023-06-16 21:30

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0004_auto_20230617_0008'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='book',
            name='comment',
        ),
        migrations.AddField(
            model_name='comment',
            name='book',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='comments', to='todo.book'),
        ),
    ]
