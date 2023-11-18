# Backend API for Team Creator TEV App

Welcome to the backend repository for the Team Creator TEV App! This Node.js and Express application provides the necessary API endpoints for managing users and teams as a part of the TEV App.

## Getting Started

These instructions will help you set up and run the backend server locally.

### Prerequisites

Make sure you have the following software installed on your machine:

- Node.js: [Download Node.js](https://nodejs.org/)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/team-creator-tev-backend.git
    ```
2. **Install dependencies:**

   ```bash
   npm install
   ```
3. **Start the server:**

   ```bash
    npm run dev
    ```
4. **Open the app:**

   Open [http://localhost:3001/api](http://localhost:3001/api) to view it in the browser.

## API Endpoints

### User Endpoints

- `GET /api/users`: Retrieve all users with pagination support.
- `GET /api/users/:id`: Retrieve a specific user by ID.
- `POST /api/users`: Create a new user.
- `PUT /api/users/:id`: Update an existing user.
- `DELETE /api/users/:id`: Delete a user.

These endpoints support additional features such as filtering, searching, and pagination:

- **Filtering**: You can filter users based on the provided filter criteria (Domain, Gender, and Availability).
- **Searching**: You can search for users by their names.
- **Pagination**: You can retrieve a specific number of users per page.

### Team Endpoints

- `POST /api/team`: Create a new team by selecting users from the list with unique domains and availability.
- `GET /api/team/:id`: Retrieve the details of a specific team by ID.

## Built With
1. Express - Node.js web application framework for building APIs
2. MongoDB - NoSQL database for storing user and team data
3. Mongoose - MongoDB object modeling tool for Node.js
4. Vercel - Cloud platform for deploying the backend server

## Final Notes
I hope you enjoy using the TEV App! If you have any questions or feedback,