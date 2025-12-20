# Activity Points Management System

A full-stack web application built with the **MERN stack** (MongoDB, Express, React, Node.js) featuring secure **Google OAuth 2.0 authentication** and **JWT (JSON Web Tokens)** for session management.

---

## Technical Overview

The system utilizes a custom authentication flow where the backend handles OAuth handshakes via **Passport.js** and issues a **JWT**. The frontend captures this token, stores it in **LocalStorage**, and uses it for authenticated requests to protected API endpoints.

---

## Features Implemented

- **Google OAuth Integration**  
  Secure login using the Passport.js Google Strategy.

- **JWT Authentication**  
  Stateless authentication with tokens stored in LocalStorage.

- **Automated User Provisioning**  
  Automatic creation of user profiles in MongoDB upon initial Google login.

- **Global State Management**  
  Centralized user data handling via the React Context API.

- **Responsive Interface**  
  User interface constructed using React and Tailwind CSS.

---

## Setup Instructions

### 1. Prerequisites

- Node.js environment installed
- Access to Google Cloud Console for OAuth credentials
- MongoDB instance (Local installation or MongoDB Atlas)

Create a .env file in the root directory with the following variables:

```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
CALLBACK_URL=http://localhost:5000/api/auth/google/callback
CLIENT_URL=http://localhost:5173
SECRET_KEY=your_jwt_secret_key
```
---

### 2. Backend Configuration

Navigate to the backend directory:

```bash
cd backend
```

Install necessary dependencies:

```bash
npm install
```

Initialize the development server:
```bash
npm run dev
```

### 3. Frontend Configuration

Navigate to the frontend directory:

```bash
cd frontend
```

Install necessary dependencies:

```bash
npm install
```

Initialize the Vite development server:
```bash
npm run dev
```

## Google Cloud Console Requirements

To ensure the authentication flow operates correctly, configure the following under **Credentials** in the Google Cloud Console:

### Authorized JavaScript Origins
```
http://localhost:5173
```
### Authorized Redirect URIs
```
http://localhost:5000/api/auth/google/callback
```