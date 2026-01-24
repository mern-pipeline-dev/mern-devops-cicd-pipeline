# VOLTDRIVE Authentication System

## Overview

Complete JWT-based authentication system with secure password hashing using bcrypt. Supports user registration, login, logout, and session persistence.

---

## Architecture

### Frontend (React + TypeScript)

- **AuthContext** - Centralized state management for authentication
- **useAuth Hook** - Custom hook for accessing auth state and methods
- **Protected Routes** - Routes that require authentication
- **Local Storage** - Persists auth token and user data

### Backend (Express + Node.js)

- **Auth Controller** - Business logic for registration and login
- **Auth Routes** - API endpoints for authentication
- **Middleware** - JWT verification and authorization
- **Database** - MongoDB Atlas for user data storage

---

## Authentication Flow

### Registration Flow

```
User fills register form
         ↓
validateForm() checks:
  • Name not empty
  • Valid email format
  • Password ≥ 6 characters
  • Passwords match
         ↓
register() called → API call to POST /auth/register
         ↓
Backend receives {name, email, password}
         ↓
Check if email already exists
         ↓
Hash password with bcrypt (10 rounds)
         ↓
Create and save User document to MongoDB
         ↓
Generate JWT token (expires in 1 day)
         ↓
Return token + user object
         ↓
Frontend stores token and user in localStorage
         ↓
Redirect to home page
```

### Login Flow

```
User fills login form
         ↓
validateForm() checks:
  • Valid email format
  • Password provided
         ↓
login() called → API call to POST /auth/login
         ↓
Backend receives {email, password}
         ↓
Find user by email in MongoDB
         ↓
Compare provided password with hashed password using bcrypt
         ↓
If valid: Generate JWT token (expires in 1 day)
If invalid: Return 401 Unauthorized error
         ↓
Return token + user object
         ↓
Frontend stores token and user in localStorage
         ↓
Redirect to home page
```

### Auto-Login on Page Refresh

```
App loads → AuthContext.useEffect
         ↓
Check localStorage for authToken
         ↓
If token exists:
  • Set user state from localStorage
  • Set token in axios default headers
  • User stays logged in
         ↓
If no token:
  • User remains logged out
```

### Logout Flow

```
User clicks logout button
         ↓
logout() called
         ↓
Remove token from localStorage
Remove user from localStorage
         ↓
Clear user state in context
         ↓
Redirect to home page
```

---

## Key Components

### Frontend Files

**AuthContext.tsx** - State management

```typescript
- register(data: RegisterData) → API call + state update
- login(data: LoginData) → API call + state update
- logout() → Clear localStorage + state
- useAuth() hook → Access auth state and methods
- Auto-initialization on app load
```

**Register.tsx** - Registration page

```typescript
- Form with: name, email, password, confirmPassword
- Client-side validation
- Displays errors to user
- Calls auth.register() on submit
```

**Login.tsx** - Login page

```typescript
- Form with: email, password
- Client-side validation
- Displays errors to user
- Calls auth.login() on submit
```

**api.ts** - Axios API calls

```typescript
- authApi.register(data)
- authApi.login(data)
- Axios interceptor to attach JWT token to all requests
```

### Backend Files

**auth.controller.ts** - Authentication logic

```typescript
- registerUser() → Create new user
- loginUser() → Verify credentials and generate token
```

**auth.routes.ts** - API endpoints

```typescript
- POST /auth/register → Call registerUser
- POST /auth/login → Call loginUser
```

**User.ts** - Database schema

```typescript
- name: string (required)
- email: string (required, unique)
- password: string (hashed, required)
- role: 'user' | 'admin' (default: 'user')
- timestamps: createdAt, updatedAt
```

---

## Security Features

### Password Security

- ✅ Hashed with bcrypt (10 rounds)
- ✅ Never stored in plain text
- ✅ Compared securely during login

### Token Security

- ✅ JWT tokens expire in 1 day
- ✅ Stored in localStorage (can be upgraded to httpOnly cookies)
- ✅ Attached to all API requests via axios interceptor
- ✅ Verified on protected routes

### Data Validation

- ✅ Client-side form validation
- ✅ Server-side input validation
- ✅ Email uniqueness check
- ✅ Required field checks

### Database Security

- ✅ MongoDB Atlas with authentication
- ✅ IP whitelist configured
- ✅ Connection uses encrypted credentials

---

## API Endpoints

### POST /auth/register

**Request:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Success Response (201):**

