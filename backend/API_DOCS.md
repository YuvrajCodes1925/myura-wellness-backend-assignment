# Myura Wellness Backend API Documentation

Base URL: `http://localhost:5000/api`

## Health
- `GET /health`

## Products
- `GET /products`
  - Returns all products.

- `POST /products`
  - Body:
    ```json
    {
      "product_name": "Ashwagandha Capsules",
      "price": 499,
      "category": "Supplements",
      "stock": 25,
      "image_url": "https://example.com/product.jpg"
    }
    ```

- `PUT /products/:id/stock`
  - Body:
    ```json
    {
      "stock": 50
    }
    ```

## Orders
- `POST /orders`
  - Body:
    ```json
    {
      "customer_name": "Aman Gupta",
      "customer_email": "aman@example.com",
      "customer_address": "Indiranagar, Bangalore",
      "items": [
        { "product_id": 1, "quantity": 2 },
        { "product_id": 2, "quantity": 1 }
      ]
    }
    ```
  - Behavior:
    - Uses DB transaction.
    - Locks product rows during stock validation (`FOR UPDATE`).
    - Rejects with `409` when stock is insufficient.

## Admin (Bonus)
- `POST /admin/login`
  - Body:
    ```json
    {
      "username": "admin",
      "password": "admin123"
    }
    ```
  - Returns JWT token.
  - If `REQUIRE_ADMIN_AUTH=true`, send token in header:
    - `Authorization: Bearer <token>`

## Error Responses
- `400` validation error
- `401` unauthorized
- `404` not found
- `409` insufficient stock
- `500` server error