# Blog Website
This project is a **full-featured blog website** that allows users to perform **Create, Read, Update, and Delete (CRUD) operations** on blog posts using a **RESTful API** designed with Express.js and Node.js.

## Features
- **Create**: Add new blog posts.
- **Read**: View a list of all blog posts or a single post in detail.
- **Update**: Edit existing blog posts.
- **Delete**: Remove blog posts from the list.

## Technical Stack and Interactions
- **Frontend**: Uses EJS for template rendering, with real-time data updating facilitated by server responses.
- **Server.js (Client-Side Server)**: Acts as an intermediary, fetching data from the RESTful API provided by index.js and serving the frontend.
- **Index.js (API Service)**: Serves as the backend, managing an in-memory dataset to simulate database operations. Future iterations may upgrade this to a persistent database system.

## Built With
* [Node.js](https://nodejs.org/) - The JavaScript runtime used
* [Express](https://expressjs.com/) - The web framework for Node.js
* [EJS](https://ejs.co/) - Templating engine for rendering views

## Demo
![blog_api_demo](https://github.com/z-q-ying/full_stack_web_development/assets/116849653/269047e6-b5a3-4983-9c5d-38d2ac08aad6)

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
Ensure you have Node.js installed on your machine. You can download it from [Node.js official website](https://nodejs.org/).

### Installing
A step by step series of examples that tell you how to get a development environment running. Say what the step will be: `npm install` or `npm i`

### Running the Application
Start the backend service (index.js) which listens on port 4000:
```bash
node index.js
```
In a separate terminal window, launch the client-side server (server.js) that listens on port 3000 for incoming connections:
```bash
node server.js
```
Your application should now be running and accessible at `http://localhost:3000`.
