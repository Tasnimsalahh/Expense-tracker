from django.db import models
from django.conf import settings
from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class user_balance(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    primary_currency = models.CharField(max_length=10)
    total_balance = models.DecimalField(max_digits=10, decimal_places=2)


