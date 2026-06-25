# Food Management System (VB6)

This project is a simple, lightweight **Food Management System** developed in Visual Basic 6.0, using Microsoft Access (`bat.mdb`) as the backend database.

## System Overview

The system allows restaurant staff/cashiers to:
1. **Login & Authenticate**: Cashiers can log into the system using their accounts stored in the database.
2. **Orders Dashboard**: A dashboard showing all placed orders using a DataGrid.
3. **Order Entry & Billing**: Register customer orders, select table numbers, specify food items, quantity, order status, order type (dine-in, takeaway, delivery), total price, special instructions, and add-ons/extras (Drinks, Dessert, Spicy Level, Extra Cheese).
4. **Order Control**: Complete navigation (First, Previous, Next, Last), addition, deletion, and billing settling actions.

## Key Changes & Modernizations Made

### 1. Hotel-to-Food Management Terminology Re-branding
The system has been transformed from a hotel reservation application into a food order and billing application. The database structure has been preserved for 100% database compatibility, but the UI has been adapted:
*   **Name** -> `Customer Name`
*   **other_names** -> `Table Number`
*   **email** -> `Customer Email`
*   **contact** -> `Phone Number`
*   **occupation** -> `Food Item` (stores the item ordered)
*   **age** -> `Quantity` (stores order quantity)
*   **days** -> `Order Type` (Dine-in, Takeaway, Delivery)
*   **capacity** -> `Order Status` (Pending, Preparing, Served, Paid, Cancelled)
*   **amount** -> `Total Price`
*   **adress** -> `Special Instructions`
*   **laundary** -> `Extra Drinks`
*   **kitchen** -> `Dessert Add-on`
*   **transport** -> `Spicy Level`
*   **internet** -> `Extra Cheese`

### 2. Component Restoration
A corrupted component issue in the original codebase caused the login ADODC component (`login`) to be saved as a standard `VB.PictureBox`. This has been completely restored to `MSAdodcLib.Adodc` inside `login.frm` and registered correctly inside the project file (`Project1.vbp`).

### 3. Portable Database Pathing (No Hardcoding)
Previously, the database connection string was hardcoded to an absolute folder path on the original author's desktop (`C:\Users\ONIBUKUN\Desktop...`). We replaced this with dynamic pathing using `App.Path` in the form loading scripts. The system now searches for `bat.mdb` in its active directory, making the project portable and runnable anywhere without connection failures.

### 4. Dynamic Control Initialization
The order type, quantity selection, and order status ComboBox controls are now dynamically populated on form loading inside the Visual Basic runtime code, bypassing compiled `.frx` binary file dependency and ensuring clean data options.

---

## How to Run the Project

1. Install **Visual Basic 6.0 Enterprise Edition** on your Windows operating system.
2. Make sure the database file `bat.mdb` remains in the same folder as the project files.
3. Double-click `Project1.vbp` to open it in Visual Basic 6.0.
4. If prompted with compatibility issues, allow it to reference `MSADODC.OCX` (Microsoft ADO Data Control 6.0) and `MSDATGRD.OCX` (Microsoft DataGrid Control 6.0).
5. Click **Run (F5)** or compile the program using **File -> Make Food Management System.exe**.

### Default Cashier Credentials
*   **Username**: `admin`
*   **Password**: `admin`

*Note: Credentials can be inspected/added inside the `users` table of `bat.mdb`.*
