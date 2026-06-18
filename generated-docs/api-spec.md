# Modern Mobile REST & WebSocket API Specifications
**Project**: Hot Pizza Management System / Debonairs Inn System Modernization  
**Author**: Antigravity Modernization Agent  
**Date**: June 2026  

---

## 1. Protocol Architecture & Headers

The React Native mobile client communicates with the Node.js/Express backend using two communication protocols:
1. **HTTPS**: For standard transaction actions (authentication, menus management, batch sync).
2. **WebSockets (Socket.io)**: For real-time updates (syncing table statuses and notifying the kitchen of new orders).

### Global Headers
- `Content-Type: application/json`
- `Authorization: Bearer <access_token>`

---

## 2. Authentication API (Mobile Session Strategy)

To maintain a persistent cashier session on mobile devices without requiring frequent logins, the API implements an **Access & Refresh Token** strategy. Access tokens expire in 15 minutes, while refresh tokens expire in 7 days and are stored securely.

### 2.1. Cashier Authentication
- **Endpoint**: `POST /api/auth/login`
- **Description**: Verifies cashier credentials.
- **Request Body**:
  ```json
  {
    "username": "dorry",
    "password": "dorry"
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "cashier": {
      "username": "dorry",
      "role": "cashier"
    }
  }
  ```

### 2.2. Refresh Session Token
- **Endpoint**: `POST /api/auth/refresh`
- **Description**: Exchages a valid refresh token for a new 15-minute access token.
- **Request Body**:
  ```json
  {
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```

---

## 3. Order Management API

### 3.1. Place New Order
- **Endpoint**: `POST /api/orders`
- **Description**: Submits an order from the mobile client. Validations are enforced on the backend.
- **Request Body**:
  ```json
  {
    "category": "Chips",
    "items": [
      {
        "description": "Large Chips",
        "quantity": 3,
        "unitPrice": 150.00,
        "servedWith": "Tomato Sauce"
      }
    ],
    "cashier": "dorry"
  }
  ```
- **Backend Calculation Validation**:
  - Validates: `totalAmount = sum(quantity * unitPrice)`.
  - For 3 units at 150 each, the API enforces `totalAmount = 450.00`. (Resolves legacy addition bug).
- **Response (201 Created)**:
  ```json
  {
    "success": true,
    "message": "Order has been processed successfully",
    "orderId": "60d5ec49f72b2c123456789a",
    "totalAmount": 450.00
  }
  ```

---

## 4. Offline Synchronization API
*Supports mobile PWA/Resiliency. When connection is lost, React Native queues orders locally in SQLite. Upon connection resumption, it uploads the queue.*

### 4.1. Batch Upload Offline Orders
- **Endpoint**: `POST /api/sync/orders`
- **Description**: Uploads a list of locally cached orders accumulated during offline state.
- **Request Body**:
  ```json
  {
    "batchId": "uuid-1234-5678",
    "orders": [
      {
        "category": "Pizza",
        "pizzaDescription": "Regina",
        "unit": 1,
        "unitPrice": 550.00,
        "totalAmount": 550.00,
        "cashierName": "timmo",
        "offlineCreatedAt": "2026-06-18T01:10:00Z"
      },
      {
        "category": "Sprite",
        "drinkName": "Sprite Duo",
        "priceTag": 300.00,
        "quantity": "200ml",
        "type": "Cold",
        "cashierName": "timmo",
        "offlineCreatedAt": "2026-06-18T01:15:00Z"
      }
    ]
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "synchronizedCount": 2,
    "processedBatchId": "uuid-1234-5678"
  }
  ```

---

## 5. WebSockets Real-Time Communication

WebSockets are utilized to sync updates instantly between waiter tablets and the kitchen display.

### 5.1. Client to Server Events
- **Event: `order:create`**
  - **Payload**:
    ```json
    {
      "orderId": "60d5ec49f72b2c123456789a",
      "items": [{ "description": "Large Chips", "quantity": 3 }],
      "tableNumber": 4
    }
    ```
  - **Description**: Dispatched by the cashier/waiter app when a new order is saved.

### 5.2. Server to Client Broadcasts
- **Event: `order:kitchen_receive`**
  - **Payload**:
    ```json
    {
      "orderId": "60d5ec49f72b2c123456789a",
      "items": [{ "description": "Large Chips", "quantity": 3 }],
      "tableNumber": 4,
      "status": "Received"
    }
    ```
  - **Description**: Broadcasts orders dynamically to the kitchen display monitor.

---

## 6. TypeScript Shared Data Contracts

These interfaces ensure type conformity across both frontend and backend layers:

```typescript
// Shared Types for Order Entities
export interface IOrder {
  _id?: string;
  category: 'Sprite' | 'Coke' | 'Burger' | 'Pizza' | 'IceCream' | 'Chips';
  items: IOrderItem[];
  totalAmount: number;
  cashier: string;
  offlineCreatedAt?: string;
  createdAt?: string;
}

export interface IOrderItem {
  description: string;
  quantity: number;
  unitPrice: number;
  servedWith?: string;
  color?: string;
  flavour?: string;
  type?: string; // e.g. Cold, Diet
}
```
