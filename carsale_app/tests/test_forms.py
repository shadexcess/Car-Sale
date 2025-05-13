import pytest
from django.urls import reverse, resolve
from carsale_app.views import index, models, model_page, service_page, contacts_page, trade_in_page

def test_index_url():
    url = reverse('index')
    assert resolve(url).func == index

def test_models_url():
    url = reverse('models')
    assert resolve(url).func == models

def test_model_page_url():
    url = reverse('model_page')
    assert resolve(url).func == model_page

def test_service_page_url():
    url = reverse('service_page')
    assert resolve(url).func == service_page

def test_contacts_page_url():
    url = reverse('contacts_page')
    assert resolve(url).func == contacts_page

def test_trade_in_page_url():
    url = reverse('trade_in_page')
    assert resolve(url).func == trade_in_page