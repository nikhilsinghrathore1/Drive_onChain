## **User Registration API**

### **Endpoint**
`POST /register`

### **Description**
This API endpoint allows new users to register by providing their details, which are validated, hashed, and stored in the database. A JSON Web Token (JWT) is generated for the user upon successful registration.


#### **Body Parameters**
| Field       | Type   | Description                             | Required |
|-------------|--------|-----------------------------------------|----------|
| `firstName` | String | User's first name                       | Yes      |
| `lastName`  | String | User's last name (optional)             | No       |
| `email`     | String | User's email address                    | Yes      |
| `password`  | String | User's password (at least 6 characters, including a special character) | Yes      |


### **Response**

#### **Success Response**
- **Status Code**: `200 OK`
- **Example Request Body:**:
  ```json
  {
    "user": {
      "id": 1,
      "firstName": "John",
      "lastName": "Doe",
      "email": "johndoe@example.com",
      "createdAt": "2024-12-12T10:00:00Z",
      "password" : "@3#$%$%#$^#$! (hashed pasword) ",
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }

---



## **LoginUser API Endpoint**

## **Description**
This endpoint allows users to log in by providing their `email` and `password`. If the credentials are valid, a JWT token is generated and returned along with the user details. Otherwise, appropriate error messages are returned.

## **Method**
`POST`

## **Endpoint**
`/login`


#### **Body Parameters**
| Field       | Type   | Description                             | Required |
|-------------|--------|-----------------------------------------|----------|
| `firstName` | String | User's first name                       | Yes      |
| `lastName`  | String | User's last name (optional)             | No       |
| `email`     | String | User's email address                    | Yes      |
| `password`  | String | User's password (at least 6 characters, including a special character) | Yes      |




#### **Success Response**
- **Status Code**: `200 OK`
### **Example Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "password123"
}

```


## **get_user_Profile API Endpoint**


This API endpoint retrieves the authenticated user's profile information.

## Endpoint Details

- **URL**: `/user/profile`
- **Method**: `GET`
- **Authentication Required**: Yes (Bearer Token)

## Description

This endpoint returns the profile information of the currently authenticated user. The `req.user` object is populated by middleware, typically after verifying the user's identity.


### Headers

- **`Authorization`**: Bearer token for authenticating the user.

### Example Request

### **Example Request Body:**

```json
{
    "user": {
        "id": "12345",
        "name": "John Doe",
        "email": "john.doe@example.com"
    }
}


```
## **Logout User Endpoint**

This API endpoint logs out the authenticated user by clearing the authentication token and blacklisting it.

## Endpoint Details

- **URL**: `/logout`
- **Method**: `GET`
- **Authentication Required**: Yes (Bearer Token)

## Description

The endpoint clears the authentication token from the user's cookies and blacklists the token to prevent further use. If the token is not provided, it returns an error response.

## Middleware

- **`checkToken`**: Middleware to verify the validity of the token before processing the request.

## Request

### Headers

- **`Authorization`**: Bearer token for authenticating the user.

### Example Request

```http
GET /logout HTTP/1.1
Host: api.example.com
Authorization: Bearer <your_token_here>
