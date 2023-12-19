### Django First Run
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
python manage.py runserver

### React First Run
cd frontend
npm install
npm run start


## API schema
#### To access schema first you have to create django superuser and login to schema with credentials that you provided
##### python manage.py createsuperuser - command to create super user
 - schema/ - download schema.
 - schema/swagger-ui - schema in swagger-ui style.
 - schema/redoc - schema in docs style.
