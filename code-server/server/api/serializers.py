from rest_framework import serializers

from .models import CarbonEntry
from .models import Donation


class CarbonEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = CarbonEntry
        fields = "__all__"


class DonationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Donation
        fields = "__all__"