from rest_framework import serializers
from .models import CustomUser

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ['email', 'password', 'first_name', 'last_name']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        # Extract the password from validated_data
        password = validated_data.pop('password')
        # Set the username to the user's email address
        validated_data['username'] = validated_data['email']
        # Create the user with the modified validated_data
        user = CustomUser.objects.create_user(**validated_data, password=password)
        return user

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()
