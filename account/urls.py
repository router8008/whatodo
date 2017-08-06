from django.conf.urls import url

from .views import *

urlpatterns = [
    url(r'^register/', RegisterAPIView.as_view(), name='register'),
    url(r'^login/', LoginAPIView.as_view(), name='login'),
    url(r'^logout/', LogoutAPIView.as_view(), name='logout'),
    url(r'^getusername/', GetUsernameAPIView.as_view(), name='get_username'),
]
