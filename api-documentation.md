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

## Example Responses

### List All
```json
[
    {
        "id": 17,
        "owner": 8,
        "title": "Fluffy Morning Pancakes",
        "description": "A quick and easy weekend breakfast favorite that turns out golden and fluffy every time.",
        "method": "Mix flour, sugar, and baking powder in a bowl. Whisk milk, egg, and melted butter in a separate bowl. Combine wet and dry ingredients until just mixed. Cook on a hot griddle until bubbles form, then flip.",
        "ingredients": [
            {
                "id": 32,
                "amount": 2.0,
                "measurement": "cup",
                "ingredient_name": "all-purpose flour"
            },
            {
                "id": 33,
                "amount": 1.0,
                "measurement": "cup",
                "ingredient_name": "milk"
            },
            {
                "id": 34,
                "amount": 1.0,
                "measurement": "whole",
                "ingredient_name": "egg"
            },
            {
                "id": 35,
                "amount": 2.0,
                "measurement": "tablespoon",
                "ingredient_name": "melted butter"
            }
        ]
    },
    {
        "id": 18,
        "owner": 8,
        "title": "Simple Garlic Butter Pasta",
        "description": "A minimalist, comforting Italian dish that comes together in under 15 minutes.",
        "method": "Boil pasta in salted water until al dente. Melt butter in a skillet, sauté minced garlic until fragrant, and toss with the drained pasta, parmesan, and black pepper.",
        "ingredients": [
            {
                "id": 36,
                "amount": 250.0,
                "measurement": "grams",
                "ingredient_name": "spaghetti"
            },
            {
                "id": 37,
                "amount": 3.0,
                "measurement": "tablespoon",
                "ingredient_name": "butter"
            },
            {
                "id": 38,
                "amount": 4.0,
                "measurement": "whole",
                "ingredient_name": "garlic cloves"
            },
            {
                "id": 39,
                "amount": 0.5,
                "measurement": "cup",
                "ingredient_name": "grated parmesan cheese"
            }
        ]
    },
    {
        "id": 19,
        "owner": 8,
        "title": "Crunchy Avocado Toast",
        "description": "A healthy and satisfying snack loaded with healthy fats and a bit of a spicy kick.",
        "method": "Toast the bread until golden and crisp. Mash the avocado with lemon juice, salt, and red pepper flakes. Spread evenly across the toast and top with a drizzle of olive oil.",
        "ingredients": [
            {
                "id": 40,
                "amount": 2.0,
                "measurement": "whole",
                "ingredient_name": "sourdough bread slices"
            },
            {
                "id": 41,
                "amount": 1.0,
                "measurement": "whole",
                "ingredient_name": "ripe avocado"
            },
            {
                "id": 42,
                "amount": 1.0,
                "measurement": "teaspoon",
                "ingredient_name": "lemon juice"
            },
            {
                "id": 43,
                "amount": 5.0,
                "measurement": "millilitre",
                "ingredient_name": "olive oil"
            }
        ]
    }
]

```

### Get One
```json
{
    "id": 19,
    "owner": 8,
    "title": "Crunchy Avocado Toast",
    "description": "A healthy and satisfying snack loaded with healthy fats and a bit of a spicy kick.",
    "method": "Toast the bread until golden and crisp. Mash the avocado with lemon juice, salt, and red pepper flakes. Spread evenly across the toast and top with a drizzle of olive oil.",
    "ingredients": [
        {
            "id": 40,
            "amount": 2.0,
            "measurement": "whole",
            "ingredient_name": "sourdough bread slices"
        },
        {
            "id": 41,
            "amount": 1.0,
            "measurement": "whole",
            "ingredient_name": "ripe avocado"
        },
        {
            "id": 42,
            "amount": 1.0,
            "measurement": "teaspoon",
            "ingredient_name": "lemon juice"
        },
        {
            "id": 43,
            "amount": 5.0,
            "measurement": "millilitre",
            "ingredient_name": "olive oil"
        }
    ]
}
```