# 🎨 Secure MFA Authentication – Frontend

This is the **frontend** for the Secure Multi-Factor Authentication (MFA) System.  
It provides a modern, responsive user interface for authentication flows, built with **React, Vite, and Tailwind CSS**.

---

## ✨ Features

- Clean and responsive authentication UI
- Login, Signup, OTP Verification, and Dashboard pages
- Multi-step authentication flow (Password → OTP → Access)
- Secure handling of JWT access and refresh tokens
- Axios API layer with automatic token refresh
- Protected routes and secure logout
- Reusable UI components with Tailwind CSS

---

## 🧱 Tech Stack

- React (Vite)
- Tailwind CSS
- React Router
- Axios

---

## 📂 Folder Structure

```
src/
├── components/
│   └── AuthCard.jsx
├── pages/
│   ├── Login.jsx
│   ├── Signup.jsx
│   ├── OTP.jsx
│   └── Dashboard.jsx
├── services/
│   └── api.js
├── App.jsx
├── main.jsx
└── index.css
```

---

## ⚙️ Setup & Run

### 1️⃣ Install dependencies
```
npm install
```

### 2️⃣ Start development server
```
npm run dev
```

Frontend runs on:
```
http://localhost:5173
```

---

## 🔐 Authentication Flow

```
Signup
 ↓
Login (Password)
 ↓
OTP Verification
 ↓
JWT Tokens Issued
 ↓
Protected Dashboard
```

---

## 🔒 Security Highlights

- Tokens are issued only after successful MFA
- Access tokens stored in session storage
- Refresh tokens stored securely in local storage
- Axios interceptors handle token rotation
- Logout invalidates tokens on both client and server

---

## 🎯 Purpose

This frontend demonstrates:
- Secure authentication UI design
- Real-world token handling patterns
- Clean separation of concerns in React apps

---

## 📜 License

For educational and learning purposes only.

---

## 🙌 Author

Cahal Agarwalla  
GitHub: https://github.com/CaHHaL
