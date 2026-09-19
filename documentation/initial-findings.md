# Initial findings from a first look at the application

## general project overview
- missing onboarding docs - how do i run seeding and setup the app?
- no requirements.txt - what python packages does it need? Environment is not easily reproducible
- no .gitignore - _pycache_ files commited into git repo
- no .env.example file

## views.py
- one letter variable naming "s" "r" "d"
- Raw sql statements used
- When fetching all and filtering by city an extra lookup is performed per shed - a similar thing is done when not filtering by city
- JSON Responses defined by hand each time
- Manual permission checks for ownership
- tools_count variable is counted manually each time
- validation is performed manually each time
- shed owners are not returned in the shed detail response
- ~~login uses jwt and settings sets the DEFAULT_AUTHENTICATION_CLASSES to use JWT however all endpoints seem to be testing for session based auth~~ - still uses token correctly maybe i'm mis-interperuting the code
- same login check between multiple views
- passwords logged in plain text by the login endpoint

## helpers.py
It is unclear what this file is used for - perhaps serialization but it seems to do it poorly
- none of the functions and variables are actually used - dead code?

## settings.py
- SECRET_KEY is stored in settings file and commited to the repo (is also still set to the default value) - needs to be set in a .env file

## admin.py
- admin interface is not very helpful or descriptive - only name of shed or tool is listed in the overview table