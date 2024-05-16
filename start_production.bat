@echo off
echo Starting nginx
start "Closing nginx" /D "C:\nginx" nginx -s quit
start "nginx" /D "C:\nginx" nginx
echo.
echo Starting venv...
call venv\Scripts\activate
echo.
echo Starting waitress...
python -m waitress --listen=127.0.0.1:8000 spendee.wsgi:application
pause