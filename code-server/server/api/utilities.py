from .models import CarbonEntry, Donation
from user_auth import User

EMISSION_FACOTER = [
    {"type": "plastic_bottle", "true_factor": 0.5, "tree_factor": 0.5},
    {"type": "gasoline", "true_factor": 0.5, "tree_factor": 0.5},
    # this will add on for more different types
]


def translate_to_trees(entry: CarbonEntry):
    # Albert, change this block of code to sql based, I am kind of confused how to change entries in sql
    for ef in EMISSION_FACOTER:
        if entry.name == ef["type"]:
            entry.true_emission = ef["true_factor"] * entry.emission
            entry.tree_emission = ef["tree_factor"] * entry.emission
            break
    return entry

    # ============================== I don't yet know how the sql here works btw ==================================


def get_total_emission():
    # get the total amount of emission of all users so far in "trees"
    entry = CarbonEntry.objects.all()
    total = 0
    for e in entry:
        total += e.tree_emission
    return total


def get_total_emission_user(user: User):
    # get the total amount of emission of the user so far in "trees"
    entry = CarbonEntry.object.filter(username=user.username)


def get_average_emission_user():
    # get the average emission of the user per day in "trees"
    pass


def get_average_emission_general():
    # get the averahe emission of all users per day in "trees"
    pass


def get_total_donation():
    # get the total amount of donation so far
    pass
