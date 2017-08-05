# external libraries
from rest_framework import serializers

# inside project modules
from .models import *


class TodoItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = TodoItem
        fields = ('id', 'title', 'content', 'created_time', 'last_modified_time', 'urgency')


class ListTodoItemAPISerializer(serializers.Serializer):
    ORDER_CHOICES = (
        ('latest_first', 'latest_first'),
        ('oldest_first', 'oldest_first'),
        ('most_important', 'most_important'),
        ('least_important', 'least_important'),
    )
    URGENCY_FILTER_CHOICE = (
        ('vital', 'vital'),
        ('important', 'important'),
        ('normal', 'normal'),
        ('finished', 'finished'),
        ("all", "all"),
    )
    order_by = serializers.ChoiceField(choices=ORDER_CHOICES, default="latest_first")
    urgency_filter = serializers.ChoiceField(choices=URGENCY_FILTER_CHOICE, default="all")


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
