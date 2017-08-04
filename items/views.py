# external libraries
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView

# inside project modules
from .models import *
from .serializers import *


class TodoItemListAPIView(APIView):
    def get(self, request):
        result_list = list()
        todo_items = TodoItem.objects.all()
        for todo_item in todo_items:
            result_list.append({
                "id": todo_item.pk,
                "title": todo_item.title,
                "content": todo_item.content,
                "urgency": todo_item.urgency,
                "created_time": todo_item.created_time,
                "last_modified_time": todo_item.last_modified_time,
            })
        return Response(result_list)


class AddTodoItemSerializerAPIView(APIView):
    serializer_class = AddTodoItemSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        title = serializer.validated_data.get('title')
        content = serializer.validated_data.get('content')
        urgency = serializer.validated_data.get('urgency')
        TodoItem.objects.create(title=title, content=content, urgency=urgency)
        return Response(["success"])
