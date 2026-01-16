# Chat App

This is a full-stack chat application with a React frontend and a Node.js backend.

## Setup

### Prerequisites

- Node.js
- npm

### Backend

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the `backend` directory and add the following environment variables:
    ```
    PORT=<your_port>
    MONGO_URL=<your_mongodb_url>
    STREAM_KEY=<your_stream_key>
    STREAM_SECRET=<your_stream_secret>
    JWT_TOKEN=<your_jwt_token>
    ```
4.  Start the server:
    -   For development (with hot-reloading):
        ```bash
        npm run dev
        ```
    -   For production:
        ```bash
        npm start
        ```

### Frontend

1.  Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the `frontend` directory and add the following environment variable:
    ```
    VITE_API_BASE_URL=<your_backend_url>
    ```
4.  Start the development server:
    ```bash
    npm run dev
    ```
5.  To build for production:
    ```bash
    npm run build
    ```
    The production files will be in the `dist` directory.

## Deployment

### Backend

Deploy the `backend` directory to your hosting service of choice (e.g., Heroku, AWS, etc.). Make sure to set up the environment variables in your hosting provider's settings.

### Frontend

Deploy the contents of the `frontend/dist` directory to a static hosting service (e.g., Netlify, Vercel, etc.).
