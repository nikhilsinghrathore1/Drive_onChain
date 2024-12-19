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


<!-- three more routes in the map router , get-cordinates , get-distance-time , get-suggestion  -->

<!-- now creating the getdistanceandtime route -->

<!-- for the destinatino and time route i only need the address(pickup address) and destination  -->

<!-- have to create an api key in the env  -->

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


### Example Success Response

```json
{
    "blacklistedToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "createdAt" : "some time and date",
    "msg": "logged out"
}

```


# **createCaptain EndPoint**

## Description
The `createCaptain` function is an Express.js controller that handles the creation of a new captain in the system. It validates the request body, checks if the captain already exists, creates a new captain record in the database, and generates an authentication token for the captain.

---

## Parameters
- **`req`** (`Request`): The HTTP request object containing the data needed to create a captain.
- **`res`** (`Response`): The HTTP response object used to send responses back to the client.

---

## Request Body
The request body must include the following fields:

| Field         | Type     | Description                          |
|---------------|----------|--------------------------------------|
| `email`       | `string` | The captain's email address.        |
| `fullName`    | `string` | The captain's full name.            |
| `vehical_type`| `string` | The type of vehicle (`"auto"`, `"bike"`, `"car"`). |
| `plateNumber` | `number` | The vehicle's plate number.         |
| `color`       | `string` | The color of the vehicle.           |
| `password`    | `string` | The captain's password.             |
| `capacity`    | `number` | The seating capacity of the vehicle.|

---


1. **Validation**:
   - Validates the request body using `validationResult(req)`.
   - If validation fails, responds with a `400` status code and an array of validation errors.

2. **Check for Existing Captain**:
   - Checks if a captain with the provided email already exists in the database.
   - If a captain exists, responds with a `400` status code and an error message: `"captain already exists"`.

3. **Create Captain**:
   - Calls the `createCaptainService` to create a new captain record in the database.
   - If the creation fails, responds with a `400` status code and an error message: `"there was some issue while creating the captain"`.

4. **Generate Token**:
   - Generates an authentication token for the newly created captain using `createToken`.
   - If token generation fails, responds with a `400` status code and an error message: `"there was some issue while generating the captain auth token"`.

5. **Successful Response**:
   - Responds with a `200` status code and a JSON object containing:
     - The newly created captain's details (`captain`).
     - The generated authentication token (`token`).

---

## Response

### Success (200)
```json
{
  "captain": {
    "id": "<captain_id>",
    "fullName": "<full_name>",
    "email": "<email>",
    "vehical_type": "<vehical_type>",
    "plateNumber": <plate_number>,
    "color": "<color>",
    "capacity": <capacity>
  },
  "token": "<auth_token>"
}


```

# **loginCaptain EndPoint** 

## Description
The `loginCaptain` function is an Express.js controller that handles the login process for captains. It validates the request body, verifies the captain's credentials, and generates an authentication token upon successful login.

---

## Request Body
The request body must include the following fields:

| Field      | Type     | Description                       |
|------------|----------|-----------------------------------|
| `email`    | `string` | The captain's email address.     |
| `password` | `string` | The captain's password.          |


## Response

### Success (200)
```json
{
  "captain": {
    "id": "<captain_id>",
    "fullName": "<full_name>",
    "email": "<email>",
    "vehical_type": "<vehical_type>",
    "plateNumber": <plate_number>,
    "color": "<color>",
    "capacity": <capacity>
  },
  "token": "<auth_token>"
}


```

# **getCaptainProfile**

## Description
The `getCaptainProfile` function is an Express.js controller that retrieves the profile details of the currently authenticated captain. It assumes that the captain's data has been attached to the `req` object by a middleware (e.g., authentication middleware).

## Response

### Success (200)
```json
{
  "captain": {
    "id": "<captain_id>",
    "fullName": "<full_name>",
    "email": "<email>",
    "vehical_type": "<vehical_type>",
    "plateNumber": <plate_number>,
    "color": "<color>",
    "capacity": <capacity>
  }
}

```

# **logoutCaptain EndPoint**

## Description
The `logoutCaptain` function is an Express.js controller that handles the logout process for captains. It invalidates the authentication token by blacklisting it, clears the token from the cookies, and logs out the captain.

---

## Parameters
- **`req`** (`Request`): The HTTP request object, which includes the `Authorization` header containing the bearer token.
- **`res`** (`Response`): The HTTP response object used to send the logout response back to the client.

---


## Request Headers
| Header          | Type     | Description                       |
|------------------|----------|-----------------------------------|
| `Authorization` | `string` | Bearer token for authentication. |

---

## Response

### Success (200)
```json
{
  "msg": "logout"
}

```

## **ENDPOINT getCordinate**

## Description
The `getCordinate` function is an API endpoint that retrieves geographical coordinates (latitude and longitude) for a given address.

---

## Endpoint

**URL:** `/getCordinate`  
**Method:** `GET`  
**Content-Type:** `application/json`

---

## Request

### Query Parameters:
| Parameter | Type   | Required | Description                 |
|-----------|--------|----------|-----------------------------|
| `address` | string | Yes      | The address to fetch coordinates for. |
```

```




## ENDPOINT **getDistanceAndTime**

## Description
The `getDistanceAndTime` function is an API endpoint that calculates the distance and estimated travel time between two locations.

---

## Endpoint

**URL:** `/getDistanceAndTime`  
**Method:** `GET`  
**Content-Type:** `application/json`

---

## Request

### Query Parameters:
| Parameter      | Type   | Required | Description                             |
|----------------|--------|----------|-----------------------------------------|
| `address`      | string | Yes      | The starting address or location.       |
| `destination`  | string | Yes      | The destination address or location.    |

```
```