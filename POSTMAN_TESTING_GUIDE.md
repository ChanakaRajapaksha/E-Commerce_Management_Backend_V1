# Postman Testing Guide for Registration Endpoint

## Setup Instructions

### 1. Create a New Request
1. Open Postman
2. Click **"New"** → **"HTTP Request"**
3. Name it: "Register User"

### 2. Configure the Request

#### Method and URL
- **Method**: Select **POST** from the dropdown
- **URL**: Enter your server URL + endpoint
  ```
  http://localhost:PORT/api/auth/register
  ```
  Replace `PORT` with your actual server port (commonly 5000, 3000, or 8000)
  
  Example: `http://localhost:5000/api/auth/register`

#### Headers
1. Click on the **"Headers"** tab
2. Add the following header:
   - **Key**: `Content-Type`
   - **Value**: `application/json`

#### Body
1. Click on the **"Body"** tab
2. Select **"raw"** radio button
3. Select **"JSON"** from the dropdown (on the right)
4. Paste the following JSON:

```json
{
  "firstName": "Chanaka",
  "lastName": "Rajapaksha",
  "email": "chnakaprasath456@gmail.com",
  "password": "ECOM@rcp123",
  "confirmPassword": "ECOM@rcp123",
  "phone": "+94712860193",
  "role": "admin"
}
```

### 3. Send the Request
- Click the **"Send"** button
- You should see the response below

## Expected Responses

### Success Response (201 Created)
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "_id": "...",
      "firstName": "Chanaka",
      "lastName": "Rajapaksha",
      "email": "chnakaprasath456@gmail.com",
      "role": "admin",
      ...
    },
    "accessToken": "...",
    "refreshToken": "..."
  }
}
```

### Validation Error (400 Bad Request)
```json
{
  "success: false,
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

### User Already Exists (400 Bad Request)
```json
{
  "success": false,
  "message": "User with this email already exists"
}
```

## Troubleshooting

### If you get CORS error:
- Make sure your server is running
- Check that `NODE_ENV` is not set to `production` in your `.env` file (for development)

### If you get "Cannot POST /api/auth/register":
- Check that your server is running
- Verify the port number in the URL
- Check that the route is properly registered in `index.js`

### If you get connection refused:
- Make sure your server is running
- Check the port number matches your server configuration
- Verify the server started successfully (check console logs)

## Quick Test Checklist

- [ ] Server is running
- [ ] Correct URL (http://localhost:PORT/api/auth/register)
- [ ] Method is POST
- [ ] Content-Type header is set to application/json
- [ ] Body is in JSON format
- [ ] All required fields are included
- [ ] Password meets requirements (8+ chars, uppercase, lowercase, number, special char)


