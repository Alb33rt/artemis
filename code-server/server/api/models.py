from django.db import models

# Create your models here.
class CarbonEntry(models.Model):
    name = models.TextField(max_length=256)
    emission = models.IntegerField(null=False)
    '''
    True Emissions equals to a unit of item's carbon emissions, this will be the basis for the application
    '''
    true_emission = models.IntegerField()
    tree_emission = models.IntegerField()