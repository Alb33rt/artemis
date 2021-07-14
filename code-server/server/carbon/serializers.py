from re import X
import datetime
from rest_framework import serializers

from .models import CarbonEntry, GreenEntry, CarbonItem, GreenItem


class CarbonEntrySerializer(serializers.ModelSerializer):
    item_name = serializers.ReadOnlyField()
    unit_name = serializers.ReadOnlyField()

    class Meta:
        model = CarbonEntry
        fields = "__all__"

class PostCarbonEntrySerializer(serializers.Serializer):
    quantity = serializers.IntegerField()
    details = serializers.CharField()
    item_involved = serializers.CharField()

    def save(self, user):
        print('running save function')
        item = CarbonItem.objects.get(name=self.validated_data['item_involved'])
        if not item:
            raise serializers.ValidationError({"message": "No such item"})
        Entry = CarbonEntry(
            quantity=self.validated_data['quantity'],
            details=self.validated_data['details'],
            item_involved=item,
            owner=user
        )
        Entry.save()
        return Entry


class GreenEntrySerializer(serializers.ModelSerializer):
    item_name = serializers.ReadOnlyField()
    unit_name = serializers.ReadOnlyField()

    class Meta:
        model = GreenEntry
        fields = "__all__"


class AddCarbonEntrySerializer(serializers.ModelSerializer):
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


class AddGreenEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = GreenEntry
        fields = ["item_involved", "quantity", "details"]

    def create(self, validated_data):
        return GreenEntry(**validated_data)

    def update(self, instance, validated_data):
        instance.user = validated_data.get("user", instance.user)
        instance.time_created = datetime.datetime.now()
        instance.save()
        return instance


class CarbonItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarbonItem
        fields = "__all__"


class GreenItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = GreenItem
        fields = "__all__"
