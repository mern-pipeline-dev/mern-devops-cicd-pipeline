# MERN DevOps CI/CD Pipeline - Backend Completion Plan

**Project:** VoltDrive Car Rental System  
**Phase:** Backend Development & Integration  
**Status:** Phase 1-7 Complete, Phase 8-10 In Progress  
**Last Updated:** January 1, 2026

---

## 📊 Current Status Overview

### ✅ Completed (Phases 1-7)

#### DevOps Foundation

- [x] Entry point separation (app.ts + index.ts)
- [x] Environment variables configuration
- [x] Graceful database handling (no server crash on DB failure)
- [x] Health endpoint (`GET /health`)
- [x] Request logging middleware
- [x] Security middleware (Helmet + Rate limiting)
- [x] Global error handler
- [x] AsyncHandler utility for error catching

#### Backend Business Logic

- [x] Models: Car, User, Booking (database schemas)
- [x] Auth: Register & Login (with JWT, bcrypt)
- [x] Cars: Get all cars, Create car
- [x] Routes: `/api/cars` (GET, POST)

#### Frontend UI (No Backend Integration)

- [x] Navbar with responsive menu
- [x] Home page with hero section
- [x] Fleet page with hardcoded car data
- [x] Booking detail page with form
- [x] Contact & Footer
- [x] Animations (Framer Motion)
- [x] Styling (Tailwind CSS)

---

## ❌ What's Missing (Blocking Integration)

### Backend Issues

| Task               | Issue                          | Priority  |
| ------------------ | ------------------------------ | --------- |
| Auth Routes        | Not registered in app.ts       | 🔴 HIGH   |
| Booking Controller | Not implemented                | 🔴 HIGH   |
| Booking Routes     | Not created                    | 🔴 HIGH   |
| AsyncHandler       | Controllers not wrapped        | 🟡 MEDIUM |
| Validation         | No input validation            | 🟡 MEDIUM |
| Auth Middleware    | Early returns without response | 🟡 MEDIUM |

### Frontend Issues

| Task          | Issue                     | Priority |
| ------------- | ------------------------- | -------- |
| API Client    | No axios/fetch setup      | 🔴 HIGH  |
| Real Data     | Fleet uses hardcoded data | 🔴 HIGH  |
| Auth Context  | No token storage system   | 🔴 HIGH  |
| Auth Pages    | No Login/Register pages   | 🔴 HIGH  |
| Data Fetching | No API integration        | 🔴 HIGH  |

---

## 📋 8-Step Backend Completion Plan

### Step 1: Register Auth Routes in app.ts

**Time:** 5 minutes

**What to do:**

- Import `authRoutes` from `./routes/auth.routes`
- Add line: `app.use('/api/auth', authRoutes);`

**Why:** Auth endpoints are not accessible without this

**Test:**

```bash
curl http://localhost:5000/api/auth/login
# Should be accessible
```

---

### Step 2: Create Booking Controller

**Time:** 30 minutes  
**File:** `server/src/controllers/booking.controller.ts`

**Functions to implement:**

```typescript
createBooking(carId, fromDate, toDate)
  - Calculate duration
  - Calculate price (days × car.pricePerDay)
  - Create booking record
  - Return: Created booking

getUserBookings()
  - Get all bookings for logged-in user
  - Return: Array of user bookings

getAllBookings()
  - Get all bookings (admin)
  - Return: All bookings

getBookingById(id)
  - Get single booking with details
  - Return: Booking object

updateBookingStatus(id, status)
  - Change status (pending→confirmed→completed)
  - Return: Updated booking

cancelBooking(id)
  - Set status to 'cancelled'
  - Check authorization (user owns booking or admin)
  - Return: Cancelled booking
```

**Important:** Wrap ALL functions in `asyncHandler`

---

### Step 3: Create Booking Routes

**Time:** 10 minutes  
**File:** `server/src/routes/booking.routes.ts`

**Routes to implement:**

```
POST   /api/bookings              - Create booking (protected)
GET    /api/bookings/my-bookings  - Get user's bookings (protected)
GET    /api/bookings              - Get all bookings (admin)
GET    /api/bookings/:id          - Get specific booking (protected)
PUT    /api/bookings/:id/status   - Update status (protected)
PUT    /api/bookings/:id/cancel   - Cancel booking (protected)
```

