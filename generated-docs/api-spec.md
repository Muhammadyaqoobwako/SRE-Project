# API Specifications

## Base URL
`http://localhost:5000/api`

## Endpoints

### 1. Customers

#### GET /customers
- **Description**: Returns all customers.
- **Response (200 OK)**:
  ```json
  [
    { "id": 1, "name": "Alice Smith", "phone": "123-456-7890", "email": "alice@gmail.com" }
  ]
  ```

#### POST /customers
- **Description**: Adds a new customer.
- **Body**:
  ```json
  { "name": "Bob Jones", "phone": "987-654-3210", "email": "bob@gmail.com" }
  ```

### 2. Inventory

#### GET /inventory
- **Description**: Returns all items.

#### GET /inventory/low-stock
- **Description**: Returns items with quantity < 10.
