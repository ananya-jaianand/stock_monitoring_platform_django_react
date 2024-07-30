# Stock Monitoring Platform

This application consists of a frontend built with React, Material-UI, and TypeScript, a backend using Django, and a MySQL database.

- The platform displays a dashboard with the latest stock values of the symbols on the
user’s watchlist.
- The platform is be able to handle multiple users concurrently, each having different
watchlists.

### Demo  
[Link to youtube](https://youtu.be/QfUiCsIyuBI)


### DB setup :
```
    create database stock_monitoring_db;
	use stock_monitoring_db;
	source <path of db.sql>
	CREATE USER 'abc'@'localhost' IDENTIFIED BY 'password';
	GRANT ALL PRIVILEGES ON stock_monitoring_db. * TO 'abc'@'localhost';

```

### In stock_monitoring/stocks/services.py
```    
    ALPHA_VANTAGE_API_KEY = 'api key'
```
Ensure to add the API key from alpha vantage.

### Local deployment:

Running backend :
```
    python manage.py makemigrations
    python manage.py migrate
    python manage.py runserver 
```    

Running frontend:
```
    npm i
    npm start
```


