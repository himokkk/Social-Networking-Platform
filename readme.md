# Social Networking Platform
[ziomki.online](https://ziomki.online)

This is a social networking platform built with Django for the backend and React for the frontend. Web app allows users to create account, add new posts, react with likes and comments, make friends.

### Django First Run
```powershell
cd backend
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### React First Run
```powershell
cd frontend
npm install
npm run start
```

## API schema
#### To access schema first you have to create django superuser and login to schema with credentials that you provided
##### python manage.py createsuperuser - command to create super user
 - schema/ - download schema.
 - schema/swagger-ui - schema in swagger-ui style.
 - schema/redoc - schema in docs style.
