# Changes Made
Brief list of changes made for presentation video.

## Changes made apart from problems defined in [[diagnosis]]
- Added a .gitignore & Removed _pycache_ files, database file and .env from git
- Add and implement a .env file for SECRET_KEY, DEBUG & ALLOWED_HOSTS
- Rotate SECRET_KEY
- Add .env.example file

## Changes made to address Problem #1
- helpers.py file deleted

## Changes made to address Problem #2
- Remove Auth checks from views
- Change DEFAULT_PERMISSION_CLASSES in Settings.py from AllowAny to IsAuthenticatedOrReadOnly
- Replace login view function with DRF TokenObtainPairView
- Intended side effect: removed login attempt logging plain text passwords

## Changes made to address Problems #3 & #4
- Add serializers.py
- Implement DRF viewsets to use serializers (Broke ownership permission checks)
- Implement DRF ListAPIView for tool list
- Remove function based views
- Optimize imports
- Add custom update method to allow partial PUT requests

## Changes made to address Problem #5
- Add permissions.py with custom permission class
- implement custom permission class into Serializer

## Changes made to address Problem #6
- Ran `pip freeze > requirements.txt` to generate requirement.txt file
- Added Project Setup documentation at [[../toolshed_backend/project-setup.md]]