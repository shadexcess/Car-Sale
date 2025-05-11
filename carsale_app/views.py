from django.shortcuts import render, redirect
from .forms import TestDriveForm, TradeInForm
from .models import Car

def index(request):
    cars = Car.objects.all()[:4]  # Обмежуємо до 4 автомобілів для головної сторінки
    return render(request, 'index.html', {'cars': cars})

def models(request):
    series = Car.objects.values('series').distinct()  # Отримуємо унікальні серії
    cars_by_series = {s['series']: Car.objects.filter(series=s['series']) for s in series}
    return render(request, 'models.html', {'cars_by_series': cars_by_series})

def model_page(request):
    error = ''
    if request.method == 'POST':
        form = TestDriveForm(request.POST)
        if form.is_valid():
            form.save()
        else:
            error = 'Форма була некоректна'
    
    # Отримуємо ID автомобіля з параметра запиту (наприклад, ?car_id=1)
    car_id = request.GET.get('car_id')
    car = None
    if car_id:
        try:
            car = Car.objects.get(id=car_id)
        except Car.DoesNotExist:
            car = None
    
    data = {
        'form': TestDriveForm(),
        'car': car,
        'error': error
    }
    return render(request, 'modelPage.html', data)

def service_page(request):
    return render(request, 'servicePage.html')

def contacts_page(request):
    return render(request, 'contactsPage.html')

def trade_in_page(request):
    if request.method == 'POST':
        form = TradeInForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('trade_in_page')  # Перенаправлення після збереження
    
    data = {
        'form': TradeInForm()
    }
    return render(request, 'tradeInPage.html', data)