import pytest
from django.core.exceptions import ValidationError
from carsale_app.models import Car, TradeInRequest, TestDriveRequest
from decimal import Decimal
from datetime import date, time

@pytest.mark.django_db
def test_car_creation():
    car = Car.objects.create(
        brand="BMW",
        model="M3",
        series="M-Series",
        year=2023,
        price=Decimal("75000.00"),
        power=510,
        max_speed=250,
        acceleration=3.9,
        range_km=450,
        description="High-performance sedan"
    )
    assert car.brand == "BMW"
    assert car.model == "M3"
    assert car.series == "M-Series"
    assert car.price == Decimal("75000.00")
    assert str(car) == "BMW M3 (M-Series)"

@pytest.mark.django_db
def test_car_negative_price():
    car = Car(
        brand="BMW",
        model="X5",
        series="X-Series",
        year=2022,
        price=Decimal("-1000.00"),
        power=300,
        max_speed=240,
        acceleration=5.5,
        range_km=400
    )
    with pytest.raises(ValidationError):
        car.full_clean()  # Викликаємо валідацію

@pytest.mark.django_db
def test_trade_in_request_creation():
    car = Car.objects.create(
        brand="BMW", model="M5", series="M-Series", year=2024,
        price=Decimal("95000.00"), power=600, max_speed=305,
        acceleration=3.4, range_km=500
    )
    trade_in = TradeInRequest.objects.create(
        customer_car_brand="Audi",
        customer_car_model="A4",
        customer_car_year=2019,
        desired_car=car,
        customer_name="John Doe",
        preferred_date=date(2025, 6, 1),
        preferred_time=time(14, 0),
        dealership="Kyiv BMW"
    )
    assert trade_in.customer_name == "John Doe"
    assert trade_in.desired_car == car
    assert str(trade_in) == f"Trade-In від John Doe для {car}"

@pytest.mark.django_db
def test_test_drive_request_creation():
    car = Car.objects.create(
        brand="BMW", model="3-Series", series="3-Series", year=2023,
        price=Decimal("45000.00"), power=255, max_speed=235,
        acceleration=5.8, range_km=400
    )
    test_drive = TestDriveRequest.objects.create(
        car=car,
        customer_name="Jane Smith",
        customer_email="jane@example.com",
        preferred_date=date(2025, 5, 20),
        preferred_time=time(10, 0)
    )
    assert test_drive.customer_name == "Jane Smith"
    assert test_drive.customer_email == "jane@example.com"
    assert test_drive.car == car
    assert str(test_drive) == f"Тест-драйв від jane@example.com для {car}"