### Django First Run
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
python manage.py runserver

### React First Run
cd frontend
npm install
npm run start

## URL
### user/
 - register/ - Register. Takes username and password.
 - login/ - Login. Takes username and password. Returns token.
 - login/refresh/ - Takes token. 