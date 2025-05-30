from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('models/', views.models, name='models'),
    path('model_page/', views.model_page, name='model_page'),
    path('service/', views.service_page, name='service_page'),
    path('contacts/', views.contacts_page, name='contacts_page'),
    path('trade_in/', views.trade_in_page, name='trade_in_page'),
    path('get_car_price/<int:car_id>/', views.get_car_price, name='get_car_price'),
]