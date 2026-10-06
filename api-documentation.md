# API Documentation

## Project Description
This is the backend API for the My Recipe Book application. It facilitates all the recipe storage and user authentication for the frontend app.

## Setup Instructions

### Setup Virtual Environment
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

### Install Dependencies
1. Change current directory to myrecipebook
```bash
cd myrecipebook_backend/
```

2. Install the dependencies from the requirements.txt file
```bash
pip install -r requirements.txt
```

## Environment Variables
### Setup .env file
1. Copy the .env.example file to a new .env file
2. Put a new secret key into the DJANO_SECRET_KEY var
3. Check other default options to ensure they are correct

```py
DJANGO_SECRET_KEY= # Add a secret key here, keep it a secret in production
DJANGO_DEBUG=True # Change Debug to false in a production environment
DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1 # hosts allowed in the url of the api add 10.0.2.2 if using a local emulator
DJANGO_CORS_ALLOWED_ORIGINS=http://localhost:8081 # Cross-Origin allowed hosts
SIMPLE_JWT_ACCESS_TOKEN_LIFETIME_SECONDS=300 # how long an access token should last for in seconds (default is 5 minutes)
SIMPLE_JWT_REFRESH_TOKEN_LIFETIME_DAYS=1 # How long a refresh token is considered valid before it won't be able to refresh a token
```

## Developement Instructions

### Setup database
1. Run the database migrations
```bash 
python manage.py migrate
```

### Run development server
```bash
python manage.py runserver
```

## Testing Instucrtions

### Run project tests (optional)
```bash
python manage.py test
```
