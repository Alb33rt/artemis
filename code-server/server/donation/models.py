from django.db import models

from user_auth.models import User

from django.core.validators import MaxValueValidator, MinValueValidator

# Create your models here.
class Donation(models.Model):
    firstname = models.CharField(max_length=256, null=True)
    lastname = models.CharField(max_length=256, null=True)

    credit_card_number = models.TextField(max_length=19)
    expiration_year = models.IntegerField(
        null=False,
        default=30, 
        validators=[
            MaxValueValidator(99),
            MinValueValidator(20)
        ]
        )
    expiration_month = models.IntegerField(
        null=False,
        default=1,
        validators=[
            MaxValueValidator(12),
            MinValueValidator(1)
        ]
        )
    confirm_code = models.TextField(max_length=3)

    quantity = models.IntegerField(null=False, default=0)
    time = models.DateTimeField(auto_now=False, auto_now_add=True)

    owner = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.owner.username + "'s Donation"