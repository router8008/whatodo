# external libraries
from rest_framework import serializers

# inside project modules
from .models import *


class AddTodoItemSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=100)
    content = serializers.CharField(max_length=1000)
    urgency = serializers.ChoiceField(choices=TodoItem.URGENCY_CHOICES)

