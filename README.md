# Myura Wellness - Backend Developer Practical Assignment

Full-stack e-commerce backend + UI implementation using Node.js, Express, React, and SQL (PostgreSQL).

## Live Deployment Details
- Frontend URL: `ADD_YOUR_FRONTEND_URL_HERE`
- Backend API URL: `ADD_YOUR_BACKEND_URL_HERE`
- Database: Supabase PostgreSQL (Session Pooler)

## Tech Stack
- Backend: Node.js, Express, PostgreSQL (`pg`)
- Frontend: React + Vite
- Validation: Zod
- Security: Parameterized SQL queries, input validation, centralized error handling
- Bonus: JWT admin auth, rate limiting, backend error logging

## Project Structure
- `backend/` Node.js API server
- `backend/sql/schema.sql` database schema
- `backend/API_DOCS.md` endpoint documentation
- `frontend/` React UI
- `render.yaml` Render deployment config (backend)
- `frontend/vercel.json` Vercel deployment config (frontend)

## Database Schema
Schema is available at:
- `backend/sql/schema.sql`

Tables:
- `products`
- `orders`
- `order_items`
- `admin_users`

## Local Setup Instructions

### 1) Clone repository
```bash
git clone <your-repo-url>
cd <repo-folder>
```

### 2) Backend setup
```bash
cd backend
cp .env.example .env
npm install
npm run db:init
npm run dev
```

Backend runs on `http://localhost:5000` by default.

### 3) Frontend setup
In another terminal:
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Frontend runs on `http://localhost:5173` by default.

## Required APIs Implemented

### Product Management
- `GET /api/products`
- `POST /api/products`
- `PUT /api/products/:id/stock`

Product fields:
- `product_name`
- `price`
- `category`
- `stock`

### Order Management
- `POST /api/orders`
- Accepts customer details + list of products with quantities.
- Validates stock and auto-reduces stock in a DB transaction.
- Prevents order when stock is insufficient.

### API Security
- SQL injection protection using parameterized queries (`$1`, `$2`, ...)
- Input validation using Zod
- Centralized error handling with proper HTTP status codes

### Basic UI
- View products list
- Add new product
- Place order with selectable quantities

## Bonus Features Implemented
- JWT authentication endpoint for admin login: `POST /api/admin/login`
- Optional admin protection for product write APIs via `REQUIRE_ADMIN_AUTH=true`
- Rate limiting on `/api/*`
- File-based backend error logging in `backend/logs/error.log`

## Deployment Steps (Render + Supabase + Vercel)

### 1) Database (Supabase)
1. Create a project in Supabase.
2. Open `Connect` and copy the **Session Pooler** URI.
3. Run schema SQL from `backend/sql/schema.sql` in Supabase SQL Editor.

### 2) Backend (Render)
1. Push this repo to GitHub.
2. In Render, create a **Web Service** from the GitHub repo.
3. Render can auto-read `render.yaml`, or configure manually:
   - Root directory: `backend`
   - Build command: `npm install`
   - Start command: `npm start`
4. Add environment variables:
   - `DATABASE_URL` = Supabase Session Pooler URI
   - `PORT` = `5000`
   - `FRONTEND_URL` = your Vercel frontend URL (or comma-separated URLs)
   - `JWT_SECRET` = strong random value
   - `REQUIRE_ADMIN_AUTH` = `false` (or `true` if you want protected admin write APIs)
   - `ADMIN_USERNAME` and `ADMIN_PASSWORD`
5. Deploy and verify health: `https://<backend-domain>/api/health`

### 3) Frontend (Vercel)
1. Import this repo in Vercel.
2. Set project root to `frontend`.
3. Add environment variable:
   - `VITE_API_BASE_URL=https://<render-backend-domain>/api`
4. Deploy.

### 4) Final Link Wiring
- Update backend `FRONTEND_URL` with Vercel URL.
- Redeploy backend if env vars changed.

## API Documentation
- Detailed docs are available at `backend/API_DOCS.md`.

## Submission Checklist
- [x] GitHub repository link
- [x] Self-created database schema
- [x] API documentation
- [x] README with setup and deployment steps

## Notes for Evaluators
- Default admin credentials are seeded from `.env` (`ADMIN_USERNAME` and `ADMIN_PASSWORD`) during backend startup/db init.
- To enforce JWT on product create/update endpoints, set:
  - `REQUIRE_ADMIN_AUTH=true`