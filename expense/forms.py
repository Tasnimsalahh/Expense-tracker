from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from .models import user_balance, Category

class SignUpForm(UserCreationForm):
    username = forms.CharField(max_length=150, help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.')
    email = forms.EmailField(max_length=255, help_text='Required. Inform a valid email address.')
    primary_currency = forms.CharField()
    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2', 'primary_currency')
    def save(self, commit=True):
        user = super().save(commit=False)
        if commit:
            user.save()
            user_balance.objects.create(user=user, primary_currency=self.cleaned_data.get('primary_currency'), total_balance=0)
            
            # Add default categories
            default_categories = [
                ("Housing", "#FF0000"),
                ("Groceries", "#00FF00"),
                ("Transportation", "#0000FF"),
                ("Insurance", "#FFFF00"),
                ("Debt Payments", "#00FFFF"),
                ("Personal Care", "#FF00FF"),
                ("Dining Out", "#FFA500"),
                ("Entertainment", "#FFC0CB"),
                ("Shopping", "#00CED1"),
                ("Subscriptions", "#FF1493"),
                ("Travel", "#008000"),
                ("Education", "#800080"),
                ("Fees & Services", "#FF4500"),
                ("Work", "#FFD700"),
                ("Investments", "#FF69B4")
            ]
            for category, color in default_categories:
                Category.objects.create(title=category, color=color, user=user)
        return user

class PeriodForm(forms.Form):
    PERIOD_CHOICES = [
        ('7', '7 days'),
        ('30', '30 days'),
        ('90', '90 days'),
        ('365', '365 days'),
        ('100000', 'All time')
    ]
    period = forms.ChoiceField(choices=PERIOD_CHOICES)