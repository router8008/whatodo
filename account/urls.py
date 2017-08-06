from django.conf.urls import url

from .views import *

urlpatterns = [
    url(r'^register/', RegisterAPIView.as_view(), name='register'),
    url(r'^login/', LoginAPIView.as_view(), name='login'),
]
