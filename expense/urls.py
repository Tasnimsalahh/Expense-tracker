from django.urls import path
from django.contrib.auth import views as auth_views
from expense import views

urlpatterns = [
    path('signup/', views.signup, name='signup'),
    path('login/', auth_views.LoginView.as_view(template_name='login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('API/profile/', views.UserProfile.as_view(), name='api_profile'),
    path('API/balance/', views.UserBalance.as_view(), name='api_balance'),
    path('API/category/', views.CategoryList.as_view(), name='api_category'),
    path('API/account/', views.AccountView.as_view(), name='api_account'),
    path('API/expense/', views.ExpenseList.as_view(), name='api_expense'),
    path('API/expense/<int:pk>/', views.ExpenseDetail.as_view(), name='api_expense_detail'),
    path('API/category/<int:pk>/', views.CategoryDetail.as_view(), name='api_category_detail'),
    path('API/account/<int:pk>/', views.AccountDetail.as_view(), name='api_account_detail'),
]
