# Users/models.py

from django.db import models
from passlib.hash import django_pbkdf2_sha256 as handler
from datetime import datetime

class User(models.Model):
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    phone_number = models.CharField(max_length=20)
    district = models.CharField(max_length=100)
    intersection = models.CharField(max_length=100)
    location_id = models.CharField(max_length=50, unique=True)
    is_active = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    is_user = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        # Hash the password before saving
        self.password = handler.hash(self.password)
        return super().save(*args, **kwargs)

    def __str__(self):
        return self.email
