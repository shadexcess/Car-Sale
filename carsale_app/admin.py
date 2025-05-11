from django.contrib import admin
from .models import Car, TradeInRequest, TestDriveRequest

@admin.register(Car)
class CarAdmin(admin.ModelAdmin):
    list_display = ('brand', 'model', 'year', 'price')
    search_fields = ('brand', 'model')

@admin.register(TradeInRequest)
class TradeInRequestAdmin(admin.ModelAdmin):
    list_display = ('customer_name', 'desired_car', 'created_at')
    list_filter = ('created_at',)

@admin.register(TestDriveRequest)
class TestDriveRequestAdmin(admin.ModelAdmin):
    list_display = ('customer_name', 'car', 'preferred_date', 'created_at')
    list_filter = ('preferred_date', 'created_at')