# external libraries
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView

# inside project modules
from .models import *
from .serializers import *


class ListTodoItemAPIView(APIView):
    serializer_class = ListTodoItemAPISerializer
    def get(self, request):
        serializer = self.serializer_class(data=request.query_params)
        serializer.is_valid(raise_exception=True)
        orderby = serializer.validated_data.get('title')
        result_list = list()
        todo_items = TodoItem.objects.all()
        for todo_item in todo_items:
            item_dict = TodoItemSerializer(todo_item).data
            result_list.append(item_dict)
        return Response(result_list)


class AddTodoItemAPIView(APIView):
    serializer_class = AddTodoItemAPISerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        title = serializer.validated_data.get('title')
        content = serializer.validated_data.get('content')
        urgency = serializer.validated_data.get('urgency')
        new_item = TodoItem.objects.create(title=title, content=content, urgency=urgency)
        item_dict = TodoItemSerializer(new_item).data
        return Response(item_dict)


class ChangeTodoItemAPIView(APIView):
    serializer_class = ChangeTodoItemAPISerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        item_id = serializer.validated_data.get('id')
        title = serializer.validated_data.get('title')
        content = serializer.validated_data.get('content')
        urgency = serializer.validated_data.get('urgency')
        todo_item = TodoItem.objects.get(pk=item_id)
        todo_item.title = title
        todo_item.content = content
        todo_item.urgency = urgency
        todo_item.save()
        item_dict = TodoItemSerializer(todo_item).data
        return Response(item_dict)


class DeleteTodoItemAPIView(APIView):
    serializer_class = DeleteTodoItemAPISerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        item_id = serializer.validated_data.get('id')
        TodoItem.objects.get(pk=item_id).delete()
        return Response(["success"])


class CheckTodoItemAPIView(APIView):
    serializer_class = CheckTodoItemAPISerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        item_id = serializer.validated_data.get('id')
        todo_item = TodoItem.objects.get(pk=item_id)
        todo_item.urgency = "finished"
        todo_item.save()
        return Response(["success"])
