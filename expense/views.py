from django.shortcuts import render, redirect
from django.contrib.auth import login
from rest_framework import generics
from .forms import SignUpForm
from .serializers import *
# Create your views here.

def signup(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            # return redirect('home')
        else:
            print(form.errors)
    else:
        form = SignUpForm()
    return render(request, 'signup.html', {'form': form})

class UserBalance(generics.RetrieveUpdateDestroyAPIView):
    queryset = user_balance.objects.all()
    serializer_class = UserBalanceSerializer

    def get_object(self):
        return self.request.user.user_balance

class UserProfile(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserSerializer
    def get_object(self):
        return self.request.user


class CategoryList(generics.ListCreateAPIView):
    queryset=Category.objects.all()
    serializer_class=CategorySerializer

    def perform_create(self,serializer):
        serializer.save(user=self.request.user)

class CategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class AccountView(generics.ListCreateAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
class AccountDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

class ExpenseList(generics.ListCreateAPIView):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer

class ExpenseDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer

