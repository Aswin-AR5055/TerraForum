from rest_framework import serializers

class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=50)
    password = serializers.CharField(max_length=128)

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()