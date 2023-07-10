from django.contrib import admin
from stylist.models import Client, Stylist, Loc, Judet


class JudetAdmin(admin.ModelAdmin):
    list_display = ('name',)


@admin.register(Loc)
class LocAdmin(admin.ModelAdmin):
    list_display = ('name',)


class ClientAdmin(admin.ModelAdmin):
    list_display = ('name',)


class ClientInline(admin.TabularInline):
    model = Client
    extra = 1


class StylistAdmin(admin.ModelAdmin):
    inlines = (ClientInline,)
    list_display = ('name',)


admin.site.register(Stylist, StylistAdmin)
admin.site.register(Client, ClientAdmin)
admin.site.register(Judet, JudetAdmin)
