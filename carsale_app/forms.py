from django import forms
from .models import TradeInRequest, TestDriveRequest, Car

class TestDriveForm(forms.ModelForm):
    class Meta:
        model = TestDriveRequest
        fields = ['car', 'preferred_date', 'preferred_time', 'customer_name', 'customer_email']

        widgets = {
            'car': forms.Select(
                attrs={
                    'class': 'car-select',
                    'id': 'id_car'
                }
            ),
            'preferred_date': forms.DateInput(
                attrs={
                    'type': 'date',
                    'class': 'choice-input',
                    'id': 'dateInput'
                }
            ),
            'preferred_time': forms.TimeInput(
                attrs={
                    'type': 'time',
                    'class': 'choice-input',
                    'id': 'timeInput'
                }
            ),
            'customer_name': forms.TextInput(
                attrs={
                    'placeholder': "ім'я",
                    'class': 'choice-input',
                    'id': 'nameInput'
                }
            ),
            'customer_email': forms.EmailInput(
                attrs={
                    'placeholder': 'е-пошта',
                    'class': 'choice-input',
                    'id': 'emailInput'
                }
            ),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['car'].queryset = Car.objects.all()

class TradeInForm(forms.ModelForm):
    class Meta:
        model = TradeInRequest
        fields = ['customer_car_brand', 'customer_car_model', 'customer_car_year', 'desired_car',
                  'customer_name', 'preferred_time', 'preferred_date', 'dealership']

        widgets = {
            'customer_car_brand': forms.Select(
                choices=[
                    ('none', 'Оберіть марку'),
                    ('BMW', 'BMW'),
                    ('Porsche', 'Porsche'),
                    ('Ford', 'Ford'),
                    ('Toyota', 'Toyota'),
                    ('Volkswagen', 'Volkswagen'),
                    ('Mercedes', 'Mercedes-Benz'),
                    ('Renault', 'Renault'),
                    ('Honda', 'Honda'),
                    ('Hyundai', 'Hyundai'),
                ],
                attrs={
                    'class': 'choice-select',
                    'id': 'id_customer_car_brand'
                }
            ),
            'customer_car_model': forms.TextInput(
                attrs={
                    'placeholder': 'Модель автомобіля',
                    'class': 'choice-input',
                    'id': 'id_customer_car_model'
                }
            ),
            'customer_car_year': forms.Select(
                choices=[(str(year), str(year)) for year in range(2025, 1999, -1)],
                attrs={
                    'class': 'choice-select',
                    'id': 'id_customer_car_year'
                }
            ),
            'desired_car': forms.Select(
                attrs={
                    'class': 'choice-select',
                    'id': 'id_desired_car'
                }
            ),
            'customer_name': forms.TextInput(
                attrs={
                    'placeholder': "Ім'я",
                    'class': 'choice-input',
                    'id': 'id_customer_name'
                }
            ),
            'preferred_time': forms.TimeInput(
                attrs={
                    'type': 'time',
                    'class': 'choice-input',
                    'id': 'id_preferred_time'
                }
            ),
            'preferred_date': forms.DateInput(
                attrs={
                    'type': 'date',
                    'class': 'choice-input',
                    'id': 'id_preferred_date'
                }
            ),
            'dealership': forms.Select(
                choices=[
                    ('Kyiv', 'Київ'),
                    ('Lviv', 'Львів'),
                    ('Odesa', 'Одеса'),
                    ('Kharkiv', 'Харків'),
                ],
                attrs={
                    'class': 'choice-select',
                    'id': 'id_dealership'
                }
            ),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['desired_car'].queryset = Car.objects.all()