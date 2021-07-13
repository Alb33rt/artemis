from .models import CarbonEntry, Donation
from user_auth import User


def get_total_donation():
    # get the total amount of donation so far
    queryset = Donation.object.all()
    total = 0
    for d in queryset:
        total += d.amount
    return total


def get_total_donation_user(user: User):
    # get the total donation done so far of the user
    queryset = Donation.object.filter(username=user.username)
    total = 0
    for d in queryset:
        total += d.amount


def get_average_donation():
    # get average donation done per user
    pass
