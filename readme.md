# Community Management API

This is a Node.js application for managing communities and members.

## Getting Started

1. Clone the repository:

Install dependencies:
```
npm install
```


## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file

```
PORT = "4000"

MONGO_URI = "mongodb+srv://<username>:<password>@cluster0.mongodb.net/theinternetfolks"

JWT_SECRET = "Helloworld"
```


Replace <Your MongoDB URI> with the actual connection string for your MongoDB database.

Run the development server:
```
npm run dev
```
The API will be available at http://localhost:4000.

## Available Scripts:

`npm run dev`: Run the development server using Nodemon.

`npm start`: Start the production server.