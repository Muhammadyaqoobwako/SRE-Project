# Test Plan & Test Cases: Hot Pizza / Debonairs Inn System Modernization

**Project**: Hot Pizza Management System / Debonairs Inn System Modernization  
**Stack**: React Native (Frontend) + Express.js (Backend) + MongoDB (Database)  
**Testing Framework**: Playwright (E2E & API Integration)  
**Jira Integration**: Automated Jira Bug reporter  

---

## 1. Introduction & Scope

This document defines the comprehensive **Test Plan** and **Test Cases** for the modernized **Hot Pizza Management System** (Debonairs Inn System). The modernization effort transitions the application from a legacy Visual Basic 6.0 (VB6) application with MS Access (`.mdb`) storage to a modern React Native Expo mobile frontend and Express.js REST API backend with MongoDB storage.

The testing scope covers:
- Cashier Authentication (migrating from hardcoded VB6 plaintext to secure JWT + Bcrypt).
- Order Placement and Customization across all six categories (Sprite, Coke, Burgers, Pizza, Ice Cream, Chips).
- Calculation accuracy (fixing the legacy billing bug where Chips quantity and price were added instead of multiplied).
- Database write integrity (fixing the legacy Pizza bug where orders were routed to the Burger table).
- Aggregated Reporting (replacing legacy MS DataReports with MongoDB API aggregations).
- Automated test failure bug reporting to JIRA.

---

## 2. User Stories & Acceptance Criteria

### US-1: Cashier Authentication (Security & Access Control)
* **As a** Cashier (e.g. `dorry`, `timmo`),
* **I want to** authenticate securely using a username and password,
* **So that** I can access the order placement terminal and log my sales.

#### Acceptance Criteria:
- **AC-1**: Cashier accounts are stored in MongoDB with Bcrypt-hashed passwords.
- **AC-2**: Plaintext credentials are not accepted or exposed in codebase configurations.
- **AC-3**: Successful login returns a valid JSON Web Token (JWT) used for subsequent API calls.
- **AC-4**: Entering incorrect credentials displays a clear validation warning: `"INVALID PASSWORD OR USERNAME, PLEASE TRY AGAIN!!!"`.

---

### US-2: Category-Specific Menu Selection & Customization
* **As a** Cashier,
* **I want to** select items from categorized menu listings (Sprite, Coke, Burger, Pizza, Ice Cream, Chips) and configure accompaniments,
* **So that** I can fulfill custom requests from customers.

#### Acceptance Criteria:
- **AC-1**: Beverages can be customized by type (e.g. cold/hot) and size volume.
- **AC-2**: Burgers can be customized by weight, type (beef/chicken), and accompaniments (e.g. chips, salad).
- **AC-3**: Pizzas can be customized by size, toppings, and quantity.
- **AC-4**: Ice Cream can be customized by colour, flavour, and toppings.

---

### US-3: Order Billing & Total Calculation (Legacy Calculation Fix)
* **As a** Cashier,
* **I want the** system to automatically calculate the total price of the order by multiplying the quantity by the unit price,
* **So that** customers are billed accurately.

#### Acceptance Criteria:
- **AC-1**: The order total is calculated on the backend via the formula: `Total = Sum(quantity * unitPrice)` for all items.
- **AC-2**: Resolves the legacy Chips billing bug (where `Total = Quantity + UnitPrice`). For example, 3 Chips packs at $4.50 must equal **$13.50**, not $7.50.
- **AC-3**: Cart totals are dynamically calculated and updated in the UI on item modifications.

---

### US-4: Database Integrity & Category Routing (Legacy Routing Fix)
* **As a** Cashier,
* **I want** orders to be saved under their correct category tables/collections in the database,
* **So that** inventory and records are not corrupted.

#### Acceptance Criteria:
- **AC-1**: Submitting a Pizza order writes the record to the Pizza category of the orders collection.
- **AC-2**: Resolves the legacy Pizza bug (where Pizza orders wrote to the Burger database table).
- **AC-3**: Orders are associated with the authenticated Cashier's username.

---

### US-5: Analytics & Sales Reports
* **As an** Store Manager,
* **I want to** view sales report summaries aggregating total revenue and revenue split by category,
* **So that** I can track store performance.

#### Acceptance Criteria:
- **AC-1**: Sales report endpoint aggregates all processed transactions in MongoDB.
- **AC-2**: Report displays: Total Revenue, Total Orders, and a category-wise revenue split.
- **AC-3**: Access to sales reports is secured via JWT token.

---

