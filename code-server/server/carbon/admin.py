from django.contrib import admin

from .models import Item, CarbonEntry

# Register your models here.
admin.site.register(Item)
admin.site.register(CarbonEntry)