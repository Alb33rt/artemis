from django.contrib import admin

from .models import Item, CarbonEntry


class ItemAdmin(admin.ModelAdmin):
    fields = ('name', 'emission', 'owner')

# Register your models here.
admin.site.register(Item, ItemAdmin)
admin.site.register(CarbonEntry)