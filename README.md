# 🔐 Secure Multi-Factor Authentication System

A full-stack **Secure Multi-Factor Authentication (MFA)** system implementing modern authentication best practices.  
The project demonstrates **defense-in-depth security**, combining password hashing, OTP-based MFA, JWT session management, and secure logout.

---

## 🧩 Project Structure

```
secure-mfa-auth/
├── backend/
│   └── (Node.js, Express, MongoDB API)
├── frontend/
│   └── (React, Vite, Tailwind UI)
```

---

## ✨ Key Features

- Secure user registration with bcrypt password hashing
- Brute-force protection with rate limiting and account lockout
- OTP-based Multi-Factor Authentication
- JWT access and refresh token mechanism
- Automatic token refresh and secure logout
- Protected frontend routes
- Clean, modern UI with Tailwind CSS

---

## 🧱 Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- JWT
- bcrypt

### Frontend
- React (Vite)
- Tailwind CSS
- Axios
- React Router

---

## 🔐 Authentication Flow

```
Signup
 ↓
Login (Password)
 ↓
OTP Verification
 ↓
Access Token (short-lived)
Refresh Token (long-lived)
 ↓
Protected Resources
```

---

## ⚙️ Setup Instructions

### Backend
```
cd backend
npm install
node server.js
```

Runs on:
```
http://localhost:5000
```

### Frontend
```
cd frontend
npm install
npm run dev
```

Runs on:
```
http://localhost:5173
```

---

## 🔒 Security Practices Implemented

- Password and OTP hashing
- Rate limiting and account lockout
- MFA enforcement before token issuance
- Token refresh rotation
- Secure logout with server-side invalidation
- OWASP-aligned authentication design

---

## 🎯 Learning Outcomes

- End-to-end MFA implementation
- Secure token-based authentication
- Frontend–backend integration
- Real-world security engineering practices

---

## 📜 License

This project is intended for educational and learning purposes.

---

## 🙌 Author

Cahal Agarwalla  
GitHub: https://github.com/CaHHaL
