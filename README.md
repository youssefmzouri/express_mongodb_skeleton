# Description

Base project (NodeJS + Express + Typescript & MongoDB)

## Table of Contents

- [Installation](#installation)
- [Initialize the app in dev mode](#initialize-the-app-in-dev-mode)
- [Build and init the app with docker](#build-and-init-the-app-with-docker)
- [API Documentation](#api-documentation)
- [Some notes](#some-notes)
- [License](#license)

## Installation

1. Clone the repository: `git clone https://github.com/youssefmzouri/express_mongodb_skeleton.git`
2. Install the dependencies: `npm install`
3. Create the .env file in the project root. (.env.dev will be needed if you want to run the project in dev mode)

## Initialize the app in dev mode
1. Turn on mongo container: `docker run -p 27017:27017 mongo`
2. Load data into mongo: `npm run loadInfoDev`
3. Start in dev mode: `npm run dev` (this needs the mongo container on)

## Build and init the app with docker

To run the project using Docker Compose, follow these steps:

1. Install Docker and Docker Compose on your machine.
3. Start the containers: `docker-compose up`
4. Call endpoint status `http://localhost:3000/api/ping` (should return "pong")

If you need to rebuild the images then execute `docker-compose up --build`

## API Documentation

Check the requests folder where you can find  the `*.http` files. Therefore you will see some examples of how to use the api.

If you want, you can search and use the "REST Client" extension from visual studio market place and interact with the api directly from the `*.http` files.

Marketplace -> https://marketplace.visualstudio.com/items?itemName=humao.rest-client

##  Some notes

- Recommended Node.js version: `v20.10.0`
- Command compiling code into javascript: `npm run tsc`
- Script `/scripts/start.sh` for docker custom setup.

## License

This project is licensed under the [MIT License](LICENSE).
