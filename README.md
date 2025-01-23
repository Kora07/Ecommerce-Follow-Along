# Ecommerce-Follow-Along

In this project I will be building an E-Commerce application from scratch using the MERN Stack.

After completing this project I will be able to : 
- Understand the overall structure of a MERN project.
- Learn the foundational steps of setting up a new project.
- Gain clarity on the functionalities of an e-commerce application.
- Prepare for upcoming milestones by setting up the project repository.

Concepts covered in this project are : 
- Overview of the MERN stack
- REST API Structure and Endpoints
- Basics of database schema design
- Role of authentication in web applications

---

### Login.jsx:

This React component renders a login form with fields for an email address and password.
The password input has a visibility toggle feature using a state variable passwordVisibility controlled by the toggleVisibility function.
An eye icon is used to toggle the password visibility, which is implemented by conditionally changing the input's type between "text" and "password".
The form also includes a "Remember Me" checkbox and a submit button.
There’s a link for "Forgot password?" and another for starting a free trial if the user isn’t registered.

### Index.css:

Custom CSS classes jack and doc are defined.
The jack class centers text to the left but is currently not actively used to style any elements beyond its definition.
The doc class slightly scales up a checkbox input element using transform: scale(1.1).

### Main.jsx:

The main entry point for the React app where it renders the App component inside a StrictMode wrapper for development.
It uses BrowserRouter from react-router-dom to handle routing within the app, ensuring the navigation and route management are set up for the application.

---

### File structure and MongoDB

Created a file structure in the Backend folder, and connected a MongoDB server to the project.

---

### .env 

Contains database link and port number.

### database.js 

Connects the index.js file to MongoDB.

### ErrorHandler.js

Handles errors that occur connected to the server.

