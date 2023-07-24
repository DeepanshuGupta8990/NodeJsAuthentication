# NodeJsAuthentication
# Node.js Authentication Project

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D%2012.0.0-brightgreen.svg)](https://nodejs.org/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

This is a Node.js authentication project that demonstrates user registration, login, and logout functionality using Express and MongoDB.

## Features

- User registration with email and password
- Password hashing for security
- User login with session-based authentication
- User logout
- MongoDB for storing user information

## Prerequisites

- Node.js (>= 12.0.0)
- npm (Node.js package manager)
- MongoDB (Make sure it's installed and running on your machine)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/nodejs-authentication.git
cd nodejs-authentication
Install dependencies:
bash
Copy code
npm install
Configure the environment variables:

Rename .env.example to .env.
Update the values in the .env file with your own configurations.
Start the development server:

bash
Copy code
run command - node index
The server will run at http://localhost:4500.

Usage
Open your web browser and go to http://localhost:4500.
You should see the homepage with options to register or log in.
Click on "Register" to create a new account with your email and password.
Once registered, you will be redirected to the login page.
Use your registered email and password to log in.
After logging in, you will be redirected to the dashboard.
Click on "Logout" in the top navigation bar to log out.
