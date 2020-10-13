# Accounting Notebook

This repository is web application made with ReactJS and NodeJS. Both technologies use Typescript as the programming languaje.

# Backend
Backend is an express server with Typescript and at backend directory.

Typescript source code is in src folder.

- `index.ts` file is the main entry point. It will load the complete application.
- `models` directory define entities.
- `server` is the express creation module.
- `sevices` handle business logic.

The tests are in `test` directory. They can be checked runnning `npm run test` at backend directory.

### Concurrency solution
For the case of race conditions, where a transaction is written while some requests are trying to read a solution of readers and writers, with writing priority has been implemented. It is completely contained in `Balance` class (altough, considering that NodeJS executes JS in a single thread it is not really necessary until a database or file saving system is added)

# Frontend
TODO

# Installation, testing & running
TODO
