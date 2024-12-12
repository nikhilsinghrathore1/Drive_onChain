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
- **Body**:
  ```json
  {
    "user": {
      "id": 1,
      "firstName": "John",
      "lastName": "Doe",
      "email": "johndoe@example.com",
      "createdAt": "2024-12-12T10:00:00Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }

---

