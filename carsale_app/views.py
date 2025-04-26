from django.shortcuts import render

def index(request):
    return render(request, 'carsale_app/index.html')

def models(request):
    return render(request, 'carsale_app/models.html')

def model_page(request):
    return render(request, 'carsale_app/modelPage.html')

def service_page(request):
    return render(request, 'carsale_app/servicePage.html')

def contacts_page(request):
    return render(request, 'carsale_app/contactsPage.html')

def trade_in_page(request):
    return render(request, 'carsale_app/tradeInPage.html')
