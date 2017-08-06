#!/usr/bin/env python
# !/usr/bin/env python
import os
import sys

import dotenv

if __name__ == "__main__":
    dotenv.read_dotenv()

    ENVIRONMENT = os.getenv('ENVIRONMENT')

    settings = ''

    if ENVIRONMENT == 'DEV':
        settings = 'develop'
    elif ENVIRONMENT == 'PRO':
        settings = 'production'

    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "whatodo.settings")
    os.environ.setdefault('DJANGO_CONFIGURATION', settings.title())

    from configurations.management import execute_from_command_line

    execute_from_command_line(sys.argv)
