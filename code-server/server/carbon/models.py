from django.db import models
from django.db.models.fields import related

from user_auth.models import User

# Create your models here.
class Item(models.Model):
    name = models.TextField(max_length=256)
    emission = models.DecimalField(null=False, decimal_places=2, max_digits=6)
    tree_emission = models.IntegerField(null=False, default=0)
    unit = models.TextField(max_length=256, null = True)
    owner = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.name


class CarbonEntry(models.Model):
    item_involved = models.ForeignKey(
        Item, on_delete=models.CASCADE, related_name="CarbonEntry"
    )
    owner = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="CarbonEntry"
    )
    time_created = models.DateTimeField(auto_now_add=True)
    quantity = models.FloatField(default=1)
    details = models.TextField(max_length=256)

    def __str__(self):
        return self.owner.username + "'s " + self.item_involved.name + " Entry"

    def get_emissions(self):
        total = self.item_involved["emission"] * self.quantity
        return total

    def get_trees(self):
        trees = self.item_involved["tree_emission"] * self.quantity
        return trees

    @property
    def item_name(self):
        return self.item_involved.name