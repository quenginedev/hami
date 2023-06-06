# Hami Library

Hami Logo

Hami is a powerful library that combines the best features of Prisma, Hasura, Firebase, and Supabase. The word "Hami" is derived from the Ga language, meaning "to give" and resembling a hammer in English. This library provides both backend and frontend functionalities, allowing developers to easily build robust applications.

## Features

### Backend

Hami's backend leverages MongoDB as the database, and any valid Mongoose schema can be used as a valid Hami schema. It is recommended to include timestamp options in your Mongoose schema for optimized functionality. The following features are provided by the Hami backend:

1. Auto-generated CRUD routes: Hami automatically generates routes for Create, Read, Update, and Delete (CRUD) operations. These routes include operations such as createOne, createMany, findById, findOne, findMany, updateOne, updateById, updateMany, deleteById, deleteOne, and deleteMany. This saves you time and effort in writing repetitive code for common database operations.

2. Auto-generated Swagger documentation: Hami automatically generates Swagger documentation for your API endpoints. This documentation provides a detailed description of the available routes, their input parameters, and expected responses. It helps developers understand and interact with your API more effectively.

3. Typescript type definitions endpoint: Hami creates an endpoint that generates TypeScript type definitions for your project. This feature ensures strong typing throughout your codebase and improves developer productivity. With the generated type definitions, you can benefit from enhanced IDE intellisense and catch potential type-related errors early in the development process.

### Frontend

Hami also offers a client library for the frontend, enabling seamless integration with the backend functionalities. The client library comes with excellent TypeScript intellisense support, providing developers with a delightful coding experience. Some key features of the Hami frontend library are:

1. Effortless backend consumption: The Hami client library simplifies backend consumption in your frontend code. It provides a clean and intuitive API that abstracts away the complexities of interacting with the backend. You can perform CRUD operations, retrieve data, and handle responses with ease.

2. Enhanced TypeScript intellisense: The Hami client library offers comprehensive TypeScript type definitions, ensuring accurate autocompletion and type checking within your frontend code. This feature empowers developers to write cleaner, more reliable code and catch potential errors before runtime.

Next Steps
The Hami project has exciting plans for future enhancements. Here are the next steps in the roadmap:

1. Authentication & Authorization: Hami will incorporate robust authentication and authorization features to secure your application. This will include user management, role-based access control, and integration with popular authentication providers.

2. Realtime: Hami aims to introduce real-time capabilities, allowing your application to respond instantly to changes in data. Realtime features include live updates, subscriptions, and event-driven functionality.

3. Lambda & Edge Functions: Hami plans to extend its capabilities by integrating serverless functions, enabling you to run custom code on the server-side. This feature will provide flexibility and extensibility to handle complex business logic.

Getting Started
To get started with Hami, please refer to the installation guide on the official Hami documentation website. The documentation provides detailed instructions on setting up both the backend and frontend components, along with code examples and tutorials to help you make the most of the library.

Contributing
Hami is an open-source project, and contributions from the community are highly appreciated. If you would like to contribute to the development of Hami,
