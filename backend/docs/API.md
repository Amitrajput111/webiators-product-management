# ProductHub API Documentation

## Base URL

http://localhost:5000/api

## Authentication

Protected endpoints require:

Authorization: Bearer <JWT_TOKEN>

---

## Auth APIs

### Register

POST /auth/register

### Login

POST /auth/login

### Current User

GET /auth/me

---

## Product APIs

### Get All Products

GET /products

Query parameters:

- page
- limit
- category
- search

### Get Single Product

GET /products/:id

### Create Product

POST /products

Authentication: Required

### Update Product

PUT /products/:id

Authentication: Required

Owner only.

### Delete Product

DELETE /products/:id

Authentication: Required

Owner only.

---

## Product Fields

| Field | Type | Required |
|---|---|---|
| name | String | Yes |
| description | String | Yes |
| price | Number | Yes |
| category | String | Yes |
| image | String | No |
| stock | Number | Yes |

---

## Response Format

Successful response:

{
  "success": true,
  "message": "Operation successful",
  "data": {}
}

Error response:

{
  "success": false,
  "message": "Error message"
}