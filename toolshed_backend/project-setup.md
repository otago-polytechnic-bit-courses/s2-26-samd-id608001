# Project Setup

## Setup Virtual Environment
1. Install a python virtual Environment

```bash
python -m venv .venv
```

2. Activate the Virtual Environment
```bash
# macOS & Linux or git Bash
source .venv/bin/activate

# Windows Powershell
.venv\Scripts\Activate.ps1
```

## Install Dependencies
1. Change current directory to toolshed_backend
```bash
cd toolshed_backend/
```

2. Install the dependencies from the requirements.txt file
```bash
pip install -r requirements.txt
```

## Setup .env file
1. Copy the .env.example file to a new .env file
2. Put a new secret key into the DJANO_SECRET_KEY var
3. Check other default options to ensure they are correct

## Setup database
1. Run the database migrations
```bash 
python manage.py migrate
```
2. Seed the database with test data
```bash
python manage.py seed
```

## Run project tests (optional)
```bash
python manage.py test sheds
```

## Run development server
```bash
python manage.py runserver
```