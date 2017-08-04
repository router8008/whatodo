from django.conf.urls import url

from .views import *

urlpatterns = [
    url(r'itemlist/', TodoItemListAPIView.as_view(), name='itemlist'),
    url(r'additem/', AddTodoItemSerializerAPIView.as_view(), name='additem'),
]
