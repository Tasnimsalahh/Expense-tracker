from django.urls import path
from django.contrib.auth import views as auth_views
from expense import views

urlpatterns = [
    path('signup/', views.signup, name='signup'),
    path('login/', auth_views.LoginView.as_view(template_name='login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('API/profile/', views.UserProfile.as_view(), name='api_profile'),
    path('API/balance/', views.UserBalance.as_view(), name='api_balance'),

]
