# 🔐 Secure Multi-Factor Authentication System

A secure authentication system implementing **multi-factor authentication (MFA)** with layered defenses against brute-force attacks, credential abuse, and session hijacking. The system follows **OWASP authentication best practices** and demonstrates real-world backend security concepts.

---

## 📌 Features

- Secure user registration with **bcrypt password hashing**
- Login protection using **rate limiting** and **account lockout**
- **Multi-Factor Authentication (MFA)** using time-bound, one-time passwords (OTP)
- OTP hashing and expiry to prevent replay attacks
- **JWT-based authentication** with short-lived access tokens
- **Refresh token mechanism** for secure session renewal
- Server-side refresh token storage and **secure logout**
- Protected routes using JWT middleware
- Authentication event logging support

---

## 🧱 Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)

### Security
- bcrypt (password & OTP hashing)
- JWT (Access & Refresh Tokens)
- express-rate-limit (brute-force protection)

### Utilities
- dotenv
- CORS

---

## 🔐 Authentication Flow

```
Signup
  ↓
Login (Password Verification)
  ↓
OTP Generation & Verification
  ↓
Access Token (15 minutes)
Refresh Token (7 days)
  ↓
Protected APIs
```

---

## 📂 Project Structure

```
backend/
│── controllers/
│   └── auth.controller.js
│── middleware/
│   ├── auth.middleware.js
│   └── rateLimiter.js
│── models/
│   └── User.js
│── routes/
│   └── auth.routes.js
│── utils/
│   ├── otp.js
│   └── token.js
│── server.js
│── .env
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js
- MongoDB
- npm

### 1️⃣ Clone the repository
```
git clone https://github.com/your-username/secure-mfa-auth.git
cd secure-mfa-auth/backend
```

### 2️⃣ Install dependencies
```
npm install
```

### 3️⃣ Configure environment variables

Create a `.env` file inside `backend/`:

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/secure_mfa
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
```

### 4️⃣ Run the server
```
node server.js
```

Server will start on:
```
http://localhost:5000
```

---

## 🧪 API Endpoints

### Authentication

| Method | Endpoint | Description |
|------|---------|------------|
| POST | `/api/auth/signup` | Register new user |
| POST | `/api/auth/login` | Login with password |
| POST | `/api/auth/verify-otp` | Verify OTP |
| POST | `/api/auth/refresh-token` | Get new access token |
| POST | `/api/auth/logout` | Logout & invalidate session |

### Protected Route

| Method | Endpoint | Description |
|------|---------|------------|
| GET | `/api/auth/protected` | JWT-protected route |

---

## 🔐 Security Considerations

- Passwords and OTPs are **never stored in plaintext**
- OTPs are hashed and expire after a short duration
- Rate limiting and account lockout mitigate brute-force attacks
- Refresh tokens are stored server-side and invalidated on logout
- Access tokens are short-lived to reduce session hijacking risk

---

## 📈 Future Improvements

- Send OTP via email/SMS
- Add role-based access control (RBAC)
- Add device/IP anomaly detection
- Frontend integration (React)
- Deployment with Docker

---

## 🎯 Learning Outcomes

- Practical implementation of MFA
- Secure session management using JWT
- Defense-in-depth authentication design
- Real-world application of OWASP authentication best practices

---

## 📜 License

This project is for educational and learning purposes.

---

## 🙌 Author

**Cahal Agarwalla**  
GitHub: https://github.com/CaHHaL
