from django.shortcuts import render, redirect
from django.contrib.auth import login
from rest_framework import generics
from .forms import SignUpForm
from .serializers import *
# Create your views here.

def home (request):
    return render(request, 'home.html')

def signup(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('home')
        else:
            print(form.errors)
    else:
        form = SignUpForm()
    return render(request, 'signup.html', {'form': form})

class UserProfile(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserSerializer
    def get_object(self):
        return self.request.user

class UserBalance(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserBalanceSerializer
    def get_queryset(self):
        return user_balance.objects.filter(user=self.request.user)
    def get_object(self):
        return self.request.user.user_balance

class CategoryList(generics.ListCreateAPIView):
    serializer_class=CategorySerializer
    def get_queryset(self):
        return Category.objects.filter(user=self.request.user)
    def perform_create(self,serializer):
        serializer.save(user=self.request.user)

class CategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CategorySerializer
    def get_queryset(self):
        return Category.objects.filter(user=self.request.user)

class AccountList(generics.ListCreateAPIView):
    serializer_class = AccountSerializer
    def get_queryset(self):
        return Account.objects.filter(user=self.request.user)
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class AccountDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = AccountSerializer
    def get_queryset(self):
        return Account.objects.filter(user=self.request.user)

class ExpenseList(generics.ListCreateAPIView):
    serializer_class = ExpenseSerializer
    def get_queryset(self):
        return Expense.objects.filter(user=self.request.user)

class ExpenseDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ExpenseSerializer
    def get_queryset(self):
        return Expense.objects.filter(user=self.request.user)

class ShoppingList(generics.ListCreateAPIView):
    serializer_class = ShoppingListSerializer
    def get_queryset(self):
        return shopping_list.objects.filter(user=self.request.user)
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ShoppingListDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ShoppingListSerializer
    def get_queryset(self):
        return shopping_list.objects.filter(user=self.request.user)

class GoalList(generics.ListCreateAPIView):
    serializer_class = GoalSerializer
    def get_queryset(self):
        return Goal.objects.filter(user=self.request.user)
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class GoalDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = GoalSerializer
    def get_queryset(self):
        return Goal.objects.filter(user=self.request.user)
