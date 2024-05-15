@echo off
start "Nginx" /D "C:\Users\OmarEmadSayedEl-Ward\Downloads\nginx-1.25.5" call start_nginx.bat
echo Starting venv...
cd D:\Dev\Web\CSE334s\Expense-tracker
call venv\Scripts\activate
echo.
echo Starting waitress...
python -m waitress --listen=127.0.0.1:8000 spendee.wsgi:application
pause