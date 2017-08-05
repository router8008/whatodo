# external libraries
from rest_framework import serializers

# inside project modules
from .models import *


class TodoItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = TodoItem
        fields = ('id', 'title', 'content', 'created_time', 'last_modified_time', 'urgency')


class AddTodoItemAPISerializer(serializers.Serializer):
    title = serializers.CharField(max_length=100)
    content = serializers.CharField(max_length=1000, default="")
    urgency = serializers.ChoiceField(choices=TodoItem.URGENCY_CHOICES)


class ChangeTodoItemAPISerializer(serializers.Serializer):
    id = serializers.IntegerField()
    title = serializers.CharField(max_length=100)
    content = serializers.CharField(max_length=1000, default="")
    urgency = serializers.ChoiceField(choices=TodoItem.URGENCY_CHOICES)


class DeleteTodoItemAPISerializer(serializers.Serializer):
    id = serializers.IntegerField()


class CheckTodoItemAPISerializer(serializers.Serializer):
    id = serializers.IntegerField()