**Note:** Add `protect` middleware to ALL routes

---

### Step 4: Register Booking Routes in app.ts

**Time:** 5 minutes

**What to do:**

- Import `bookingRoutes`
- Add line: `app.use('/api/bookings', bookingRoutes);`

---

### Step 5: Update Car Controllers with AsyncHandler

**Time:** 10 minutes  
**File:** `server/src/controllers/car.controller.ts`

**What to do:**

- Wrap `getAllCars()` in `asyncHandler`
- Wrap `createCar()` in `asyncHandler`

**Before:**

```typescript
export const getAllCars = async (req, res) => {
  try {
    // code
  } catch (error) {
    // handle
  }
};
```

**After:**

```typescript
export const getAllCars = asyncHandler(async (req, res) => {
  // code
  // errors automatically caught
});
```

---

### Step 6: Update Auth Controllers with AsyncHandler + Validation

**Time:** 15 minutes  
**File:** `server/src/controllers/auth.controller.ts`

**What to do:**

- Wrap `registerUser()` in `asyncHandler`
- Wrap `loginUser()` in `asyncHandler`

**Add validation:**

- Email format validation
- Password length (minimum 6 chars)
- Prevent duplicate email

**Example validation:**

```typescript
if (!email.includes("@")) {
  return res.status(400).json({ message: "Invalid email" });
}
if (password.length < 6) {
  return res.status(400).json({ message: "Password must be 6+ chars" });
}
```

---

### Step 7: Fix Auth Middleware

**Time:** 10 minutes  
**File:** `server/src/middleware/auth.middleware.ts`

**Current problems:**

- Missing `return` statements
- Inconsistent error responses

**Fix:**

```typescript
if (!token) {
  return res.status(401).json({ message: "No token provided" });
}

if (invalid_token) {
  return res.status(401).json({ message: "Invalid token" });
}

next(); // Continue if valid
```

---

### Step 8: Test All Endpoints

**Time:** 30 minutes

**Tools:** Postman or curl commands

#### A. Auth Tests

**1. Register User**

```
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@test.com",
  "password": "123456"
}

Expected: 201 Created
```

**2. Login User**

```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "john@test.com",
  "password": "123456"
}

Expected: 200 OK with token
{
  "token": "eyJhbGc...",
  "user": { "id": "...", "name": "John", "role": "user" }
}
```

⚠️ **Copy the token for next tests!**

#### B. Car Tests

**3. Get All Cars**

```
GET http://localhost:5000/api/cars

Expected: 200 OK with array of cars
```

**4. Create Car**

```
POST http://localhost:5000/api/cars
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "name": "Tesla Model 3",
  "brand": "Tesla",
  "type": "Sedan",
  "transmission": "Automatic",
  "fuelType": "Electric",
  "seats": 5,
  "pricePerDay": 5000,
  "features": ["Autopilot", "Leather Seats"],
  "availability": true,
  "rating": 4.8
}

Expected: 201 Created
```

#### C. Booking Tests

**5. Create Booking**

```
POST http://localhost:5000/api/bookings
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "carId": "CAR_ID_FROM_STEP_3",
  "fromDate": "2026-01-10",
  "toDate": "2026-01-15"
}

Expected: 201 Created with booking details
```

**6. Get My Bookings**

```
GET http://localhost:5000/api/bookings/my-bookings
Authorization: Bearer YOUR_TOKEN_HERE

Expected: 200 OK with array of user's bookings
```

**7. Cancel Booking**

```
PUT http://localhost:5000/api/bookings/BOOKING_ID/cancel
Authorization: Bearer YOUR_TOKEN_HERE

Expected: 200 OK with cancelled booking
```

#### D. Error Cases (Important!)

**8. No Token - Should Fail**

```
GET http://localhost:5000/api/bookings/my-bookings
(NO Authorization header)

Expected: 401 Unauthorized
```

**9. Invalid Token - Should Fail**

```
GET http://localhost:5000/api/bookings/my-bookings
Authorization: Bearer invalid_token_here

Expected: 401 Unauthorized
```

---

## 🎯 Testing Checklist

- [ ] Register endpoint works
- [ ] Login returns JWT token
- [ ] Protected routes reject requests without token
- [ ] Protected routes reject invalid tokens
- [ ] Can create booking with valid token
- [ ] Can get user's bookings
- [ ] Can cancel booking
- [ ] Error messages are clear and informative
- [ ] No crashes on invalid input