```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

**Error Responses:**

```json
// 400 - Validation error
{
  "message": "Name, email, and password are required"
}

// 400 - Email already registered
{
  "message": "Email already registered"
}

// 400 - Registration failed
{
  "message": "Registration failed",
  "error": "MongoDB validation error"
}
```

### POST /auth/login

**Request:**

```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Success Response (200):**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

**Error Responses:**

```json
// 400 - Missing fields
{
  "message": "Email and password are required"
}

// 401 - Invalid credentials
{
  "message": "Invalid credentials"
}

// 500 - Server error
{
  "message": "Login error",
  "error": "Database connection failed"
}
```

---

## Environment Configuration

### Frontend (.env)

```
VITE_API_BASE_URL=http://localhost:5000
```

### Backend (.env)

```
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/database
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
PORT=5000
```

---

## Database Schema

### User Collection

```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (enum: ['user', 'admin']),
  createdAt: Date,
  updatedAt: Date
}
```

---

## Error Handling

### Client-Side

- Form validation errors displayed in red
- Server error messages captured and shown to user
- Loading state prevents duplicate submissions
- Auto-clear errors on form input

### Server-Side

- Request validation with detailed error messages
- Duplicate email detection (400)
- Invalid credentials detection (401)
- MongoDB errors logged with details
- Development mode includes error stack traces

---

## Session Persistence

- JWT token stored in localStorage
- User data (name, email, id, role) stored in localStorage
- Token automatically attached to API requests
- Session restored on page refresh
- No need to login again unless token expires

---

## Future Enhancements

- [ ] Email verification on signup
- [ ] Password reset functionality
- [ ] OAuth integration (Google, GitHub)
- [ ] httpOnly secure cookies instead of localStorage
- [ ] Refresh token implementation
- [ ] Two-factor authentication (2FA)
- [ ] Social login options
- [ ] User profile management
- [ ] Role-based access control (RBAC)
- [ ] Audit logging for auth events

---

## Testing the Authentication

### Register a New User

1. Navigate to `/register`
2. Fill in: name, email, password, confirm password
3. Click "Create Account"
4. Check server console for logs
5. Should redirect to home page if successful

### Login with Created Account

1. Navigate to `/login`
2. Enter email and password
3. Click "Sign In"
4. Should redirect to home page
5. Navbar should show user name and logout button

### Verify Session Persistence

1. Login successfully
2. Refresh the page (Ctrl+R)
3. User should remain logged in
4. Navbar should still show user name

### Logout

1. Click logout button in navbar
2. Should redirect to home page
3. Navbar should show Login and Register buttons
4. localStorage should be cleared

---

## Troubleshooting

### "Email already registered" error

- The email is already in the database
- Use a different email or delete the user from MongoDB

### "Invalid credentials" error

- Email or password is incorrect
- Check password case sensitivity

### Token not persisting after refresh

- Check if localStorage is enabled in browser
- Verify .env file has correct API URL
- Check browser console for errors

### MongoDB connection issues

- Verify MongoDB URI in .env
- Check IP whitelist in MongoDB Atlas
- Ensure database credentials are correct
- Verify network connectivity

---

## Security Best Practices

1. ✅ Never expose JWT_SECRET in frontend
2. ✅ Use HTTPS in production
3. ✅ Store tokens securely (consider httpOnly cookies)
4. ✅ Validate input on both client and server
5. ✅ Use strong JWT secrets (min 32 characters)
6. ✅ Implement token refresh mechanism
7. ✅ Log authentication events
8. ✅ Rate limit auth endpoints to prevent brute force
9. ✅ Hash passwords with sufficient rounds (10+)
10. ✅ Keep dependencies updated for security patches

---

## Tech Stack

| Component          | Technology                |
| ------------------ | ------------------------- |
| Frontend Framework | React 19                  |
| Frontend Language  | TypeScript                |
| Backend Framework  | Express.js                |
| Backend Language   | TypeScript                |
| Database           | MongoDB Atlas             |
| Password Hashing   | bcrypt                    |
| Token Generation   | JWT (jsonwebtoken)        |
| HTTP Client        | Axios                     |
| Styling            | Tailwind CSS + Custom CSS |
| Dev Server         | Vite                      |

---

## Support

For issues or questions about authentication:

1. Check server logs for detailed error messages
2. Verify MongoDB connection status via health endpoint
3. Check browser console for client-side errors
4. Review this documentation for troubleshooting steps
