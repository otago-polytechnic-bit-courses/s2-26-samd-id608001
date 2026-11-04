# APP Documentation

## Project Description
This is the frontend react client for the My Recipe Book application. It facilitates all the user interaction and connects to the backend api to manage data.
The initial application concept can be found [here.](https://github.com/otago-polytechnic-bit-courses/s2-26-samd-id608001/wiki/Application-Concept)

## Setup Instructions

### Install Dependencies
1. Change current directory to myrecipebook
```bash
cd myrecipebook_app/
```

2. Install the dependencies from the requirements.txt file
```bash
npm install
```

## Environment Variables
### Setup .env file
1. Copy the .env.example file to a new .env file
2. Put a new secret key into the DJANO_SECRET_KEY var
3. Check other default options to ensure they are correct

```py
EXPO_PUBLIC_API_URL=http://10.0.2.2:8000/api # this is the url that the api is hosted at
```

## Developement Instructions

Run the following command to start the expo server then follow the on 
screen prompts for the type of test device you are using
```bash
npm run start
```

Alternatively if you are using an android emulator simply use this command:
```bash
npm run start --android
```

## Version Releases

### v0.0.1
[View this release here](https://github.com/otago-polytechnic-bit-courses/s2-26-samd-id608001/releases/tag/v0.0.1)
### v0.0.2
[View this release here](https://github.com/otago-polytechnic-bit-courses/s2-26-samd-id608001/releases/tag/v0.0.2)
### v0.0.3
[View this release here](https://github.com/otago-polytechnic-bit-courses/s2-26-samd-id608001/releases/tag/v0.0.3)
### v0.1.0
[View this release here](https://github.com/otago-polytechnic-bit-courses/s2-26-samd-id608001/releases/tag/v0.1.0)

