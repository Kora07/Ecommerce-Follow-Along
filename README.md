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

---

### Milestone 5

Created the sign up page for users to register by filling out their details. 
Created a validation system that ensures emails and passwords are properly validated before submission.

The Sign-Up page is where users can enter their details to create an account. 
This page allows users to provide their information, which will be sent to the server for processing.

Form Validation ensures that the information users provide is correct and in the right format.

---

### Milestone 6

Created a backend endpoint for the Signup page to store all user data securely, by encrypting the password and storing the user's data in the database.

--- 

### Milestone 7

Created system for validating user credentials, and verifying the encrypted password stored in the database.

---

### Milestone 8

Designed and created a card component to display products effectively.

---

### Milestone 9:
Created a form for products that takes multiple product images as input.

---

### Milestone 10:
Built a POST endpoint to receive product data.
Validated and saved the product details to MongoDB.

---

### Milestone 11:
Created an endpoint that will send data from extract and send data from MongoDB, and a function to display all data dynamically passed to product card component.

---

### Milestone 12

##### Product Form and Image Upload

This application includes a form for submitting product details, including an image upload feature. The form allows users to add a product with the following fields:

1. Name: The name of the product.
2. Email: The email of the product owner (or related contact).
3. Price: The price of the product.
4. Description: A description of the product.
5. Category: The product's category.
6. Stock: The quantity of the product available.
7. Tag: A label or keyword to describe the product.
8. Image: One or more images to showcase the product.

---

### Milestone 13

Created an endpoint that updates the existing data in MongoDB.

---

### Milestone 14

Created an endpoint that deletes data from MongoDB.

---

### Milestone 15
Created a Navbar component that is used in all pages and contains links to the following:

- Home
- Products Page
- Product Form to add products
- Cart