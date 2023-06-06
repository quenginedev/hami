# Hami 🔨

Hami is a powerful library that combines the best features of Prisma, Hasura, Firebase, and Supabase. The word "Hami" is derived from the Ga language, meaning "to give" and resembling a hammer in English. This library provides both backend and frontend functionalities, allowing developers to easily build robust applications.

## Features

### Backend

Hami's backend leverages MongoDB as the database, and any valid Mongoose schema can be used as a valid Hami schema. It is recommended to include timestamp options in your Mongoose schema for optimized functionality. The following features are provided by the Hami backend:

1. #### Auto-generated CRUD routes:

   Hami automatically generates routes for Create, Read, Update, and Delete (CRUD) operations. These routes include operations such as createOne, createMany, findById, findOne, findMany, updateOne, updateById, updateMany, deleteById, deleteOne, and deleteMany. This saves you time and effort in writing repetitive code for common database operations.

2. #### Auto-generated Swagger documentation:

   Hami automatically generates Swagger documentation for your API endpoints. This documentation provides a detailed description of the available routes, their input parameters, and expected responses. It helps developers understand and interact with your API more effectively.

3. #### Typescript type definitions endpoint:
   Hami creates an endpoint that generates TypeScript type definitions for your project. This feature ensures strong typing throughout your codebase and improves developer productivity. With the generated type definitions, you can benefit from enhanced IDE intellisense and catch potential type-related errors early in the development process.

### Frontend

Hami also offers a client library for the frontend, enabling seamless integration with the backend functionalities. The client library comes with excellent TypeScript intellisense support, providing developers with a delightful coding experience. Some key features of the Hami frontend library are:

1. #### Effortless backend consumption:

   The Hami client library simplifies backend consumption in your frontend code. It provides a clean and intuitive API that abstracts away the complexities of interacting with the backend. You can perform CRUD operations, retrieve data, and handle responses with ease.

2. #### Enhanced TypeScript intellisense:
   The Hami client library offers comprehensive TypeScript type definitions, ensuring accurate autocompletion and type checking within your frontend code. This feature empowers developers to write cleaner, more reliable code and catch potential errors before runtime.

Next Steps
The Hami project has exciting plans for future enhancements. Here are the next steps in the roadmap:

1. Authentication & Authorization: Hami will incorporate robust authentication and authorization features to secure your application. This will include user management, role-based access control, and integration with popular authentication providers.

2. Realtime: Hami aims to introduce real-time capabilities, allowing your application to respond instantly to changes in data. Realtime features include live updates, subscriptions, and event-driven functionality.

3. Lambda & Edge Functions: Hami plans to extend its capabilities by integrating serverless functions, enabling you to run custom code on the server-side. This feature will provide flexibility and extensibility to handle complex business logic.

# Getting Started Backend

## Pre-Requisites

- Node.js and npm installed on your machine
- MongoDB instance running (either locally or in the cloud)

## Installation

First, create a new directory for your project and navigate into it:

```bash
mkdir hami-app && cd hami-app
```

Then, initialize a new Node.js project and install the necessary dependencies:

```bash
npm init -y
npm install express mongoose cors @hami/adapter-express
```

## Setting Up Server

Create a new file in your project root directory called `server.js` and add the following:

```js
// server.js
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { createHami } from '@hami/adapter-express'
import mySchema from './schemas'

const URI = 'MONGODB_URI' as const

const startServer = async () => {
    await mongoose.connect(URI)
    const app = express()
    app.use(cors())
    const generateSchema = createHami(app)
    const hami = generateSchema(mySchemas)
    hami.listen(3000, () => {
        console.log('server is running on port 3000')
    })
}

startServer()
```

Please replace `MONGODB_URI` in the `URI` with the URI of your MongoDB database and `mySchemas` with your application's schemas which we will create below.

## Creating Schemas

In the project root directory, create a new file called `schemas.js`. This file will define your application's data structures. Here is an example schema for a `user`:

```js
// schemas.js
import { Schema, ID } from "@hami/adapter-express";

const userSchema = {
  name: "user",
  fields: Schema({
    name: String,
    username: String,
    email: String,
    address: {
      street: String,
      city: String,
      zipCode: String,
    },
    phone: String,
  }),
};

export const mySchemas: Schema[] = [userSchema];
```

Feel free to create more schemas following the example above and add them to the `mySchemas` array. Make sure to import `mySchemas` into your `server.js` file.

`Note`:

1. `Schema({..})` is the same as `new mongoose.Schema({..}, {timestamp: true})`.
2. `ID` is an `ObjectID`

## Starting the Server

Finally, run your server with the following command:

```bash
node server.js
```

If everything is set up correctly, you should see the message "server is running on port 3000" printed in your console.

Congratulations! You now have a working Hami server that automatically generates CRUD routes, Swagger documentation, and TypeScript type definitions based on your schemas. Navigate to `http://localhost:3000/docs` in your browser to interact with your API Documentation 😁.

Remember, the provided examples are basic and your actual schemas might need to be more complex depending on the needs of your application. Feel free to extend the schemas as required.

# Contributing

We warmly welcome you to Hami! Here, the developer experience is paramount, and we cherish every contribution that enhances it. Be it a new adapter, an improved client, or simply sprucing up the documentation - all efforts count.

Are you new? Don't worry! Open an issue or discussion on our GitHub repository. We're more than happy to guide you.

Let's make Hami the best it can be, together. Your contribution can fuel an amazing developer experience, and we can't wait to see what we'll create. Thank you!
