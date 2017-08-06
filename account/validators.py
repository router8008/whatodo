import re
from django.core.exceptions import ValidationError


class SafeString(object):
    """
    safe string includes number, alphabet, underline, -, +, ?
    """

    def __init__(self, name):
        self.name = name

    def __call__(self, value, *args, **kwargs):
        if not re.search(u'^[_a-zA-Z0-9\-\+\?]+$', value):
            raise ValidationError(u'%s contains illegal characters', value)


class MinLength(object):
    def __init__(self, name, length):
        self.name = name
        self.length = length

    def __call__(self, value, *args, **kwargs):
        if len(value) < self.length:
            raise ValidationError(u'ensure %s has at least %d characters' % (self.name, self.length))


class MaxLength(object):
    def __init__(self, name, length):
        self.name = name
        self.length = length

    def __call__(self, value, *args, **kwargs):
        if len(value) > self.length:
            raise ValidationError(u'ensure %s has at most %d characters' % (self.name, self.length))
