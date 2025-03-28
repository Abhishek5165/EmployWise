# React User Management App

This project is a React + TypeScript application that integrates with the Reqres API to perform user authentication,
display a paginated list of users, and provide functionalities for editing and deleting users.

## Access the Live Preview Here - 

## Features

### Authentication

 * Login screen for user authentication.
 * Stores authentication token on successful login.
 * Redirects user to the Users List page after login.

### User List

* Fetches and displays paginated user data from the API.
* Displays user details in a structured format.
* Supports pagination or lazy loading.

### User Management

* Edit user details (first name, last name, email) via a pre-filled form.
* Delete users from the list.
* Displays success/error messages for operations.

### Additional Features

* Client-side search and filtering of users.
* React Router for navigation between pages.
* Responsive design using Tailwind CSS.
* Persistent login token storage.

## Technologies Used

* React
* React Router
* Axios (for API requests)
* Tailwind CSS (for styling)
* Vite (for fast development build)

## Installation and Setup

### 1. Clone the Repository

```
https://github.com/Abhishek5165/EmployWise.git 
cd EmployWise
```

### 2. Install Dependencies

```
npm install
```
### 3. Run the Application

```
npm run dev
```
### The application will run on http://localhost:3000

## API Endpoints Used

## Login

* Endpoint: POST https://reqres.in/api/login
* Sample Credentials:
```
{
  "email": "eve.holt@reqres.in",
  "password": "cityslicka"
}
```

## Fetch Users
* Endpoint: GET https://reqres.in/api/users?page=1

## Update User
* Endpoint: PUT https://reqres.in/api/users/{id}
  
##  Payload:
```
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john.doe@example.com"
}
```
## Project Structure 
```
├── src/
│   ├── components/
│   │   ├── LoginForm.tsx
│   │   ├── ProtectedRoute.tsx
│   │   ├── UserList.tsx
│   ├── context/
│   ├── types/
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   ├── vite-env.d.ts
├── public/
│   ├── Favicon.webp
├── .gitignore
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── eslint.config.js
├── README.md

```

## Delete User
* Endpoint: DELETE https://reqres.in/api/users/{id}

## Usage Guide

### 1. Login

* Enter the provided email and password.
* Click "Login" to authenticate and navigate to the Users List page.

### 2. User List

* View users with pagination.
* Click "Edit" to modify user details.
* Click "Delete" to remove a user.

### 3. Edit User

* Modify user details and save changes.
  
## Notes

* API responses are simulated (mock API), and changes won’t persist on refresh.
* Uses localStorage to persist login tokens.

## License

* This project is licensed under the MIT License.
