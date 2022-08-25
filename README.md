# Trybe Football Club ⚽️ 


## Description

This project was developed during the software development course at trybe,
where we were asked to develop a back-end application capable of connecting to
the provided front-end application and providing the necessary data for its
correct functioning. All the code that was written by me, is inside the backend
folder.

The application was developed using `Node.js`,
the `Express.js` framework and `Typescript`, which consists of a `Javascript superset`,
always seeking to follow the principles of test-oriented development.
To carry out the integration tests, the frameworks `Jest`, `Mocha.js`,
`Sinon.js` and the `Chai` library were used.

Passwords and sensitive information were saved in the database after using the
`bcrypt` library, and the routes were validated through `JWT`.

This project was developed following the `SOLID` principles,
always aiming to build a clean and readable code.


## How to run the project


#### Install the dependencies using the following command

> `npm install`

#### Create an `.env` file that will have the following structure:

```
JWT_SECRET=jwt_secret
APP_PORT=3001
DB_USER=seu_user
DB_PASS=sua_senha
DB_HOST=localhost
DB_PORT=3306
```

#### Run docker compose using the the following command.
> `npm run compose:up`

#### If you want to restart the containers, use the the following command.

> `npm run compose:down`

#### If you need to reset the database, run the following command

> `npm run db:reset`

## Tests

To run the tests, we must access the terminal inside the backend folder and have the docker containers running.
After verifying these items, we run the command `npm test`, to verify the tests and `npm run test:coverage`, to verify the coverage of the tests.

## How to see the application working

First, we must access `http://localhost:3000`, with all containers running.

To login, we can use the following credentials:

- `login: admin@admin.com`
- `password: secret_admin`
