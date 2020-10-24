# Accounting Notebook

This repository is web application made with ReactJS and NodeJS. Both technologies use Typescript as the programming language.

# Backend
Backend is an express server with Typescript and it is at `backend` directory.

Typescript source code is in src folder.

- `index.ts` file is the main entry point. It will load the complete application.
- `models` directory define entities.
- `server` is the express creation module.
- `sevices` handle business logic.

The tests are in `test` directory. They can be checked runnning `npm run test` at backend directory.

### Concurrency solution
For the case of race conditions, where a transaction is written while some requests are trying to read, coordination of readers and writers, with writing priority has been implemented. It is completely contained in `Account` class (altough, considering that NodeJS executes JS in a single thread it is not really necessary until a database or file saving system is added)

### Postman
A postman collection is at backend/tests if manual testing is desired.

# Frontend
Frontend is a ReactJS application written in Typescript. It is just a simple component that retrieves the transaction list from backend and displays it on the main page.
Components were written with Storybook, and Material Design basic components have been used.

# Installation, testing & running
For instalation NodeJS is needed. Every command is relative to the main directory of the project.

- To install backend dependencies run `npm install` at backend
- To check backend tests run `npm run test` at backend
- To install frontend dependencies run `npm install` at frontend

- To start backend run `npm run dev` at backend
- To start frontend run `npm run start` at frontend

- To start both systems with only one command, at root, run `npm run start` at root directory.
