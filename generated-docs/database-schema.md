# Database Schema Specification: MongoDB & Mongoose
**Project**: Hot Pizza Management System / Debonairs Inn System Modernization  
**Author**: Antigravity Modernization Agent  
**Date**: June 2026  

---

## 1. Overview & Data Architecture

The legacy Microsoft Access database (`Deboneirs Inn System.mdb`) stored sales transactions in flat, loosely typed tables with duplicate column mappings across beverage types. 

For the modernized system, we use **MongoDB** to implement a document-based data architecture. This approach offers several advantages:
1. **Atomic Document Writes**: Orders are persisted as single documents containing arrays of ordered items, preventing partial order writes.
2. **Schema Flexibility**: Accommodates variations in item properties (e.g., Sprite uses volume `ml`, Burgers use weight `g` and accompaniments `ServedWith`, Ice Cream uses `colour` and `flavour`).
3. **No Locks**: Replaces Access network file locks (`.ldb`) with MongoDB's high-concurrency document-level locking.

---

## 2. Collection Schemas (Mongoose ODM)

We define three main collections: **Cashiers**, **Orders**, and **MenuInventory**.

### 2.1. Cashiers Collection (`cashiers`)
Stores authenticated user sessions and profiles. Replaces plaintext credentials inside the code.

```typescript
import { Schema, model, Document } from 'mongoose';

export interface ICashierDocument extends Document {
  username: string;
  passwordHash: string;
  role: 'cashier' | 'waiter' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

const CashierSchema = new Schema<ICashierDocument>(
  {
    username: { 
      type: String, 
      required: true, 
      unique: true, 
      trim: true,
      index: true 
    },
    passwordHash: { 
      type: String, 
      required: true 
    },
    role: { 
      type: String, 
      enum: ['cashier', 'waiter', 'admin'], 
      default: 'cashier' 
    }
  },
  { timestamps: true }
);

export const CashierModel = model<ICashierDocument>('Cashier', CashierSchema);
```

---

### 2.2. Orders Collection (`orders`)
Combines transaction records. Nested sub-documents log detailed line items (correcting the legacy Pizza write-to-Burger and Chips addition bugs).

```typescript
import { Schema, model, Document } from 'mongoose';

interface IOrderItem {
  description: string;
  quantity: number;
  unitPrice: number;
  servedWith?: string; // Mapped from Burgers/Chips Accompaniments
  colour?: string;     // Mapped from Ice Cream Colour
  flavour?: string;    // Mapped from Ice Cream Flavour
  type?: string;       // e.g., Cold, Hot (Sprite), Regular, Diet (Coke)
}

export interface IOrderDocument extends Document {
  category: 'Sprite' | 'Coke' | 'Burger' | 'Pizza' | 'IceCream' | 'Chips';
  items: IOrderItem[];
  totalAmount: number;
  cashier: string;
  offlineCreatedAt?: Date; // Captures local mobile timestamps during offline states
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new Schema<IOrderItem>({
  description: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  unitPrice: { type: Number, required: true, min: 0 },
  servedWith: { type: String },
  colour: { type: String },
  flavour: { type: String },
  type: { type: String }
});

const OrderSchema = new Schema<IOrderDocument>(
  {
    category: { 
      type: String, 
      required: true, 
      enum: ['Sprite', 'Coke', 'Burger', 'Pizza', 'IceCream', 'Chips'] 
    },
    items: { 
      type: [OrderItemSchema], 
      required: true 
    },
    totalAmount: { 
      type: Number, 
      required: true,
      min: 0
    },
    cashier: { 
      type: String, 
      required: true, 
      index: true 
    },
    offlineCreatedAt: { 
      type: Date 
    }
  },
  { timestamps: true }
);

// Pre-save validation hook to enforce accurate billing math on backend
OrderSchema.pre<IOrderDocument>('save', function (next) {
  const calculatedSum = this.items.reduce((sum, item) => {
    return sum + (item.quantity * item.unitPrice);
  }, 0);
  
  this.totalAmount = calculatedSum; // Replaces legacy Chips addition bug
  next();
});

export const OrderModel = model<IOrderDocument>('Order', OrderSchema);
```

---

### 2.3. Menu Inventory Collection (`menu_inventory`)
Maintains dynamic price lists, replacing hardcoded prices in layout elements.

```typescript
import { Schema, model, Document } from 'mongoose';

export interface IMenuInventoryDocument extends Document {
  category: 'Sprite' | 'Coke' | 'Burger' | 'Pizza' | 'IceCream' | 'Chips';
  name: string;
  price: number;
  sizeOrWeight: string; // e.g. "300ml", "150g"
  options: string[];    // e.g. ["Extra Cheese", "Served with Salad"]
  isAvailable: boolean;
}

const MenuInventorySchema = new Schema<IMenuInventoryDocument>(
  {
    category: { 
      type: String, 
      required: true, 
      enum: ['Sprite', 'Coke', 'Burger', 'Pizza', 'IceCream', 'Chips'] 
    },
    name: { 
      type: String, 
      required: true, 
      trim: true 
    },
    price: { 
      type: Number, 
      required: true, 
      min: 0 
    },
    sizeOrWeight: { 
      type: String, 
      required: true 
    },
    options: { 
      type: [String], 
      default: [] 
    },
    isAvailable: { 
      type: Boolean, 
      default: true 
    }
  },
  { timestamps: true }
);

export const MenuInventoryModel = model<IMenuInventoryDocument>('MenuInventory', MenuInventorySchema);
```

---

## 3. Database Indexes

To maintain fast performance on tablet consoles and cashier reporting screens, we define the following indexing strategy:

1. **Cashier Query Index**: `CashierSchema.index({ username: 1 })`
   - *Rationale*: Speed up login sessions and token validations.
2. **Sales Report Compound Index**: `OrderSchema.index({ cashier: 1, createdAt: -1 })`
   - *Rationale*: Optimized for retrieving order history filtered by the active logged-in cashier.
3. **Date Analytics Index**: `OrderSchema.index({ createdAt: -1 })`
   - *Rationale*: Speeds up dashboard chart loading and end-of-day sales data reports.
