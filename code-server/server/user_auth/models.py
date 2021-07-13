from django.db import models
from django.contrib.auth.models import AbstractUser

from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

import bcrypt

# Create your models here.
class User(AbstractUser):
    pass

# def generate_password_hash(password: str) -> bytes:
#     # This function adds a salt(random string) to the original password and turn it into bytes
#     salt = bcrypt.gensalt()
#     password = password.encode("utf-8")
#     hashed = bcrypt.hashpw(password=password, salt=salt).decode("UTF-8")
#     return hashed


def check_password(password: bytes, password_hash: bytes) -> bool:
    # This function can compare the hash codes and give off a boolean whether the passwords are the same.
    # This would solve the encryption easily and really convenient
    return bcrypt.checkpw(password, password_hash)

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    '''
    Automatically creates token for every new user created.
    '''
    if created:
        Token.objects.create(user=instance)

# def check_password(password: bytes, password_hash: bytes) -> bool:
#     # This function can compare the hash codes and give off a boolean whether the passwords are the same.
#     # This would solve the encryption easily and really convenient
#     return bcrypt.checkpw(password, password_hash)
