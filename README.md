# Cloud Phone

Web app to make call from any phone number to anywhere using [Plivo](https://www.plivo.com/) platform.

## How to run the project

Create and update `backend/.env` file with the required before staring the backend. 

```
PLIVO_AUTH_ID=
PLIVO_AUTH_TOKEN=
CALL_BACK_BASE_URL=

DB_USER=
DB_PASS=
DB_PORT=
DB_DATABASE=
DB_HOST=
```

### To get the value for environment variable `CALL_BACK_BASE_URL`
```
cd backend
ngrok http 5000
```
### Create Table and Database
Use `backend/databse.sql` script to create the required database and table
### To run **Backend**
```
cd backend
npm start
```

### To run **Frontend**
```
cd frontend
npm start
```