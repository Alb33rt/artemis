from django.db import models

# Create your models here.
class CarbonEntry(models.Model):
    name = models.TextField(max_length=256)
    emission = models.IntegerField(null=False)
