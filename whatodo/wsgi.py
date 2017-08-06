"""
WSGI config for whatodo project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/1.8/howto/deployment/wsgi/
"""

import os

import dotenv

dotenv.read_dotenv(os.path.join(os.path.dirname(os.path.dirname(__file__)), '.env'))

ENVIRONMENT = os.getenv('ENVIRONMENT')

settings = ''

if ENVIRONMENT == 'DEV':
    settings = 'develop'
elif ENVIRONMENT == 'PRO':
    settings = 'production'

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "whatodo.settings")
os.environ.setdefault('DJANGO_CONFIGURATION', settings.title())

from configurations.wsgi import get_wsgi_application

application = get_wsgi_application()
