[![Node.js](https://img.shields.io/badge/Node.js-14.16-brightgreen)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue)](https://www.postgresql.org/)
[![Express.js](https://img.shields.io/badge/Express.js-1.x-blue)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-latest-blueviolet)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-latest-blue)](https://www.typescriptlang.org/)

# Fullstack Authentication and Authorization App

This repository contains the initial state of a fullstack application exploring JSON Web Token authentication and authorization,
as well as dealing with users sensitive data stored in database.

## Client-side

The client-side is a simple React application featuring:
- Login and sign-up forms
- Custom pages displaying user information
- Handling of received JSON web token (JWT)

## Server-side

The server is implemented with Express.js and includes the following features:
- Pameterized SQL queries
- Entities to provide encapsulation, validation and immutability of sensitive data
- Service layers for improved decoupling and organization
- JSON web token (JWT) authorization as middleware
- Authentication system comparing input with encrypted database credentials
- Encryption and decryption of user passwords
- Appropriate exception handling

## Database

The database of choice is PostgreSQL, normalized with two associated tables:
- `user_account`: Stores user details
- `login_data`: Stores login-related information

You can find the database schema details in the `CREATE.sql` file.

## Server API Endpoints

- **GET /api/v1/users**: Returns all users with details
- **POST /api/v1/users**: Creates a new user
- **GET /api/v1/users/<user_id>**: If the request is authorized, returns details for a specific user
- **DELETE /api/v1/users/<user_id>**: Deletes the user with the given ID and returns JSON with its details
- **POST /api/v1/login**: Authenticates the provided username and password in the database
- **POST /api/v1/logout**: Returns JSON indicating auth: false and token: null

## Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo.git
```
### Navigate to the server directory
```bash
cd server
```
### Install server dependencies
```bash
npm install
```
### Navigate to the client directory
```bash
cd ../client
```
### Install client dependencies
```bash
npm install
```
### Set up Database
- Run a PostgreSQL database and create the necessary schema using `CREATE.sql`.

### Configure Server
- Set appropriate connection credentials to PostgreSQL in the server.
- Adjust salt rounds for bcrypt and the JWT secret in the server.

### Configure Client
- Set appropriate BASE_URL.

### Run the Application

- Navigate to the client directory
`cd client`

### Run the client
`npm run dev`

### Navigate to the server directory
`cd ../server`

### Run the server
`npx nodemon ./src/main.ts`

# TODOS

[ ] **Client Feature:** Add a "Delete User" button allowing users to delete their profiles.
  Consider user experience and confirmations.

[ ] **Feature:** Implement user roles.
  Define roles such as "User," "Admin," etc.

[ ] **Database Management:** Integrate user roles into the database.
  Establish role-related data structures.

[ ] **Admin Dashboard:** Develop an Admin dashboard listing all users and relevant information.
  Include user details and activity.

[ ] **Security Enhancement:** Implement rate limiting for authentication.
  Guard against potential brute-force attacks.

[ ] **User Registration:** Enable email confirmation for user registration.
  Improve user verification and account security.

[ ] **Password Management:** Implement password change through email.
  Enhance user account security.

[ ] **Configuration:** Fix environment variables handling.
  Ensure secure and efficient handling of configuration.

[ ] **Security Middleware:** Integrate Helmet for enhanced security.
  Add security headers to protect against common vulnerabilities.

[ ] **Server Optimization:** Appropriately handle CORS in the server.
  Fine-tune CORS settings for improved security and compatibility.


Feel free to contribute to any of these tasks or suggest new ideas!
