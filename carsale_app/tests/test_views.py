import pytest
from django.urls import reverse
from carsale_app.models import Car
from carsale_app.forms import TestDriveForm, TradeInForm
from decimal import Decimal
from datetime import date, time

@pytest.mark.django_db
def test_index_view(client):
    Car.objects.create(
        brand="BMW", model="M3", series="M-Series", year=2023,
        price=Decimal("75000.00"), power=510, max_speed=250,
        acceleration=3.9, range_km=450
    )
    response = client.get(reverse('index'))
    assert response.status_code == 200
    assert 'cars' in response.context
    assert len(response.context['cars']) <= 4
    assert any(template.name == 'index.html' for template in response.templates)

@pytest.mark.django_db
def test_models_view(client):
    Car.objects.create(
        brand="BMW", model="M3", series="M-Series", year=2023,
        price=Decimal("75000.00"), power=510, max_speed=250,
        acceleration=3.9, range_km=450
    )
    response = client.get(reverse('models'))
    assert response.status_code == 200
    assert 'cars_by_series' in response.context
    assert 'M-Series' in response.context['cars_by_series']
    assert any(template.name == 'models.html' for template in response.templates)

@pytest.mark.django_db
def test_model_page_get(client):
    car = Car.objects.create(
        brand="BMW", model="X5", series="X-Series", year=2022,
        price=Decimal("65000.00"), power=300, max_speed = 240,
        acceleration=5.5, range_km=400
    )
    response = client.get(reverse('model_page'), {'car_id': car.id})
    assert response.status_code == 200
    assert 'car' in response.context
    assert response.context['car'] == car
    assert 'form' in response.context
    assert isinstance(response.context['form'], TestDriveForm)
    assert any(template.name == 'modelPage.html' for template in response.templates)

@pytest.mark.django_db
def test_model_page_post_valid(client):
    car = Car.objects.create(
        brand="BMW", model="3-Series", series="3-Series", year=2023,
        price=Decimal("45000.00"), power=255, max_speed=235,
        acceleration=5.8, range_km=400
    )
    data = {
        'car': car.id,
        'customer_name': "Jane Smith",
        'customer_email': "jane@example.com",
        'preferred_date': "2025-05-20",
        'preferred_time': "10:00"
    }
    response = client.post(reverse('model_page'), data)
    assert response.status_code == 200
    assert response.context['error'] == ''
    assert any(template.name == 'modelPage.html' for template in response.templates)

@pytest.mark.django_db
def test_trade_in_page_post_valid(client):
    car = Car.objects.create(
        brand="BMW", model="M5", series="M-Series", year=2024,
        price=Decimal("95000.00"), power=600, max_speed=305,
        acceleration=3.4, range_km=500
    )
    data = {
        'customer_car_brand': "Audi",
        'customer_car_model': "A4",
        'customer_car_year': 2019,
        'desired_car': car.id,
        'customer_name': "John Doe",
        'preferred_date': "2025-06-01",
        'preferred_time': "14:00",
        'dealership': "Kyiv BMW"
    }
    response = client.post(reverse('trade_in_page'), data)
    assert response.status_code == 302  
    assert response.url == reverse('trade_in_page')

@pytest.mark.django_db
def test_service_page(client):
    response = client.get(reverse('service_page'))
    assert response.status_code == 200
    assert any(template.name == 'servicePage.html' for template in response.templates)

@pytest.mark.django_db
def test_contacts_page(client):
    response = client.get(reverse('contacts_page'))
    assert response.status_code == 200
    assert any(template.name == 'contactsPage.html' for template in response.templates)