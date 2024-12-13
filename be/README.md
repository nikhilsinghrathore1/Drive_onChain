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


// created both routes for the login and register the req and res logic in written in the controller file and the database call are done in the service section and the password hashing password comparing and token generation is done in the utils folder and they are called in the route folder in the userRouter file 

// now have to create a logout controller for that one more model is created that is blacklikst model that will store the blacklisted token and thier createdAt time 