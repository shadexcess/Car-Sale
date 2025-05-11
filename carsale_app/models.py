from django.db import models

class Car(models.Model):
    brand = models.CharField(max_length=50, verbose_name="Марка", default="BMW")
    model = models.CharField(max_length=50, verbose_name="Модель")
    series = models.CharField(max_length=50, verbose_name="Серія")  # Наприклад, M-Series, X-Series
    year = models.PositiveIntegerField(verbose_name="Рік випуску", null=True, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Ціна")
    power = models.IntegerField(verbose_name="Потужність (к.с.)")
    max_speed = models.IntegerField(verbose_name="Макс. швидкість (км/год)")
    acceleration = models.FloatField(verbose_name="Прискорення (с)")
    range_km = models.IntegerField(verbose_name="Запас ходу (км)")
    description = models.TextField(verbose_name="Опис", blank=True)
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Дата створення")

    class Meta:
        verbose_name = "Автомобіль"
        verbose_name_plural = "Автомобілі"

    def __str__(self):
        return f"{self.brand} {self.model} ({self.series})"

class TradeInRequest(models.Model):
    customer_car_brand = models.CharField(max_length=50, verbose_name="Марка авто клієнта")
    customer_car_model = models.CharField(max_length=50, verbose_name="Модель авто клієнта")
    customer_car_year = models.PositiveIntegerField(verbose_name="Рік випуску авто клієнта")
    desired_car = models.ForeignKey(Car, on_delete=models.CASCADE, verbose_name="Бажаний автомобіль", related_name="trade_in_requests")
    customer_name = models.CharField(max_length=100, verbose_name="Ім'я клієнта")
    preferred_date = models.DateField(verbose_name="Бажана дата")
    preferred_time = models.TimeField(verbose_name="Бажаний час")
    dealership = models.CharField(max_length=50, verbose_name="Автосалон")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Дата заявки")

    class Meta:
        verbose_name = "Заявка на Trade-In"
        verbose_name_plural = "Заявки на Trade-In"

    def __str__(self):
        return f"Trade-In від {self.customer_name} для {self.desired_car}"

class TestDriveRequest(models.Model):
    car = models.ForeignKey(Car, on_delete=models.CASCADE, verbose_name="Автомобіль", related_name="test_drive_requests")
    customer_name = models.CharField(max_length=100, verbose_name="Ім'я клієнта")
    customer_email = models.EmailField(verbose_name="Електронна пошта")
    preferred_date = models.DateField(verbose_name="Бажана дата")
    preferred_time = models.TimeField(verbose_name="Бажаний час")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Дата заявки")

    class Meta:
        verbose_name = "Заявка на тест-драйв"
        verbose_name_plural = "Заявки на тест-драйв"

    def __str__(self):
        return f"Тест-драйв від {self.customer_email} для {self.car}"