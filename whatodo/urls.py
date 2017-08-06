from django.conf.urls import include, url
from django.contrib import admin

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^items/', include('items.urls')),
    url(r'^account/', include('account.urls')),
]
