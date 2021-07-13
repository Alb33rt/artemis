from rest_framework import serializers

from .models import CarbonEntry

class CarbonEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = CarbonEntry
        fields = "__all__"