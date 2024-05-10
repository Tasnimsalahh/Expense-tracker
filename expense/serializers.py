from rest_framework import serializers
from .models import user_balance
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
