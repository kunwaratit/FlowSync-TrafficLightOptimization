"""
Django settings for FlowApp project.

Generated by 'django-admin startproject' using Django 4.2.13.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.2/ref/settings/
"""
import os
from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

TIME_ZONE = 'Asia/Kathmandu'  # Adjust this to your actual time zone
USE_TZ = True


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-g#%@e-9cc1k3c-k+^4ftak(0(^*=qjndjhj_tms-ezsk$-f)9j'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    # required during frontend
    'corsheaders',
    
    'compressor',
    # restframeworks
    'rest_framework',
    'rest_framework_simplejwt',
    
    
    # apps we created
    # 'Det_CounterApp',
    # 'WebApp',
    'registration',
    'myapp',
    # practice apps
    'vh',
    'Users',
#    'AI_Detection_App'
# 'background_tasks',
'adminDash',
'FetchApp'
#  'FlowApp.background_tasks.apps.BackgroundTasksConfig',
]
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    "corsheaders.middleware.CorsMiddleware",#corsheaders middleware
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]


REST_FRAMEWORK = {
    
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    # 'DEFAULT_RENDERER_CLASSES':(
    #     'rest_framework.renderers.JSONRenderer',
    # )

  
    
}
from datetime import timedelta
SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=5),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=1),
}
CORS_ALLOWED_ORIGINS = [
    "http://localhost:8000",
    "http://127.0.0.1:8000",
]


ROOT_URLCONF = 'FlowApp.urls'

# yo three lines k  ho?
COMPRESS_ROOT = BASE_DIR / 'static'

COMPRESS_ENABLED = True

STATICFILES_FINDERS = ('compressor.finders.CompressorFinder',)

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        # 'DIRS': [],
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'FlowApp.wsgi.application'

CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',
]
CORS_ALLOW_ALL_ORIGINS = True

# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': BASE_DIR / 'db.sqlite3',
#     }
# }

import pymongo
from pymongo.errors import ConnectionFailure

try:
    pass
    pymongo.MongoClient('mongodb://localhost:27017/').admin.command('ismaster')
    cluster_host = 'mongodb://localhost:27017/'
    print('local database is used')
    # pymongo.MongoClient('mongodb+srv://atit191508:463vLueggjud8Lt9@cluster0.lzqevpf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').admin.command('ismaster')
    # cluster_host = 'mongodb+srv://atit191508:463vLueggjud8Lt9@cluster0.lzqevpf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
    # print('cluster is used')
except ConnectionFailure:
    cluster_host = 'mongodb://localhost:27017/'
    print('local database is used')
DATABASES = {
    'default': {
        'ENGINE': 'djongo',
        'NAME': 'Flow',
        'CLIENT': {
            'host': cluster_host,
        }
    }
}
MONGODB_SETTINGS = {
    'HOST': cluster_host,
    'DB_NAME': 'Flow'
}



# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = '/static/'
# STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
AUTH_USER_MODEL='registration.User'

# settings.py

# settings.py

CELERY_BROKER_URL = 'amqp://localhost'  # Default RabbitMQ URL
CELERY_RESULT_BACKEND = 'rpc://'  # RPC is suitable for use with RabbitMQ
CELERY_ACCEPT_CONTENT = ['json']
CELERY_TASK_SERIALIZER = 'json'
CELERY_RESULT_SERIALIZER = 'json'
CELERY_TIMEZONE = 'UTC'

