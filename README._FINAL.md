Some packages that need to be installed on your computer beforehand.
``Python 3.10``
``npm 7.17``
``node.js 14.17.3``

Install following packages in the code-client folder
1. ``npm i react-router-dom``
2. ``npm install @material-ui/core``
3. ``npm i @material-ui/icons``
4. ``npm i --save @devexpress/dx-react-core @devexpress/dx-react-chart``
5. ``npm i --save @devexpress/dx-react-chart-material-ui``
6. ``npm i @devexpress/dx-react-chart-material-ui``
7. ``npm i @devexpress/dx-react-chart``
8. ``npm install --save styled-components``
9. ``npm i @material-ui/lab``
10. ``npm install --save react-toastify``

You also need to install the following packages from the file “requirements.txt” in the code-server folder. 
``asgiref==3.4.1``
``Django==3.2.5``
``djangorestframework==3.12.4``
``pytz==2021.1``
``sqlparse==0.4.1``

### Code-Client
To start the client side, head to the code-client folder and run the command “npm install” to ensure the node modules are installed in the same repository. After that, run “npm start” in the same folder to start the local dev server. This server would be hosted at “localhost:3000” where you can start interacting with the website.

### Code-Server
As for the server built using Django and Django RESTful Framework, a REST API framework that allows for a JavaScript Client like React to interact with it, set up a virtual environment using Python’s “virtualenv” and to install the Python packages as shown in “requirements.txt. This will help you set up an environment on your computer that is capable of running the server locally. 

Once you finished installing the packages, change the directory to the “code-server/server/” directory and run the following commands:
    python manage.py runserver
    > Server initiated at 127.0.0.1:8000
 

For the Login credentials, this set if for the use of Admins and SuperUsers:
### Admin and SuperUsers
Admin: Admin
Password: admin110
 
email: Admin123@gmail.com

