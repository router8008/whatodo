from django.conf.urls import url

from .views import *

urlpatterns = [
    url(r'^itemlist/', ListTodoItemAPISerializer.as_view(), name='item_list'),
    url(r'^additem/', AddTodoItemAPIView.as_view(), name='add_item'),
    url(r'^changeitem/', ChangeTodoItemAPIView.as_view(), name='change_item'),
    url(r'^deleteitem/', DeleteTodoItemAPIView.as_view(), name="delete_item"),
    url(r'^checkitem/', CheckTodoItemAPIView.as_view(), name="check_item"),
]
