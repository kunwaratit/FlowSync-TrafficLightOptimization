# registration/serializers.py

from rest_framework import serializers
from .utils import register_user_to_mongodb

class UserRegisterSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(min_length=6, write_only=True)
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)
    phone_number = serializers.CharField(max_length=10)
    district=serializers.CharField(max_length=20)
    intersection=serializers.CharField()

    def validate(self, attrs):
        password1 = attrs.get('password')
        password2 = attrs.get('password2')

        if password1 != password2:
            raise serializers.ValidationError("Passwords do not match.")
        return attrs

    def create(self, validated_data):
        email = validated_data['email'].lower()
        password = validated_data['password']
        phone_number = validated_data['phone_number']
        district=validated_data['district']
        intersection=validated_data['intersection']
        
        user_id = register_user_to_mongodb(email, password, phone_number,district,intersection)

        return {'user_id': user_id, 'msg': 'Registration successful'}

from rest_framework import serializers

class LoginApiSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=255)
    password = serializers.CharField(max_length=128, write_only=True)
