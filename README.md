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

#

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

#

### File structure and MongoDB

Created a file structure in the Backend folder, and connected a MongoDB server to the project.

#

### .env 

Contains database link and port number.

### database.js 

Connects the index.js file to MongoDB.

### ErrorHandler.js

Handles errors that occur connected to the server.

#

### Milestone 1
Setup project and created a Github Repository for version control.

#

### Milestone 2
- Created a structured folder hierarchy for the project.
- Set up a React app for the frontend and a Node.js server for the backend.
- Configured Tailwind CSS for streamlined styling.
- Built a functional and styled Login Page for the frontend.

#

### Milestone 3

- Set up dedicated folders for organizing backend code effectively.
- Initialized and configured a Node.js server to handle API requests.
- Connected application to MongoDB to store and manage data.
- Implemented basic error handling to ensure your server runs smoothly.

#

### Milestone 4

- Created a User Model.
- Created a User Controller.
- Enabled and configured Multer.

#

### Milestone 5

Created the sign up page for users to register by filling out their details. 
Created a validation system that ensures emails and passwords are properly validated before submission.

The Sign-Up page is where users can enter their details to create an account. 
This page allows users to provide their information, which will be sent to the server for processing.

Form Validation ensures that the information users provide is correct and in the right format.

#

### Milestone 6

Created a backend endpoint for the Signup page to store all user data securely, by encrypting the password and storing the user's data in the database.

# 

### Milestone 7

Created system for validating user credentials, and verifying the encrypted password stored in the database.

#

### Milestone 8

Designed and created a card component to display products effectively.

#

### Milestone 9:
Created a form for products that takes multiple product images as input.

#

### Milestone 10:
Built a POST endpoint to receive product data.
Validated and saved the product details to MongoDB.

#

### Milestone 11:
Created an endpoint that will send data from extract and send data from MongoDB, and a function to display all data dynamically passed to product card component.

#

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

#

### Milestone 13

Created an endpoint that updates the existing data in MongoDB.

#

### Milestone 14

Created an endpoint that deletes data from MongoDB.

#

### Milestone 15
Created a Navbar component that is used in all pages and contains links to the following:

- Home
- Products Page
- Product Form to add products
- Cart

#

### Milestone 16
- Created a new page to display each product
- Created quantity and add to card buttons

#

### Milestone 17
- Edited user schema to store cart products.
- Created an endpoint to receive product details and store them in the database. 

#

### Milestone 18
- Created an endpoint to receive requests from the cart page.
- Created a backend endpoint to fetch all the products inside the cart with user's email.

#

### Milestone 19
- Created a cart page that displays the products inside the cart using the get-cart endpoint.
- Added an option to increase and decrease quantity using + and - buttons for each product.
- Created an endpoint to increase and decrease the quantity.

#

### Milestone 20
- Create a frontend profile page that displays profile photo, name, email and addresses.

#

### Milestone 21
- Created a frontend form that takes address (country, city, address1, address2, zip code, address) as input.

#

### Milestone 22
- Created a backend endpoint that stores the address given through the form in the user profile in the database.

#

### Milestone 23
- Created a placeorder button inside the cart page which navigates to select address page when clicked.
- Created a select address page that displays all the available addresses and an option to select one address.
- Created a backend endpoint that will send the addresses of the user.

# 

### Milestone 24
Created an order confirmation page, which 
- Display all the products that were in cart
- Displays the address the user selects to deliver to
- Displays the total value of the cart
- Has a Confirm Order button

#

### Milestone 25
Created a backend endpoint that helps in placing an order.

#

### Milestone 26
Created a backend endpoint that helps in getting all the orders of the user.

#

### Milesotne 27
Created a basic frontend page which display user's orders.

#

### Milestone 28
Created a cancel order button. 
- Button disappears if order is cancelled
- Name of the product order has a line through to signify the cancellation, along with status being updated to, "Cancelled".
- Created an extra delete method for the order route to delete the orders used for testing purposes.

#

### Milestone 29
Created payment options in Order Confirmation page. Cash on Delivery & Paypal are available.

#

### Milestone 30
Implemented online payment through Paypal API.

#

### Milestone 31 and 32
Implemented Redux to store global states.

#

### Milestone 33
Created a JWT token and stored it in a cookie.

#

### Milestone 34
Extracted JWT token to send to the server

#

### Milestone 35 
Deployed Backend and Frontend

#### https://efafr.netlify.app
