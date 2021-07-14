from .models import Donation

from rest_framework import serializers


class DonationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Donation
        fields = "__all__"


class AddDonationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Donation
        fields = [
            "firstname",
            "lastname",
            "credit_card_number",
            "expiration_year",
            "expiration_month",
            "confirm_code",
            "quantity",
            "owner"
        ]


class getDonationSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    class Meta:
        model = Donation
        fields = [
            "firstname",
            "lastname",
            "quantity",
            "time",
            'owner',
        ]
