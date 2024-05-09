from django.db import models
from django.conf import settings
from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class user_balance(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE,related_name='models')
    primary_currency = models.CharField(max_length=10)
    total_balance = models.DecimalField(max_digits=10, decimal_places=2)
class shopping_list(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    description = models.TextField(default='')
    title = models.CharField(max_length=200)
    balance = models.DecimalField(max_digits=10, decimal_places=2)

    def str(self):
        return self.title
class Category(models.Model):
    title = models.CharField(max_length=200)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def str(self):
        return self.title
class Account(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    currency = models.CharField(max_length=10)
    balance = models.DecimalField(max_digits=10, decimal_places=2)
    type = models.CharField(max_length=200)

#class Expense(models.Model):
    #category = models.ForeignKey(Category, on_delete=models.CASCADE)
    #account = models.ForeignKey(Account, on_delete=models.CASCADE)
    #amount = models.DecimalField(max_digits=10, decimal_places=2)
    #time = models.DateTimeField()
#class Goal(models.Model):
    #user = models.ForeignKey(User, on_delete=models.CASCADE)
    #description = models.TextField(default='')
    #deadline = models.DateTimeField()
    #targetMoney = models.DecimalField(max_digits=10, decimal_places=2)
    #account = models.ForeignKey(Account, on_delete=models.CASCADE)




