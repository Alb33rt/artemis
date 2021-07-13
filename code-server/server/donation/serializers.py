from .models import Donation


class DonationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Donation
        fields = "__all__"


class AddDonationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Donation
        fields = [
            "username",
            "quantity",
            "credit_card_number",
            "expiration_year",
            "expiration_month",
            "confirm_code",
        ]
