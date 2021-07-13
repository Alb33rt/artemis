from django.db import models

# Create your models here.
class Donation(models.Model):
    username = models.TextField(max_length=256)
    amount = models.IntegerField(null=False)
    time = models.TimeField(auto_now=False, auto_now_add=True)