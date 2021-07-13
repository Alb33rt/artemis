from django.db import models
from django.contrib.auth.models import AbstractUser
import bcrypt

# Create your models here.
class User(AbstractUser):
    username = models.TextField(max_length=128)
    password = models.TextField(max_length=128)
    time = models.TimeField(auto_now=False, auto_now_add=True)


def generate_password_hash(password: str) -> bytes:
    # This function adds a salt(random string) to the original password and turn it into bytes
    salt = bcrypt.gensalt()
    password = password.encode("utf-8")
    hashed = bcrypt.hashpw(password=password, salt=salt).decode("UTF-8")
    return hashed


def check_password(password: bytes, password_hash: bytes) -> bool:
    # This function can compare the hash codes and give off a boolean whether the passwords are the same.
    # This would solve the encryption easily and really convenient
    return bcrypt.checkpw(password, password_hash)