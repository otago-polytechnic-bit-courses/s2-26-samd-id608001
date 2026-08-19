# App documentation

## Backend 

### Environment Setup
1. Ensure you are in the fittrack_backend directory
2. Copy the env.example file to .env
3. Fill out the .env with a newly generated SECRET_KEY and change the other environment variables to suit the deployment enviroment
4. Create and activate a python virtual environment
5. Install the required packages using `pip install -r requirements.txt`

### Start Development server
To start the development server ensure you are in the fittrack_backend directory and the setup above is complete.
You will also need to activate the virtual environment you created in the above environment setup section.

Option A: Internal only
```bash
python manage.py runserver
```

Option B: Local Network Devices
```bash
python manage.py runserver 0.0.0.0:8000
```

### Test your connection to the backend api
Run the following curl command to test your connection to the backend api (ensure it is running):
```bash
curl -s -o /dev/null -w "%{http_code}\n" http://<your ip here>:8000/api/studios/
```
A 200 means Django is listening on that interface and accepting that hostname. If it hangs or refuses the connection, runserver is still bound to loopback only. If it returns 400, the address is missing from the ALLOWED_HOSTS env var in the backend.


## Frontend Expo App

### Environment Setup
1. Ensure you are in the fittrack-app-06 directory
2. Determine your machine's local ip address:
```
# macOS
ipconfig getifaddr en0

# Linux
hostname -I

# Windows
ipconfig
```
3. Create a file called .env
4. Add the ip address of your device you obtained in step 2 to the .env file using the EXPO_PUBLIC_API_URL variable adding http:// before and :8000/api after it.
Your .env file should resemble the following:
```env
EXPO_PUBLIC_API_URL=http://<your ip here>:8000/api
```

### Installing and Running the App
1. Ensure you are in the fittrack-app-06 directory
2. Run `npm install` and wait for all the dependencies to install
3. Run `npm run start` wait for it to complete
4. Open the Expo Go app on your device (if you do not have it installed, install it now)
5. Select 'Scane QR' from the Expo Go menu
6. Scan the QR code produced by the `npm run start` command
7. Use the App!
