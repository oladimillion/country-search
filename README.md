## Country Search

An application that allows searching of country by name

### Install `redis` on your host system

[https://redis.io/download](https://redis.io/download)

### Update `.env` with variables from `.env_example`

### Using below command to install application dependencies

`npm install`

### Run development server for the frontend

`npm run start:client`

### Run development server for the backend

`npm run start:server:dev`

### Build the frontend app with below command

`npm run build:client`

### Build the backend app with below command

`npm run build:server`

### Prettify the codebase using below command

`npm run prettify`

### API endpoints

| Functionality    | HTTP Method | API endpoints                             |
| ---------------- | ----------- | ----------------------------------------- |
| Sigin in         | POST        | /api/v1/signin                            |
| Sigin up         | POST        | /api/v1/signup                            |
| Sigin out        | PUT         | /api/v1/signout                           |
| Auth user detail | GET         | /api/v1/user                              |
| Country Search   | GET         | /api/v1/country/search?country_name=:name |

### Live App

https://ola-country-search.netlify.app/
