from django.urls import path
from . import views

app_name = 'AGP'

urlpatterns = [
    path('',views.home,name = 'Home'),
    path('Resultado-AG/',views.Resp,name = 'AGResultado'),
]