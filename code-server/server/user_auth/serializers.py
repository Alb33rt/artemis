from rest_framework import serializers

from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username"]


class RegisterSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(
        style={"input_type": "password"}, required=True, write_only=True
    )

    class Meta:
        model = User
        fields = ["email", "username", "password", "password2"]
        extra_kwargs = {"password": {"write_only": True}}

    def save(self):
        user = User(
            email=self.validated_data["email"],
            username=self.validated_data["username"],
        )
        password = self.validated_data["password"]
        password2 = self.validated_data["password2"]

        if password != password2:
            raise serializers.ValidationError({"password": "Passwords much match."})

        user.set_password(password)
        user.save()
        return user


class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["email", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

class EditProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'username', 'email', 'type_of_lifestyle']

class ChangeBaseProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name']
