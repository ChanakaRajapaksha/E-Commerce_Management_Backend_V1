# Marketplace API Documentation

## Overview
This is a RESTful API for an e-commerce marketplace built with Node.js, Express, and MongoDB using MVC architecture with advanced security features.

## Base URL
```
http://localhost:5000/api
```

## Authentication
The API uses JWT (JSON Web Tokens) for authentication with access and refresh tokens.

### Access Token
- **Expires**: 15 minutes
- **Usage**: Include in Authorization header: `Bearer <access_token>`

### Refresh Token
- **Expires**: 7 days
- **Usage**: Used to get new access tokens

## Security Features
- Rate limiting
- CORS protection
- Helmet security headers
- Input sanitization
- XSS protection
- Password hashing with bcrypt
- Account lockout after failed attempts
- JWT token rotation

## API Endpoints

### Authentication Routes (`/api/auth`)

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "confirmPassword": "SecurePass123!",
  "phone": "+1234567890",
  "role": "user"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "user_id",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "role": "user",
      "isActive": true,
      "createdAt": "2024-01-01T00:00:00.000Z"
    },
    "accessToken": "jwt_access_token",
    "refreshToken": "jwt_refresh_token"
  }
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "user_id",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "role": "user"
    },
    "accessToken": "jwt_access_token",
    "refreshToken": "jwt_refresh_token"
  }
}
```

#### Refresh Token
```http
POST /api/auth/refresh-token
Content-Type: application/json

{
  "refreshToken": "jwt_refresh_token"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Token refreshed successfully",
  "data": {
    "accessToken": "new_jwt_access_token"
  }
}
```

#### Logout
```http
POST /api/auth/logout
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "refreshToken": "jwt_refresh_token"
}
```

#### Logout All Devices
```http
POST /api/auth/logout-all
Authorization: Bearer <access_token>
```

#### Get Profile
```http
GET /api/auth/profile
Authorization: Bearer <access_token>
```

#### Update Profile
```http
PUT /api/auth/profile
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Smith",
  "phone": "+1234567890",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  }
}
```

#### Change Password
```http
PUT /api/auth/change-password
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "currentPassword": "OldPass123!",
  "newPassword": "NewPass123!",
  "confirmPassword": "NewPass123!"
}
```

#### Request Password Reset
```http
POST /api/auth/request-password-reset
Content-Type: application/json

{
  "email": "john@example.com"
}
```

#### Reset Password
```http
POST /api/auth/reset-password
Content-Type: application/json

{
  "token": "reset_token",
  "password": "NewPass123!",
  "confirmPassword": "NewPass123!"
}
```

### Admin Routes (Require Admin Role)

#### Get All Users
```http
GET /api/auth/users?page=1&limit=10&search=john&role=user
Authorization: Bearer <admin_access_token>
```

#### Get User by ID
```http
GET /api/auth/users/:id
Authorization: Bearer <admin_access_token>
```

#### Update User Status
```http
PUT /api/auth/users/:id/status
Authorization: Bearer <admin_access_token>
Content-Type: application/json

{
  "isActive": true,
  "role": "moderator"
}
```

#### Delete User
```http
DELETE /api/auth/users/:id
Authorization: Bearer <admin_access_token>
```

## Error Responses

### Validation Error (400)
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email address",
      "value": "invalid-email"
    }
  ]
}
```

### Authentication Error (401)
```json
{
  "success": false,
  "message": "Access token required"
}
```

### Authorization Error (403)
```json
{
  "success": false,
  "message": "Insufficient permissions"
}
```

### Not Found Error (404)
```json
{
  "success": false,
  "message": "User not found"
}
```

### Rate Limit Error (429)
```json
{
  "success": false,
  "message": "Too many requests, please try again later"
}
```

### Server Error (500)
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## Rate Limits

- **Authentication endpoints**: 5 requests per 15 minutes
- **General endpoints**: 100 requests per 15 minutes
- **Strict endpoints**: 20 requests per 15 minutes

## Password Requirements

- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character (@$!%*?&)

## User Roles

- **user**: Regular user (default)
- **moderator**: Can moderate content
- **admin**: Full administrative access

## Security Headers

The API includes the following security headers:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Strict-Transport-Security: max-age=31536000; includeSubDomains`

## CORS Configuration

Allowed origins:
- `http://localhost:3000`
- `http://localhost:3001`
- `http://localhost:3002`
- `http://localhost:3006`
- `https://sandbox.payhere.lk`
- Custom frontend URL from environment

## Health Check

```http
GET /health
```

**Response:**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 3600
}
```
