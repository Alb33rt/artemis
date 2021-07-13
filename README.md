# artemis
Artemis is a website application that aims to being back the green life that us humans have always been adept to. We aim to support quality of life on land fully and pledge to support the environment during the process. 

The application is built using React and Django. It is built using Material UI from Google with modified colors and interactions.

## Installing Pckages

In order to run the dev server, you must have the following installed on your computer.

``Python 3.10``
``npm 7.17``

Packages included on both the client and server side will be included with the steps below.

### Client Side Local Host

The Client Side is build using React. The ``node_modules`` required for compiling the user interface are
``react-router-dom``
``@material-ui/core``
``@materiaul-ui/icons``

Once you clone the repository, head to the code-client folder of this repository and run ``npm start`` after the node modules are installed in the same repository. The local dev server will start running at ``localhost:3000`` in which you can start interacting with website.

### Server Side Local Host

The server is built using ``Django`` and ``Django RESTful`` Framework, which is a REST API framework which allows a JavaScript Client like ``React`` to interact with it. We highly recommmend setting up a virtual environment using Python's ``virtualenv`` and installing the Python packages as shown in ``requirements.txt``, this will help you set up a environment on your computer that is capable of running the server locally.

Once you install the packages, change directory to the ``code-server/server/`` directory and run

    python manage.py runserver
    > Server initiated at 127.0.0.1:8000
    
    python manage.py migrate
    > Run this command to migrate if changes to database are made.
    
    


