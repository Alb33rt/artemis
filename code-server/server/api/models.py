from django.db import models

# Create your models here.
class CarbonEntry(models.Model):
    name = models.TextField(max_length=256)
    emission = models.IntegerField(null=False)
    true_emission = models.IntegerField(null=False)
    tree_emission = models.IntegerField(null=False)


class Donation(models.Model):
    username = models.TextField(max_length=256)
    amount = models.IntegerField(null=False)
