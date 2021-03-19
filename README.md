<!-- Please update value in the {}  -->

<h1 align="center">Auth App</h1>

<div align="center">
   Solution for a challenge from  <a href="http://devchallenges.io" target="_blank">Devchallenges.io</a>.
</div>

<div align="center">
  <h3>
    <a href="https://authappdevchallenge.herokuapp.com/">
      Demo
    </a>
    <span> | </span>
    <a href="https://github.com/fogre/auth-app">
      Solution
    </a>
    <span> | </span>
    <a href="https://devchallenges.io/challenges/N1fvBjQfhlkctmwj1tnw">
      Challenge
    </a>
  </h3>
</div>

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [Overview](#overview)
  - [Built With](#built-with)
- [Features](#features)
- [How to use](#how-to-use)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

<!-- OVERVIEW -->

## Overview

User authentication API built with Express REST backend and React frontend.

API uses Mongo.db for user database and Cloudinary to host images.

The motivation was to remind myself of REST APIs and user authentication. As the challenge was mostly about user authentication, I didn't want to use any easy to use authentication middleware (like passport.js).

### Built With

- [React](https://reactjs.org/)
- [Express](https://expressjs.com/)

## Features

This application/site was created as a submission to a [DevChallenges](https://devchallenges.io/challenges) challenge. The [challenge](https://devchallenges.io/challenges/N1fvBjQfhlkctmwj1tnw) was to build an application to complete the given user storie.

## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

You need to create accounts to [MonboDB Altas](https://www.mongodb.com/) and [Cloudinary](https://cloudinary.com).

Create an .env file at the root directory with the API keys. Please look .env-public file for guide.

```bash
# Clone this repository
$ git clone https://github.com/fogre/auth-app

# Install dependencies
$ npm install
$ cd frontend && npm install

# Run the app
$ cd frontend && npm run build
$ npm run start

# Run the app in development
$ cd frontend && npm run dev
$ npm run dev
```

## Acknowledgements

- [MonboDB Altas](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [Cloudinary](https://cloudinary.com)
- [Stack Overflow ;)](https://stackoverflow.com/)

## Contact

- [Website](https://kotirantti.vercel.app/)
- [GitHub](https://{github.com/fogre})
