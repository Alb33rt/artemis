from django.contrib import admin

from .models import CarbonItem, CarbonEntry, GreenItem, GreenEntry


class CarbonItemAdmin(admin.ModelAdmin):
    fields = ("name", "emission", "owner", "unit")


class GreenItemAdmin(admin.ModelAdmin):
    fields = ("name", "oxygen", "owner", "unit")


# Register your models here.
admin.site.register(CarbonItem, CarbonItemAdmin)
admin.site.register(CarbonEntry)
admin.site.register(GreenItem, GreenItemAdmin)
admin.site.register(GreenEntry)