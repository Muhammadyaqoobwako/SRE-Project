# Modern Project Folder Structure: Mobile & Backend
**Project**: Hot Pizza Management System / Debonairs Inn System Modernization  
**Author**: Antigravity Modernization Agent  
**Date**: June 2026  

---

## 1. Project Directory Overview

The modernized system is structured as a monorepo containing two decoupled projects:
1. `mobile-app/`: The React Native / Expo client app (compiled with TypeScript).
2. `backend-api/`: The Node.js / Express.js REST API server (compiled with TypeScript).

Both folders implement **Clean Architecture** patterns, isolating core business domain rules from interface templates and hardware/database drivers.

---

## 2. Mobile App Folder Layout (`mobile-app/`)

Conforms to standard Expo configurations, separating code into `domain`, `data`, and `presentation` layers under `/src`.

```text
mobile-app/
├── assets/                  # Brand images, icons, and fonts (e.g. Outfit, Inter)
├── src/
│   ├── domain/              # Inner Layer: Domain Core Business Logic
│   │   ├── entities/        # Business types (e.g. Order, Cashier, MenuItem)
│   │   │   ├── Order.ts
│   │   │   └── Cashier.ts
│   │   ├── usecases/        # Single responsibility interactor classes
│   │   │   ├── PlaceOrder.ts
│   │   │   └── LoginCashier.ts
│   │   └── repositories/    # Interfaces defining Data Repository contracts
│   │       └── IOrderRepository.ts
│   │
│   ├── data/                # Middle Layer: Infrastructure Implementations
│   │   ├── api/             # API configuration (Axios instances, endpoints)
│   │   │   └── OrderApiClient.ts
│   │   ├── cache/           # Offline storage (SecureStore, SQLite local queues)
│   │   │   ├── SecureStoreHelper.ts
│   │   │   └── OfflineOrderDb.ts
│   │   ├── models/          # Data transfer object schemas (DTOs)
│   │   │   └── OrderDto.ts
│   │   └── repositories/    # Concrete classes implementing domain contracts
│   │       └── OrderRepositoryImpl.ts
│   │
│   └── presentation/        # Outer Layer: UI Views, Custom Hooks, State
│       ├── components/      # Reusable UI elements (Buttons, InputFields, Modals)
│       │   ├── OrderCard.tsx
│       │   └── PrinterButton.tsx
│       ├── screens/         # Page components (Login, Sprite, Pizza, Chips, Reports)
│       │   ├── LoginScreen.tsx
│       │   ├── PizzaScreen.tsx
│       │   └── ChipsScreen.tsx
│       ├── hooks/           # Controllers: Custom React Hooks linking views to use cases
│       │   ├── useAuth.ts
│       │   └── useOrderPlacement.ts
│       ├── navigation/      # Routing definitions (Expo Router / React Navigation)
│       │   └── index.tsx
│       └── state/           # Global Contexts (Theme state, network connection cache)
│           └── AuthContext.tsx
│
├── App.json                 # Expo SDK configuration file
├── package.json             # Mobile app dependencies (react-native, expo, ts-node)
├── tsconfig.json            # TypeScript build rules
└── yarn.lock
```

---

## 3. Backend API Folder Layout (`backend-api/`)

Express backend layout isolating routing pipelines from service calculations and MongoDB schemas.

```text
backend-api/
├── src/
│   ├── domain/              # Core Layer: Business Services & Schemas
│   │   ├── services/        # Service executors (e.g., BillingService, AuthService)
│   │   │   ├── BillingService.ts
│   │   │   └── AuthService.ts
│   │   └── repositories/    # Data access interface declarations
│   │       └── IOrderRepository.ts
│   │
│   ├── infra/               # Driver Layer: Mongoose Schemas & Connectors
│   │   ├── database/        # Mongoose database models & connection pooling
│   │   │   ├── MongoDbConn.ts
│   │   │   └── MongooseSchemas.ts
│   │   ├── middleware/      # Request filters (Auth verification, validation, errors)
│   │   │   ├── authMiddleware.ts
│   │   │   ├── validateMiddleware.ts
│   │   │   └── errorHandler.ts
│   │   ├── logger/          # Winston configuration logging to files
│   │   │   └── winston.ts
│   │   └── repositories/    # Concrete data access executing queries to Mongo
│   │       └── MongoOrderRepositoryImpl.ts
│   │
│   ├── controllers/         # Handler Layer: Express REST Controllers
│   │   ├── OrderController.ts
│   │   └── AuthController.ts
│   │
│   ├── routes/              # Routing Layer: Express Route definitions
│   │   ├── index.ts
│   │   ├── orderRoutes.ts
│   │   └── authRoutes.ts
│   │
│   └── app.ts               # Express application initialization and middleware loading
│
├── tests/                   # Test Suite (Jest unit tests and supertest integration tests)
│   ├── unit/
│   │   └── BillingService.test.ts
│   └── integration/
│       └── OrderApi.test.ts
│
├── Dockerfile               # Production container definition
├── docker-compose.yml       # Launches REST API and MongoDB container side-by-side
├── package.json             # Server dependencies (express, mongoose, typescript, bcrypt)
├── tsconfig.json            # TypeScript configuration
└── jest.config.js           # Test settings configuration
```
