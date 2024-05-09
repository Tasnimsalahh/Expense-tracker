<embed src="https://omaremadd.github.io/static/spendee/SPENDEE.svg" style="filter: invert();" width=450/>

---

## Helpful commands:
To clone the repository, use [GitHub Desktop](https://desktop.github.com/) or run this command:
```cmd
git clone https://github.com/Tasnimsalahh/Expense-tracker.git
```
<strong style="color:#ff5555;">Important:</strong>  
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
