from django.contrib import admin
from stylist.models import Client, Stylist


class ClientInline(admin.TabularInline):
    model = Client
    extra = 1


class StylistAdmin(admin.ModelAdmin):
    inlines = (ClientInline,)
    list_display = ('name',)


admin.site.register(Stylist, StylistAdmin)
admin.site.register(Client)