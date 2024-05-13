<img src="https://omaremadd.github.io/static/spendee/SPENDEE_dark.png" width=500>

---
## Prerequisites:
1. MySQL (Download [xampp](https://www.apachefriends.org/))
2. Start Apache and MySQL servers in xampp
3. login to [localhost/phpmyadmin](http://localhost/phpmyadmin), create a database called "expense_tracker"
## Helpful commands:
To clone the repository, use [GitHub Desktop](https://desktop.github.com/) or run this command:
```cmd
git clone https://github.com/Tasnimsalahh/Expense-tracker.git
```
<strong style="color : #ff5555">📌Important</strong>  
Before installing the virtual environment and/or all the required Python libraries, open the windows **Command Prompt** (NOT ~~PowerShell~~), then run these commands from the repo root
```cmd
pip install virtualenv
pip install virtualenvwrapper-win
python -m virtualenv venv
```
To activate the virtual environment, run this batch file
```cmd
venv\Scripts\activate.bat
```
To install the required Python libraries for the virtual environment:
```cmd
pip install -r requirements.txt
```

### Installed an additional Python library?
Add it to `requirements.txt` before your next commit using this command (<span style="color:#ff5555;">only do this while the venv is activated</span>)
```cmd
pip freeze > requirements.txt
```

---
## Color Palette:
- Primary: ![](https://placehold.co/15x15/4a9c7b/4a9c7b/png) `#4a9c7b`  
- Secondary: ![](https://placehold.co/15x15/343a40/343a40/png) `#343a40`  
- Tertiary: ![](https://placehold.co/15x15/2b3035/2b3035/png) `#2b3035`  
- Background![](https://placehold.co/15x15/212529/212529/png) `#212529`