from django.urls import path
from django.contrib.auth import views as auth_views
from expense import views

urlpatterns = [
    path('', views.home, name='home'),
    path('signup/', views.signup, name='signup'),
    path('login/', auth_views.LoginView.as_view(template_name='login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('analytics/', views.analytics, name='analytics'),
    path('api/profile/', views.UserProfile.as_view(), name='api_profile'),
    path('api/balance/', views.UserBalance.as_view(), name='api_balance'),
    path('api/category/', views.CategoryList.as_view(), name='api_category'),
    path('api/category/<int:pk>/', views.CategoryDetail.as_view(), name='api_category_detail'),
    path('api/account/', views.AccountList.as_view(), name='api_account'),
    path('api/account/<int:pk>/', views.AccountDetail.as_view(), name='api_account_detail'),
    path('api/shopping_list/', views.ShoppingList.as_view(), name='api_shopping_list'),
    path('api/expense/', views.ExpenseList.as_view(), name='api_expense'),
    path('api/expense/<int:pk>/', views.ExpenseDetail.as_view(), name='api_expense_detail'),
    path('api/shopping_list/', views.ShoppingList.as_view(), name='api_shopping_list'),
    path('api/shopping_list/<int:pk>/', views.ShoppingListDetail.as_view(), name='api_shopping_list_detail'),
    path('api/goal/', views.GoalList.as_view(), name='api_goal'),
    path('api/goal/<int:pk>/', views.GoalDetail.as_view(), name='api_goal_detail'),
]

handler404 = 'my_app.views.handler404'
handler500 = 'my_app.views.handler500'
