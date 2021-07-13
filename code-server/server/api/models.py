from django.db import models

# Create your models here.
class CarbonEntry(models.Model):
    name = models.TextField(max_length=256)
    """
    True Emissions equals to a unit of item's carbon emissions, this will be the basis for the application
    """
    emission = models.IntegerField(null=False)
    true_emission = models.IntegerField()
    tree_emission = models.IntegerField()
    time = models.TimeField(auto_now=False, auto_now_add=True)