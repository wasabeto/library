# Library
A basic user directory to controls users and their books

## Commands

```bash
npm test # test using Jest
npm run coverage # test and open the coverage report in the browser
npm run lint # lint using ESLint
npm run dev # run the API in development mode
npm run prod # run the API in production mode
npm run docs # generate API docs
```

## Playing locally

First, you will need to install and run [MongoDB](https://www.mongodb.com/) in another terminal instance.

```bash
$ mongod
```

Then, run the server in development mode.

```bash
$ npm run dev
Express server listening on http://0.0.0.0:9000, in development mode
```

Create a user (sign up):
```bash
curl -X POST http://0.0.0.0:9000/users -i -d "email=test@perch.com&password=abc123&access_token=MASTER_KEY_HERE"
```
> `MASTER_KEY_HERE` is in the `.env` file

Authenticate the user (sign in):
```bash
curl -X POST http://0.0.0.0:9000/auth -i -u test@perch.com:abc123 -d "access_token=MASTER_KEY_HERE"
```

> `MASTER_KEY_HERE` is in the `.env` file

> Some endpoints are only accessible by admin users. To create an admin user, just pass the `role=admin` along to other data when calling `POST /users`.
