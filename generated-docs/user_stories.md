# User Stories and Completion Status

This document tracks the user stories, acceptance criteria, corresponding Jira ticket keys, and completion status for the modernized **Hot Pizza / Debonairs Inn System**.

---

## 1. User Stories & Acceptance Criteria

### [KAN-1] US-1: Cashier Authentication (Security & Access Control)
* **As a** Cashier (e.g. `dorry`, `timmo`),
* **I want to** authenticate securely using a username and password,
* **So that** I can access the order placement terminal and log my sales.

#### Acceptance Criteria:
- [x] **AC-1**: Cashier accounts are stored in MongoDB with Bcrypt-hashed passwords.
- [x] **AC-2**: Plaintext credentials are not accepted or exposed in codebase configurations.
- [x] **AC-3**: Successful login returns a valid JSON Web Token (JWT) used for subsequent API calls.
- [x] **AC-4**: Entering incorrect credentials displays a clear validation warning: `"INVALID PASSWORD OR USERNAME, PLEASE TRY AGAIN!!!"`.

**Status**: 🟢 **COMPLETED** (Verified by E2E tests `Verify Login Screen loads successfully`, `Verify Cashier Login flow with correct credentials`, and `Form validation error triggers alert`)

---

### [KAN-2] US-2: Category-Specific Menu Selection & Customization
* **As a** Cashier,
* **I want to** select items from categorized menu listings (Sprite, Coke, Burger, Pizza, Ice Cream, Chips) and configure accompaniments,
* **So that** I can fulfill custom requests from customers.

#### Acceptance Criteria:
- [x] **AC-1**: Beverages can be customized by type (e.g. cold/hot) and size volume.
- [x] **AC-2**: Burgers can be customized by weight, type (beef/chicken), and accompaniments (e.g. chips, salad).
- [x] **AC-3**: Pizzas can be customized by size, toppings, and quantity.
- [x] **AC-4**: Ice Cream can be customized by colour, flavour, and toppings.

**Status**: 🟢 **COMPLETED** (Verified by manual testing and endpoint verification)

---

### [KAN-3] US-3: Order Billing & Total Calculation (Legacy Calculation Fix)
* **As a** Cashier,
* **I want the** system to automatically calculate the total price of the order by multiplying the quantity by the unit price,
* **So that** customers are billed accurately.

#### Acceptance Criteria:
- [x] **AC-1**: The order total is calculated on the backend via the formula: `Total = Sum(quantity * unitPrice)` for all items.
- [x] **AC-2**: Resolves the legacy Chips billing bug (where `Total = Quantity + UnitPrice`). For example, 3 Chips packs at $4.50 must equal **$13.50**, not $7.50.
- [x] **AC-3**: Cart totals are dynamically calculated and updated in the UI on item modifications.

**Status**: 🟢 **COMPLETED** (Verified by test `TC-CALC-01: Correct Chips Price Multiplication`)

---

### [KAN-4] US-4: Database Integrity & Category Routing (Legacy Routing Fix)
* **As a** Cashier,
* **I want** orders to be saved under their correct category tables/collections in the database,
* **So that** inventory and records are not corrupted.

#### Acceptance Criteria:
- [x] **AC-1**: Submitting a Pizza order writes the record to the Pizza category of the orders collection.
- [x] **AC-2**: Resolves the legacy Pizza bug (where Pizza orders wrote to the Burger database table).
- [x] **AC-3**: Orders are associated with the authenticated Cashier's username.

**Status**: 🟢 **COMPLETED** (Verified by test `TC-DB-01: Category Routing`)

---

### [KAN-5] US-5: Analytics & Sales Reports
* **As a** Store Manager,
* **I want to** view sales report summaries aggregating total revenue and revenue split by category,
* **So that** I can track store performance.

#### Acceptance Criteria:
- [x] **AC-1**: Sales report endpoint aggregates all processed transactions in MongoDB.
- [x] **AC-2**: Report displays: Total Revenue, Total Orders, and a category-wise revenue split.
- [x] **AC-3**: Access to sales reports is secured via JWT token.

**Status**: 🟢 **COMPLETED** (Verified by E2E test `Verify Navigation to Admin Board` and integration test `TC-REP-01: Cashier Sales Summary Retrieval`)

---

### [KAN-6] US-6: Menu CRUD Management (Admin Control)
* **As an** Admin,
* **I want to** view, add, update, and delete menu items,
* **So that** the menu remains up to date.

#### Acceptance Criteria:
- [x] **AC-1**: View list of all menu items in a clean table representation.
- [x] **AC-2**: Create a new menu item specifying category, name, price, size, and options.
- [x] **AC-3**: Update an existing menu item's details.
- [x] **AC-4**: Delete an unwanted menu item after confirmation.

**Status**: 🟢 **COMPLETED** (Verified by E2E tests `Verify Navigation to Menu Manager and list loading`, `Verify Add New Menu Item flow`, `Verify Edit Menu Item flow`, and `Verify Delete Menu Item flow`)

---

### [KAN-7] US-7: Playwright Automated Bug Reporting
* **As a** QA Lead,
* **I want** Playwright test failures to automatically create a JIRA Bug ticket,
* **So that** the development team is immediately notified of regression bugs.

#### Acceptance Criteria:
- [x] **AC-1**: Failed tests automatically capture a screenshot, stack trace, and logs.
- [x] **AC-2**: A JIRA Bug is created with the title prefix `[AUTO][PLAYWRIGHT] Failed Scenario - <Scenario Name>`.
- [x] **AC-3**: The bug is linked to the original Jira story issue key (e.g. `KAN-3`).

**Status**: 🟢 **COMPLETED** (Verified by Playwright custom reporter logic `jira-reporter.js`)