---

## 📱 Basic Frontend Structure (Parallel Work)

### Frontend Step 1: Create API Client

**File:** `client/src/api/axiosClient.ts`

```typescript
import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
});

// Add token to all requests
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;
```

### Frontend Step 2: Create Auth Context

**File:** `client/src/context/AuthContext.tsx`

Provides:

- `user` - Current logged-in user
- `token` - JWT token
- `login()` - Login function
- `register()` - Register function
- `logout()` - Logout function
- `isAuthenticated` - Boolean flag

### Frontend Step 3: Create API Services

**Files:**

- `client/src/api/authService.ts` - login(), register()
- `client/src/api/carService.ts` - getAllCars()
- `client/src/api/bookingService.ts` - createBooking(), getUserBookings()

### Frontend Step 4: Create Basic Pages

- `Login.tsx` - Simple form + login button
- `Register.tsx` - Simple form + register button
- Update `Fleet.tsx` - Fetch from backend instead of hardcoded
- Update `BookingDetail.tsx` - Submit to backend

### Frontend Step 5: Add Routing

- Use React Router
- Protect booking page (require login)

---

## 🚀 Implementation Timeline

### Week 1: Backend Only

- Day 1-2: Steps 1-4 (Routes setup)
- Day 2-3: Steps 5-7 (Controllers + validation)
- Day 3-4: Step 8 (Testing with Postman)

**Deliverable:** All backend endpoints working

### Week 2: Basic Frontend

- Day 1: API Client + Auth Context
- Day 2: API Services
- Day 3-4: Login/Register pages + Fleet integration
- Day 5: Testing full flow

**Deliverable:** Can register → Login → Browse cars → Book

### Week 3: DevOps

- Create Dockerfile (Phase 8)
- Create docker-compose.yml
- Test with Docker

---

## ✅ Success Criteria

### Backend

- [ ] All 7 endpoints return correct responses
- [ ] JWT token required for protected routes
- [ ] Validation prevents bad data
- [ ] Errors don't crash server
- [ ] Can test full flow: Register → Login → Book

### Frontend

- [ ] Can call all backend endpoints
- [ ] Login/Register working
- [ ] Cars load from backend
- [ ] Can create booking
- [ ] Token persists across page refresh

### Integration

- [ ] Backend + Frontend work together
- [ ] No CORS errors
- [ ] Full user flow: Register → Login → Browse → Book

---

## 📚 API Endpoints Reference

### Auth

```
POST   /api/auth/register    - Register new user
POST   /api/auth/login       - Login user, get token
```

### Cars

```
GET    /api/cars             - Get all cars
POST   /api/cars             - Create car (admin)
```

### Bookings (All require authentication)

```
POST   /api/bookings         - Create booking
GET    /api/bookings/my-bookings - Get user's bookings
GET    /api/bookings         - Get all bookings (admin)
GET    /api/bookings/:id     - Get booking details
PUT    /api/bookings/:id/status - Update status (admin)
PUT    /api/bookings/:id/cancel - Cancel booking
```

### Health

```
GET    /health               - Health check (no auth)
```

---

## 🔐 Authentication Flow

1. User registers: `POST /api/auth/register`
2. Backend hashes password + creates user
3. User logs in: `POST /api/auth/login`
4. Backend returns JWT token
5. Frontend stores token in localStorage
6. Frontend adds token to all requests: `Authorization: Bearer TOKEN`
7. Backend validates token on protected routes
8. If invalid/expired: Return 401 Unauthorized

---

## 🐛 Common Issues & Solutions

| Issue                                | Solution                                             |
| ------------------------------------ | ---------------------------------------------------- |
| 401 Unauthorized on protected routes | Check token is included in Authorization header      |
| CORS errors on frontend              | Ensure backend CORS is configured                    |
| Can't create booking                 | Check user is logged in (has valid token)            |
| Validation errors                    | Check email format, password length, required fields |
| Database errors                      | Ensure MongoDB is running and MONGODB_URI is correct |

---

## 📞 Questions/Blockers

- [ ] Need Postman collection for testing?
- [ ] Need sample .env file?
- [ ] Need example curl commands?
- [ ] Need help with specific step?

---

**Last Updated:** January 1, 2026  
**Next Review:** After Phase 8 completion
