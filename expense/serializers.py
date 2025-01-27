from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email']
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
    def create(self, validated_data):
        account = super().create(validated_data)
        self.update_user_balance(account)
        return account
    def update(self, instance, validated_data):
        account = super().update(instance, validated_data)
        self.update_user_balance(account)
        return account
    @staticmethod
    def update_user_balance(account):
        userbalance = user_balance.objects.get(user=account.user)
        if userbalance.primary_currency == account.currency:
            userbalance.total_balance = sum(account.balance for account in Account.objects.filter(user=account.user, currency=account.currency))
            userbalance.save()

class ExpenseSerializer(serializers.ModelSerializer):
    category_name = serializers.SerializerMethodField()
    category_color = serializers.SerializerMethodField()
    account_name = serializers.SerializerMethodField()
    account_color = serializers.SerializerMethodField()
    account_currency = serializers.SerializerMethodField()
    class Meta:
        model = Expense
        fields = ['id', 'amount', 'time', 'category', 'category_name', 'category_color', 'account', 'account_name', 'account_color', 'account_currency']
    def get_category_name(self, obj):
        return obj.category.title
    def get_category_color(self, obj):
        return obj.category.color
    def get_account_name(self, obj):
        return obj.account.name
    def get_account_color(self, obj):
        return obj.account.color
    def get_account_currency(self, obj):
        return obj.account.currency
    def get_fields(self):
        fields = super(ExpenseSerializer, self).get_fields()
        request = self.context.get('request', None)
        if request is not None:
            fields['account'].queryset = Account.objects.filter(user=request.user)
            fields['category'].queryset = Category.objects.filter(user=request.user)
        return fields
    def create(self, validated_data):
        expense = super().create(validated_data)
        self.update_account_balance(expense)
        AccountSerializer.update_user_balance(expense.account)
        return expense
    def update(self, instance, validated_data):
        # Store the old amount before updating
        old_amount = instance.amount
        expense = super().update(instance, validated_data)
        self.update_account_balance(expense, old_amount)
        AccountSerializer.update_user_balance(expense.account)
        return expense
    def delete(self, instance):
        instance.amount = -instance.amount
        self.update_account_balance(instance)
        AccountSerializer.update_user_balance(instance.account)
        instance.delete()
    @staticmethod
    def update_account_balance(expense, old_amount=0):
        account = Account.objects.get(id=expense.account.id)
        # If old_amount is provided, add it back to the balance first
        if old_amount:
            account.balance -= old_amount
        account.balance += expense.amount
        account.save()

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