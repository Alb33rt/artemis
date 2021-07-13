from .models import CarbonEntry

EMISSION_FACOTER = [
    {"type": "plastic_bottle", "true_factor": 0.5, "tree_factor": 0.5},
    {"type": "gasoline", "true_factor": 0.5, "tree_factor": 0.5},
    # this will add on for more different types
]


def translate_to_trees(entry: CarbonEntry):
    for ef in EMISSION_FACOTER:
        if entry.name == ef["type"]:
            entry.true_emission = ef["true_factor"] * entry.emission
            entry.tree_emission = ef["tree_factor"] * entry.emission
            break
    return entry
