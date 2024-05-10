from rest_framework import serializers
from .models import user_balance, Category, Account,Expense
from django.contrib.auth.models import User

class UserBalanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = user_balance
        fields = ['user', 'primary_currency', 'total_balance']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email']
        
    def create(self, validated_data):
        user = User.objects.create(**validated_data)
        user_balance.objects.create(user=user)
        return user


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
        read_only_fields = ['user']


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = '__all__'
        read_only_fields = ['user']

class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = '__all__'