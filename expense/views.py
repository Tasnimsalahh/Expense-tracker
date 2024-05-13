from django.shortcuts import render, redirect
from django.contrib.auth import login
from django.http import Http404
from rest_framework import generics, status
from rest_framework.response import Response
from .forms import SignUpForm
from .forms import PeriodForm
from .serializers import *
# Create your views here.

def home (request):
    if request.user.is_authenticated:
        return render(request, 'home.html')
    return redirect('login')

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

def analytics(request):
    if not (request.user.is_authenticated):
        return redirect('login')
    form = PeriodForm()
    return render(request, 'analytics.html', {'form': form})

class UserProfile(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserSerializer
    def get_queryset(self):
        return user_balance.objects.filter(user=self.request.user)
    def get_object(self):
        return self.request.user

class UserBalance(generics.RetrieveUpdateAPIView):
    serializer_class = UserBalanceSerializer
    def get_queryset(self):
        return user_balance.objects.filter(user=self.request.user)
    def get_object(self):
        try:
            return self.request.user.user_balance
        except user_balance.DoesNotExist:
            raise Http404("User does not have a user_balance")

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
    def get_object(self):
        category_id = self.kwargs['pk']
        category = Category.objects.get(id=category_id, user=self.request.user)
        return category
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        expenses = Expense.objects.filter(category=instance)
        expense_serializer = ExpenseSerializer(expenses, many=True)
        return Response({
            'category': serializer.data,
            'expenses': expense_serializer.data
        })

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
    def get_object(self):
        account_id = self.kwargs['pk']
        account = Account.objects.get(id=account_id, user=self.request.user)
        return account
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        expenses = Expense.objects.filter(account=instance)
        expense_serializer = ExpenseSerializer(expenses, many=True)
        return Response({
            'account': serializer.data,
            'expenses': expense_serializer.data
        })

class ExpenseList(generics.ListCreateAPIView):
    serializer_class = ExpenseSerializer
    def get_queryset(self):
        user_accounts = Account.objects.filter(user=self.request.user)
        return Expense.objects.filter(account__in=user_accounts)

class ExpenseDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ExpenseSerializer
    def get_queryset(self):
        user_accounts = Account.objects.filter(user=self.request.user)
        return Expense.objects.filter(account__in=user_accounts)
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.get_serializer().delete(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

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
