# StockFlow

A focused inventory and sales ERP for small businesses — track what you have, what
you're buying, and what you're selling, without the weight of full accounting
software.

> **Status: in active development.** The backend is being built incrementally. See
> [Project status](#project-status) for what exists today versus what's planned.
> This README describes the intended system; it is not yet a finished product.

## Scope

StockFlow is deliberately **not** a full accounting package. It covers inventory and
the sales/purchasing flows around it, and stops there.

**Planned capabilities**

- **Catalog** — products, categories, units of measure
- **Partners** — suppliers and customers
- **Warehouses & inventory** — on-hand quantity per product per warehouse, backed by
  an append-only stock-movement ledger so every change is auditable
- **Purchasing** — purchase orders → approval → goods receipts (stock in)
- **Sales** — sales orders → shipments (stock out) → invoices
- **Adjustments & transfers** — controlled stock corrections and inter-warehouse moves
- **Reporting** — stock levels, low-stock alerts, inventory valuation, sales summaries
- **Security** — role-based access control across the API and UI

## Tech stack

| Layer | Choice |
| --- | --- |
| Language | TypeScript |
| Runtime | Node.js |
| API framework | Express 5 |
| Database | PostgreSQL |
| ORM | Prisma |
| Validation | Zod |
| Auth | JWT + bcrypt |

## Getting started

### Prerequisites

- Node.js 20+
- PostgreSQL 14+ running locally

### Setup

```bash
cd backend

# 1. Install dependencies
npm install

# 2. Create the database role and database
psql -U postgres -c "CREATE ROLE stockflow WITH LOGIN PASSWORD 'stockflow';"
psql -U postgres -c "ALTER ROLE stockflow CREATEDB;"   # needed by Prisma Migrate
psql -U postgres -c "CREATE DATABASE stockflow OWNER stockflow;"

# 3. Configure environment
cp .env.example .env     # then edit if your Postgres differs

# 4. Apply the schema
npx prisma generate
npx prisma migrate dev

# 5. Start the API
npm run dev
```

The API starts on `http://localhost:4000`. Check it's alive:

```bash
curl http://localhost:4000/health
```

### Useful scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Start the API with hot reload |
| `npm run typecheck` | Type-check without emitting |
| `npm test` | Run the test suite |
| `npm run lint` | Lint |
| `npm run format` | Format with Prettier |
| `npx prisma studio` | Browse the database in a GUI |

## Design notes

A few decisions that shape the codebase:

- **Money never touches floating point.** Monetary values are stored as `Decimal` in
  Postgres and travel over the API as decimal *strings*, so precision is never lost
  to IEEE-754 rounding. The client coerces to a number only for display.
- **Inventory is a ledger.** Every stock change appends an immutable movement row and
  updates the on-hand balance in the same database transaction. That keeps
  `balance == SUM(movements)` true, and lets the system reject any movement that
  would drive stock negative.
- **Layered backend.** Each feature module is split into
  `routes → controller → service → repository`, so HTTP concerns, business rules, and
  data access stay separable and testable.
- **The server is the source of truth.** Any permission or pricing logic mirrored in
  a client is for user experience only; the API re-checks everything.

## Project structure

```
backend/
  prisma/
    schema.prisma          Data model
    migrations/            Migration history
  src/
    app.ts                 Express app assembly
    server.ts              HTTP server entrypoint
    env.ts                 Validated environment config
    db.ts                  Prisma client
    domain/                Errors and shared business rules
    middleware/            Auth, validation, error handling
    modules/               Feature modules (health, auth, ...)
```

## Project status

**Implemented**

- Express application skeleton with layered module structure
- Environment validation and centralised error handling
- Health check endpoint
- Prisma + PostgreSQL wired up, with the `User` model and its first migration

**In progress**

- Authentication and role-based access control

**Planned**

- Catalog, partners, warehouses, purchasing, sales, invoicing, reporting

## License

Not yet licensed.
