from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

class SignUpForm(UserCreationForm):
    username = forms.CharField(max_length=150, help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.')
    email = forms.EmailField(max_length=255, help_text='Required. Inform a valid email address.')
    first_name = forms.CharField(max_length=50, help_text='Required. Inform your first name.')
    last_name = forms.CharField(max_length=50, help_text='Required. Inform your last name.')
    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email', 'password1', 'password2')