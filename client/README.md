# 🔐 React JWT Authentication App

A secure login system built with **React**, **Node.js**, **Express**, and **MongoDB**. It features token-based authentication (JWT), session handling, and input validation.

---

## 🚀 Features

- Email & password login with validation
- JWT authentication with 30-minute expiry
- Passwords hashed with bcrypt
- Welcome page with user email & logout button
- Auto logout on token expiration
- Responsive design with CSS styling
- MongoDB for user data storage

---

## 📦 Tech Stack

  Vite:
- Frontend: React, CSS
- Backend: Node.js, Express
- Database: MongoDB + Mongoose
- Auth: JWT, bcrypt

---


## 🛠 Installation

### 1. Clone the repo

```bash
git clone https://github.com/YanVashkevich1323/Simple-Authentication-System.git
cd Simple-Authentication-System


### 2. Backend setup

cd server
npm install
npm start


### 3. Frontend setup

cd ../client
npm install
npm run dev



📖 How It Works

- Users log in with their email and password, and the server validates the credentials.
- Upon successful login, the server issues a JWT that expires in 30 minutes.
- The JWT is stored in localStorage and used to authenticate requests to protected routes.
- The Welcome page displays the logged-in user's email and offers a Logout button.
- When the Logout button is clicked, the user is logged out (session ends) and redirected to the login form.


⚖️ Approach & Trade-offs

- JWT Authentication: Stateless and scalable, ideal for small to medium apps.
- Password Hashing: bcrypt is used to securely hash passwords before storing them in the database.
- Session Expiry: JWT expires after 30 minutes to balance user convenience and security.


🧪 Security Measures

- Input validation: Both on the frontend and backend to prevent invalid data.
- Password hashing: Using bcrypt for secure password storage.
- MongoDB: Mongoose is used to prevent common MongoDB injection attacks.


📱 Responsive Design

-The app is built ensuring good performance across all screen sizes, from small mobile devices to desktop screens.

