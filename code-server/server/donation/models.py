from django.db import models

# Create your models here.
class Donation(models.Model):
    firstname = models.TextField(max_length=256, null=True)
    lastname = models.TextField(max_length=256, null=True)
    credit_card_number = models.TextField(max_length=16)
    expiration_year = models.TextField(null=False)
    expiration_month = models.IntegerField(null=False)
    confirm_code = models.TextField(max_length=3)
    quantity = models.IntegerField(null=False)
    time = models.DateTimeField(auto_now=False, auto_now_add=True)