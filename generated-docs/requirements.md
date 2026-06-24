# Requirements Specification: Modernized Enterprise Management System

## 1. System Overview
The modernized system replaces the legacy Visual Basic 6 desktop application with a web-based client-server application. It includes a frontend dashboard and backend services to manage Customer portfolios and Inventory levels.

## 2. Core Functional Requirements
- **Customer Management**
  - Record Customer Name, Phone, and Email address.
  - Form validation on client-side (required names, formatted email, and digits-only phone numbers).
  - Persistence to database with error catching.
- **Inventory Tracking**
  - Record Item Name, Quantity, and Unit Price.
  - Automatic check for items with low stock levels (< 10 units).
  - Highlight low stock items in a dedicated notification dashboard component.

## 3. Tech Stack Mapping
- UI: React / Vite SPA, modern dark mode layout.
- API: Node.js / Express, RESTful endpoints.
- Database: SQLite for simple, lightweight local storage.
