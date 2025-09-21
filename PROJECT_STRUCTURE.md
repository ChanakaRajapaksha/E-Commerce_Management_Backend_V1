# Marketplace Backend - MVC Architecture

## 📁 Project Structure

```
server/
├── config/                     # Configuration files
│   ├── database.js            # MongoDB connection
│   └── jwt.js                 # JWT configuration
├── controllers/               # Controllers (MVC)
│   └── authController.js      # Authentication controller
├── middleware/                # Custom middleware
│   ├── auth.js               # Authentication middleware
│   └── security.js           # Security middleware
├── models/                    # Database models
│   ├── user.js               # User model (updated)
│   └── ...                   # Other existing models
├── routes/                    # API routes
│   ├── auth.js               # Authentication routes
│   └── ...                   # Other existing routes
├── services/                  # Business logic layer
│   ├── authService.js        # Authentication service
│   └── emailService.js       # Email service
├── validators/                # Input validation
│   └── authValidation.js     # Authentication validation
├── utils/                     # Utility functions
├── helper/                    # Helper functions
├── views/                     # View templates (if needed)
├── index.js                   # Main application file
├── package.json              # Dependencies
├── .env                      # Environment variables
├── config.example.js         # Configuration template
├── API_DOCUMENTATION.md      # API documentation
├── SETUP.md                  # Setup instructions
└── PROJECT_STRUCTURE.md      # This file
```

## 🔐 Security Features Implemented

### 1. **JWT Authentication**
- Access tokens (15 minutes expiry)
- Refresh tokens (7 days expiry)
- Token rotation on refresh
- Secure token storage

### 2. **Password Security**
- bcrypt hashing with salt rounds of 12
- Password strength validation
- Account lockout after 5 failed attempts
- Password reset functionality

### 3. **Rate Limiting**
- Authentication endpoints: 5 requests/15 minutes
- General endpoints: 100 requests/15 minutes
- Strict endpoints: 20 requests/15 minutes

### 4. **Security Headers**
- Helmet.js for security headers
- CORS protection
- XSS protection
- Input sanitization
- HTTP Parameter Pollution protection

### 5. **Input Validation**
- Express-validator for request validation
- Comprehensive validation rules
- Sanitization of user inputs

## 🚀 API Endpoints

### Authentication (`/api/auth`)
- `POST /register` - User registration
- `POST /login` - User login
- `POST /refresh-token` - Refresh access token
- `POST /logout` - Logout user
- `POST /logout-all` - Logout from all devices
- `GET /profile` - Get user profile
- `PUT /profile` - Update user profile
- `PUT /change-password` - Change password
- `POST /request-password-reset` - Request password reset
- `POST /reset-password` - Reset password

### Admin Routes
- `GET /users` - Get all users (admin only)
- `GET /users/:id` - Get user by ID (admin only)
- `PUT /users/:id/status` - Update user status (admin only)
- `DELETE /users/:id` - Delete user (admin only)

## 🛠️ Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **express-validator** - Input validation
- **helmet** - Security headers
- **express-rate-limit** - Rate limiting
- **cors** - Cross-origin resource sharing
- **nodemailer** - Email service

## 🔧 Environment Variables

```env
# Database
CONNECTION_STRING=mongodb+srv://username:password@cluster0.earth.mongodb.net/marketplace?retryWrites=true&w=majority
PORT=5000

# JWT
JWT_SECRET=your_super_secure_jwt_secret_key
JWT_REFRESH_SECRET=your_super_secure_refresh_secret_key
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Frontend
FRONTEND_URL=http://localhost:3000

# Email
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Payment
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
STRIPE_SECRET_KEY=your_stripe_secret
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create .env file:**
   ```bash
   cp config.example.js .env
   # Edit .env with your actual values
   ```

3. **Start the server:**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

4. **Test the API:**
   ```bash
   # Health check
   curl http://localhost:5000/health
   
   # Register user
   curl -X POST http://localhost:5000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"firstName":"John","lastName":"Doe","email":"john@example.com","password":"SecurePass123!","confirmPassword":"SecurePass123!"}'
   ```

## 📊 Features

### ✅ Completed
- MVC architecture implementation
- JWT authentication with access/refresh tokens
- Advanced security middleware
- User registration and login
- Password hashing and validation
- Rate limiting and CORS protection
- Input validation and sanitization
- Email service integration
- Comprehensive error handling
- API documentation

### 🔄 Ready for Extension
- User profile management
- Admin panel functionality
- Role-based access control
- Password reset functionality
- Email verification
- Account lockout system
- Audit logging
- API versioning

## 🛡️ Security Best Practices

1. **Password Requirements:**
   - Minimum 8 characters
   - Uppercase, lowercase, number, special character

2. **Token Security:**
   - Short-lived access tokens
   - Secure refresh token storage
   - Token rotation on refresh

3. **Rate Limiting:**
   - Different limits for different endpoints
   - IP-based limiting
   - Graceful error responses

4. **Input Validation:**
   - Server-side validation
   - Input sanitization
   - SQL injection prevention

5. **Security Headers:**
   - Content Security Policy
   - X-Frame-Options
   - X-XSS-Protection
   - Strict-Transport-Security

This implementation provides a solid foundation for a secure, scalable e-commerce backend with modern authentication and security features.
