from django.contrib.auth.models import User
from rest_framework import serializers
from .models import User




class UserRegisterSerializer(serializers.ModelSerializer):
    password2=serializers.CharField(style={'input_type':'password'}
                                    ,write_only= True)
    class Meta:
        model = User
        fields = ['email','name','phone_number', 'password','password2','tc']
        extra_kwargs = {'password': {'write_only': True}}
    
    
    def validate(self, attrs):
        password=attrs.get('password')
        password2=attrs.get('password2')
        if password!=password2:
             raise serializers.ValidationError("Password doesn't match")
        return attrs
    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
    
    
class LoginApiSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255)
    class Meta:
        model=User
        fields=['email','password']