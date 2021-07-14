from django.db import models
from django.db.models.fields import related

from user_auth.models import User

# Create your models here.
class CarbonItem(models.Model):
    name = models.TextField(max_length=256)
    emission = models.IntegerField(null=False)
    tree_emission = models.IntegerField(null=False, default=0)
    unit = models.TextField(max_length=256, null=True)
    owner = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.name


class GreenItem(models.Model):
    name = models.TextField(max_length=256)
    oxygen = models.IntegerField(null=False)
    tree_oxygen = models.IntegerField(null=False, default=0)
    unit = models.TextField(max_length=256, null=True)
    owner = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.name


class CarbonEntry(models.Model):
    item_involved = models.ForeignKey(
        CarbonItem, on_delete=models.CASCADE, related_name="CarbonEntry"
    )
    owner = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="CarbonEntry"
    )
    time_created = models.DateTimeField(auto_now_add=True)
    quantity = models.FloatField(default=1)
    details = models.TextField(max_length=256)

    def __str__(self):
        return self.owner.username + "'s " + self.item_involved.name + " Entry"

    @property
    def get_emissions(self):
        total = self.item_involved.emission
        return total

    def get_trees(self):
        trees = self.item_involved.tree_emission
        return trees

    @property
    def item_name(self):
        return self.item_involved.name

    @property
    def unit_name(self):
        return self.item_involved.unit


class GreenEntry(models.Model):
    item_involved = models.ForeignKey(
        GreenItem, on_delete=models.CASCADE, related_name="GreenEntry"
    )
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="GreenEntry")
    time_created = models.DateTimeField(auto_now_add=True)
    quantity = models.FloatField(default=1)
    details = models.TextField(max_length=256)

    def __str__(self):
        return self.owner.username + "'s " + self.item_involved.name + " Entry"

    def get_oxygens(self):
        total = self.item_involved["oxygen"] * self.quantity
        return total

    def get_trees(self):
        trees = self.item_involved["tree_oxygen"] * self.quantity
        return trees

    @property
    def item_name(self):
        return self.item_involved.name

    @property
    def unit_name(self):
        return self.item_involved.unit