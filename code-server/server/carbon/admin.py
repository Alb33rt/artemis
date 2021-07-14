from django.contrib import admin

from .models import CarbonItem, CarbonEntry


class CarbonItemAdmin(admin.ModelAdmin):
    fields = ('name', 'emission', 'owner', 'unit')


# Register your models here.
admin.site.register(CarbonItem, CarbonItemAdmin)
admin.site.register(CarbonEntry)