### US-6: Playwright Automated Bug Reporting
* **As a** QA Lead,
* **I want** Playwright test failures to automatically create a JIRA Bug ticket,
* **So that** the development team is immediately notified of regression bugs.

#### Acceptance Criteria:
- **AC-1**: Failed tests automatically capture a screenshot, stack trace, and logs.
- **AC-2**: A JIRA Bug is created with the title prefix `[AUTO][PLAYWRIGHT] Failed Scenario - <Scenario Name>`.
- **AC-3**: The description details: Scenario Name, Expected Result, Actual Result, Error Logs, Screenshot Path, Environment, and Reproduction Steps.
- **AC-4**: Duplicate creation is prevented by checking for open bugs with the same title before creating a new ticket.
- **AC-5**: The bug is linked to the original Jira story issue key (e.g. `KAN-3`).

---

## 3. Test Cases (TC) Specification

### 3.1. Cashier Authentication Tests
| Test Case ID | Test Title | Priority | Pre-conditions | Test Steps | Expected Result |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-SEC-01** | Successful Cashier Login | High | Seeded cashier `dorry` with password `dorry` exists in DB. | 1. Enter username `dorry`.<br>2. Enter password `dorry`. <br>3. Click Login. | Login succeeds, JWT token is stored, user is routed to Home Dashboard. |
| **TC-SEC-02** | Failed Login (Invalid Credentials) | High | Cache is cleared. | 1. Enter username `dorry`. <br>2. Enter password `wrongpwd`. <br>3. Click Login. | Dialog alerts: `"INVALID PASSWORD OR USERNAME, PLEASE TRY AGAIN!!!"`, JWT token remains null. |

### 3.2. Order Placement & Cart Calculations
| Test Case ID | Test Title | Priority | Pre-conditions | Test Steps | Expected Result |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-CALC-01** | Correct Chips Price Multiplication | High | Cashier is logged in. Chips unit price is $4.50. | 1. Select Chips category.<br>2. Set quantity to 3.<br>3. Click SUM/Add to Cart. | Cart total amount displays **$13.50** (resolving legacy math addition bug: 3 + 4.5 = 7.5). |
| **TC-CALC-02** | Cart Quantity Modifications | Medium | 1 item in cart. | 1. Navigate to Shopping Cart.<br>2. Increase item quantity from 1 to 3.<br>3. Decrease quantity back to 1. | Cart total price updates dynamically in real-time. |

### 3.3. Database Integrity & Category Routing
| Test Case ID | Test Title | Priority | Pre-conditions | Test Steps | Expected Result |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-DB-01** | Pizza Category Routing | High | Cashier is logged in. | 1. Select Pizza category.<br>2. Add 2 Pepperoni Large Pizzas to cart.<br>3. Click Checkout. | Order is saved in MongoDB. The document `category` is strictly logged as `"Pizza"` (not `"Burger"`). |
| **TC-DB-02** | Order History Retrieval | Medium | At least 1 order has been processed in MongoDB. | 1. Navigate to Order History Screen. | All previously placed orders are retrieved from MongoDB and listed under correct timestamps. |

### 3.4. Analytics & Sales Reports
| Test Case ID | Test Title | Priority | Pre-conditions | Test Steps | Expected Result |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-REP-01** | Cashier Sales Summary | Medium | Active cashier logged in. Orders have been processed. | 1. Navigate to Admin/Analytics Dashboard. | Displays total sales count, total revenue amount, and a graphical/text split of categories sales. |

### 3.5. Automated Playwright Jira Workflow
| Test Case ID | Test Title | Priority | Pre-conditions | Test Steps | Expected Result |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-AUTO-01** | JIRA Bug Logging on Test Failure | High | Playwright JIRA reporter configured. | 1. Run a test that triggers an assertion failure (e.g. `example.spec.js`). | 1. Playwright takes screenshot.<br>2. Reporter queries JIRA for duplicates.<br>3. If none, JIRA Bug is created with correct ADF fields and screenshot attachment. |
| **TC-AUTO-02** | Duplicate Prevention JQL Check | High | JIRA Bug exists for a failed test. | 1. Re-run the same failing test. | JQL search detects the existing Bug. Ticket creation is skipped. |

---

## 4. Playwright Automation Implementation

The automated test suite in `modern-app/playwright-tests/` executes these scenarios directly against the backend API endpoints to guarantee REST reliability. 

### Running Tests
To run the automated Playwright regression test suite:
```bash
# Navigate to tests directory
cd modern-app/playwright-tests
# Execute the test suite
npm run test
```
