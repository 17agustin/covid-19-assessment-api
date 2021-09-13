# covid-19-assessment-api

this is the backend for a react app, here con you can get statistics about the progress of the coronavirus around the world

I've used an API given by rapid api:

https://rapidapi.com/api-sports/api/covid-193

To Run the api locally will need to follow the next steps:

# get a rapid api key

Through a login with Github, Facebook, or Google, they grant you an API key that you will use

# Clone

- Clone the repo to your device
- Run <code>npm install</code> or <code>yarn install</code> to install the dependencies.

# Configure .env

- you must creat a file named ".env"
- there you need to declare the next  enviroment variables.

- RAPIDAPI_HOST= "covid-193.p.rapidapi.com"
- RAPIDAPI_KEY= ******your rapid api key
- BASE_URL= "https://covid-193.p.rapidapi.com"
- SECRET_JWT = ****** you must create your own secret jwt
- MONGO_DB_URI = your local mongo database or mongo atlas database
- TEST_TOKEN = ****** if you want to run test you will need a valid jwt, you cant grant one once you signed up!

# run the backend

- now you can run the app
- to run use <code> npm start</code> or  ``` yarn start  ```
- this will start the api locally

# testing

if you want to run the test, you need to:

- configure the TEST_TOKEN in the .env file
- run comand <code>npm test</code>


# further information

if you have any trouble with the app, contact me via email and i'll help you

hope you like it 
Agustin😁
