from django.contrib import admin

from .models import CarbonItem, GreenItem, CarbonEntry, GreenEntry


class ItemAdmin(admin.ModelAdmin):
    fields = ("name", "emission", "owner", "unit")


# Register your models here.
admin.site.register(CarbonItem, ItemAdmin)
admin.site.register(CarbonEntry)
admin.site.register(GreenItem, ItemAdmin)
admin.site.register(GreenEntry)
