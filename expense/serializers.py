from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email']
        
    def create(self, validated_data):
        user = User.objects.create(**validated_data)
        user_balance.objects.create(user=user)
        return user

class UserBalanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = user_balance
        fields = '__all__'

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

class ShoppingListSerializer(serializers.ModelSerializer):
    class Meta:
        model = shopping_list
        fields = '__all__'
        read_only_fields = ['user']

class GoalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Goal
        fields = '__all__'
        read_only_fields = ['user']