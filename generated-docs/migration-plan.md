# Migration Plan: VB6 to React/Node.js

## 1. Migration Overview
This plan dictates how legacy VB6 components in `legacy-app/` are systematically migrated to `modern-app/`.

## 2. Component Mapping Table

| VB6 Legacy File | Target Component | Migration Strategy | Status |
| :--- | :--- | :--- | :--- |
| `frmCustomer.frm` | `modern-app/frontend/src/components/CustomerForm.jsx` | Convert controls to React inputs, add Axios integration. | Completed |
| `frmInventory.frm` | `modern-app/frontend/src/components/InventoryList.jsx` | Render table of stock entries with visual alerts. | Completed |
| `modDatabase.bas` | `modern-app/backend/src/db.js` | Replace ADODB Access connection with SQLite. | Completed |
