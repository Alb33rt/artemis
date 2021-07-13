from django.db import models

# Create your models here.
class CarbonEntry(models.Model):
    name = models.TextField(max_length=256)
<<<<<<< HEAD
    emission = models.IntegerField(null=False, default=0)
=======
    emission = models.IntegerField(null=False)
>>>>>>> dabb72837f7c1215ed39e650f417de7c5772a1f5
    true_emission = models.IntegerField(null=False, default=0)
    tree_emission = models.IntegerField(null=False, default=0)


class Donation(models.Model):
    username = models.TextField(max_length=256)
    amount = models.IntegerField(null=False)
