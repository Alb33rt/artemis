from re import X
import datetime
from rest_framework import serializers

from .models import CarbonEntry, Item


class CarbonEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = CarbonEntry
        fields = "__all__"


class AddEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = CarbonEntry
        fields = ["item_involved", "quantity", "details"]

    def create(self, validated_data):
        return CarbonEntry(**validated_data)

    def update(self, instance, validated_data):
        instance.user = validated_data.get("user", instance.user)
        instance.time_created = datetime.datetime.now()
        instance.save()
        return instance


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = "__all__"
