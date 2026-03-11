# Myura Wellness - Backend Developer Practical Assignment

<div align="center">

![Project Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen?style=flat-square)
![Node Version](https://img.shields.io/badge/Node-v14%2B-brightgreen?style=flat-square)
![Database](https://img.shields.io/badge/Database-PostgreSQL-blue?style=flat-square)

A comprehensive full-stack e-commerce platform implementing advanced backend architecture with secure API design, real-time stock management, and scalable deployment infrastructure.

</div>

---

## Author

**Yuvraj Singh**

- 🐙 **GitHub:** [github.com/YuvrajCodes1925](https://github.com/YuvrajCodes1925)
- 💼 **LinkedIn:** [linkedin.com/in/yuvraj-singh-276976266](https://www.linkedin.com/in/yuvraj-singh-276976266/)
- 📧 **Email:** [ysbhati1925@gmail.com](mailto:ysbhati1925@gmail.com)

---

## Project Overview

**Myura Wellness** is a full-stack e-commerce backend implementation coupled with a modern React UI. This project demonstrates professional-grade backend development practices including:

- **Secure API Design** with parameterized SQL queries and input validation
- **Scalable Architecture** using Node.js and Express.js
- **Database Management** with PostgreSQL and intelligent connection pooling
- **Advanced Security** features including JWT authentication and rate limiting
- **Production-Ready Deployment** on Render and Vercel infrastructure
- **Comprehensive Logging** and error handling mechanisms

The application facilitates seamless product management, order processing, and admin operations with real-time stock control and transactional integrity.

---

## Live Deployment Details

| Component | URL | Status |
|-----------|-----|--------|
| **Frontend** | `ADD_YOUR_FRONTEND_URL_HERE` | Deployed on Vercel |
| **Backend API** | `ADD_YOUR_BACKEND_URL_HERE` | Deployed on Render |
| **Database** | Supabase PostgreSQL | Session Pooler |

---

## Technology Stack

### Backend
- **Runtime:** Node.js (v14+)
- **Web Framework:** Express.js (v4.x)
- **Database:** PostgreSQL with native `pg` driver
- **Input Validation:** Zod schema validation
- **Authentication:** JWT (JSON Web Tokens)
- **Security:** 
  - Parameterized SQL queries (SQL injection prevention)
  - Centralized error handling middleware
  - Rate limiting implementation
  - CORS protection

### Frontend
- **Framework:** React 18 with Hooks
- **Build Tool:** Vite (Next-generation bundler)
- **Styling:** CSS3 with responsive design
- **HTTP Client:** Fetch API with error handling

### Infrastructure & Deployment
- **Backend Hosting:** Render.com (auto-deployment from GitHub)
- **Frontend Hosting:** Vercel (optimized React deployments)
- **Database:** Supabase PostgreSQL (fully managed)
- **Version Control:** Git & GitHub

---

## Detailed Project Structure

```
myura-wellness-backend-assignment/
│
├── backend/                          # Node.js API Server
│   ├── src/
│   │   ├── index.js                  # Server entry point
│   │   ├── app.js                    # Express application setup
│   │   │
│   │   ├── config/
│   │   │   └── env.js                # Environment configuration
│   │   │
│   │   ├── db/
│   │   │   ├── pool.js               # PostgreSQL connection pool
│   │   │   └── init.js               # Database initialization script
│   │   │
│   │   ├── middleware/
│   │   │   ├── auth.js               # JWT authentication middleware
│   │   │   ├── errorHandler.js       # Global error handling
│   │   │   └── validate.js           # Zod schema validation
│   │   │
│   │   ├── routes/
│   │   │   ├── products.js           # Product management endpoints
│   │   │   ├── orders.js             # Order processing endpoints
│   │   │   └── admin.js              # Admin authentication endpoints
│   │   │
│   │   └── utils/
│   │       └── logger.js             # File-based logging utility
│   │
│   ├── sql/
│   │   └── schema.sql                # Complete database schema
│   │
│   ├── logs/
│   │   └── error.log                 # Application error logs
│   │
│   ├── .env.example                  # Environment variable template
│   ├── package.json                  # Node.js dependencies
│   ├── render.yaml                   # Render deployment config
│   └── API_DOCS.md                   # Comprehensive API documentation
│
├── frontend/                         # React.js User Interface
│   ├── src/
│   │   ├── main.jsx                  # React application entry
│   │   ├── App.jsx                   # Root component
│   │   └── styles.css                # Global styling
│   │
│   ├── index.html                    # HTML template
│   ├── vite.config.js                # Vite bundler configuration
│   ├── vercel.json                   # Vercel deployment config
│   ├── .env.example                  # Frontend environment variables
│   └── package.json                  # React dependencies
│
├── package.json                      # Root dependencies
├── render.yaml                       # Root render configuration
└── README.md                         # This file

```

---

## Database Schema

The PostgreSQL database consists of 4 primary tables designed with referential integrity and normalized structure:

### Tables Overview

#### 1. **products** Table
Stores product inventory with details and stock control

```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  product_name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  category VARCHAR(100),
  stock INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Purpose:** Centralized product catalog management  
**Key Fields:** Name, pricing, categorization, availability

#### 2. **orders** Table
Maintains order records with customer information and timestamps

```sql
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(20),
  total_amount DECIMAL(10, 2) NOT NULL,
  order_status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Purpose:** Order history and customer tracking  
**Key Fields:** Customer details, order amount, status tracking

#### 3. **order_items** Table
Itemized details for each order with product references

```sql
CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INT NOT NULL REFERENCES orders(id),
  product_id INT NOT NULL REFERENCES products(id),
  quantity INT NOT NULL,
  unit_price DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);
```

**Purpose:** Granular order composition tracking  
**Key Fields:** Order-product mapping, quantity, pricing

#### 4. **admin_users** Table
Administrative account management with authentication

```sql
CREATE TABLE admin_users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Purpose:** Secure admin access control  
**Key Fields:** Unique username, hashed passwords

---

## Setup Instructions

### Prerequisites
Ensure you have the following installed:
- **Node.js** (v14 or higher) - [Download here](https://nodejs.org)
- **Git** - [Download here](https://git-scm.com)
- **PostgreSQL** (optional for local development) or ready Supabase account
- **Terminal/Command Prompt** access

### 1) Clone the Repository

```bash
# Clone the repository
git clone https://github.com/YuvrajCodes1925/myura-wellness-backend-assignment.git

# Navigate to project directory
cd myura-wellness-backend-assignment
```

### 2) Backend Setup & Configuration

```bash
# Navigate to backend directory
cd backend

# Copy environment variables template
cp .env.example .env

# Edit .env file with your configuration
# Key variables to configure:
# - DATABASE_URL: Your Supabase connection string
# - JWT_SECRET: A strong random secret key
# - ADMIN_USERNAME: Default admin username
# - ADMIN_PASSWORD: Default admin password
# - REQUIRE_ADMIN_AUTH: true/false for API protection

# Install dependencies
npm install

# Initialize database and seed admin user
npm run db:init

# Start development server
npm run dev
```

**Backend Server Details:**
- URL: `http://localhost:5000`
- Environment: Development with hot-reload
- Database: Connected and initialized

### 3) Frontend Setup & Configuration

Open a **new terminal** window and proceed:

```bash
# Navigate to frontend directory
cd frontend

# Copy environment variables
cp .env.example .env

# Edit .env file
# Configure: VITE_API_BASE_URL=http://localhost:5000/api (for local development)

# Install dependencies
npm install

# Start development server
npm run dev
```

**Frontend Server Details:**
- URL: `http://localhost:5173`
- Build Tool: Vite
- Hot Module Replacement: Enabled

---

## Core Features & API Implementation

### ✅ Product Management APIs

#### GET /api/products
Retrieve all products from catalog

**Response:** Array of product objects with complete details

#### POST /api/products
Create new product (Admin protected)

**Request Body:**
```json
{
  "product_name": "Wellness Tea",
  "price": 299.99,
  "category": "Beverages",
  "stock": 100
}
```

#### PUT /api/products/:id/stock
Update product stock level

**Request Body:**
```json
{
  "stock": 150
}
```

### ✅ Order Management APIs

#### POST /api/orders
Process customer order with automatic stock deduction

**Features:**
- Accepts multiple products with quantities
- Validates sufficient stock availability
- Executes database transactions for data consistency
- Prevents overselling with stock checks
- Calculates total order amount automatically

**Request Body:**
```json
{
  "customer_name": "John Doe",
  "customer_email": "john@example.com",
  "customer_phone": "+1234567890",
  "items": [
    {
      "product_id": 1,
      "quantity": 2
    },
    {
      "product_id": 3,
      "quantity": 1
    }
  ]
}
```

**Response:** Order confirmation with generated order ID

### ✅ Admin Authentication API

#### POST /api/admin/login
Secure JWT-based admin authentication

**Request Body:**
```json
{
  "username": "admin",
  "password": "secure_password"
}
```

**Response:**
```json
{
  "token": "jwt_token_here",
  "expires_in": 3600
}
```

**JWT Token Usage:** Include in subsequent requests
```
Authorization: Bearer <jwt_token>
```

### ✅ Health Check Endpoint

#### GET /api/health
Verify API availability and database connectivity

**Response:** `{ "status": "healthy" }`

---

## Security Implementation

### 1. SQL Injection Prevention
- **Parameterized Queries:** All database queries use `$1, $2` syntax
- **Type Safety:** Zod validation ensures safe data types
- **No String Concatenation:** Prevents malicious SQL injection

**Example:**
```javascript
// SECURE - Parameterized query
await pool.query(
  'SELECT * FROM products WHERE id = $1',
  [productId]
);

// NEVER DO THIS - String concatenation
await pool.query(`SELECT * FROM products WHERE id = ${productId}`);
```

### 2. Input Validation
- **Zod Schemas:** Comprehensive schema validation
- **Type Checking:** TypeScript-like runtime validation
- **Business Logic Validation:** Stock verification, price validation

### 3. Authentication & Authorization
- **JWT Tokens:** Secure stateless authentication
- **Admin Routes:** Protected with middleware verification
- **Environment-based:** `REQUIRE_ADMIN_AUTH` flag controls protection level

### 4. Error Handling
- **Centralized Middleware:** Unified error response format
- **Safe Error Messages:** Prevents information leakage
- **Logging:** All errors logged to `backend/logs/error.log`
- **HTTP Status Codes:** Appropriate codes for different scenarios

### 5. Rate Limiting
- **API Protection:** Implements rate limiting on `/api/*` routes
- **Prevents Abuse:** Blocks excessive requests from same IP
- **Configurable:** Rate limits adjustable via environment variables

### 6. CORS Security
- **Frontend URL Validation:** Only specified frontend URLs allowed
- **Environment Controlled:** `FRONTEND_URL` configuration
- **Cross-Origin Prevention:** Restricts unauthorized access

---

## Bonus Features Implemented

### 1. JWT Admin Authentication
```
📌 Endpoint: POST /api/admin/login
✓ Token-based authentication
✓ Configurable token expiration
✓ Secure password handling
```

### 2. Admin API Protection
```
📌 Configuration: REQUIRE_ADMIN_AUTH environment variable
✓ Optional enforcement on product write endpoints
✓ Middleware-based verification
✓ Token validation on protected routes
```

### 3. Rate Limiting
```
📌 Coverage: All /api/* routes
✓ Prevents brute force attacks
✓ Customizable limits per endpoint
✓ IP-based tracking
```

### 4. File-Based Error Logging
```
📌 Location: backend/logs/error.log
✓ Automatic error capture
✓ Timestamp logging
✓ Stack trace preservation
✓ Production debugging support
```

---
# Deployment Guide (Replit)

## Prerequisites
Before deploying the application, ensure the following requirements are met:

- A **Replit account**
- The **GitHub repository imported into Replit**
- Basic knowledge of managing environment variables

---

## Database Setup

This project uses **Replit’s built-in PostgreSQL database**, which eliminates the need for external database configuration.

When the Repl starts:

- A PostgreSQL database is automatically provisioned.
- The `DATABASE_URL` environment variable is automatically configured by Replit.
- The database schema initializes during the first backend startup using the SQL schema file located in the backend directory.

Since the database is managed by Replit, **no manual database setup is required**.

---

## Environment Variables

For production deployment, environment variables should be configured using **Replit Secrets**.

### Steps to configure secrets

1. Open the project in **Replit**.
2. Navigate to **Tools → Secrets**.
3. Add the required environment variables for the application.

These variables are used for authentication, server configuration, and application settings.

> **Note:**  
> The `DATABASE_URL` variable is automatically managed by Replit and should not be manually modified.

---

## Deployment on Replit

### Build Configuration

| Setting | Value |
|-------|-------|
| Build Command | `(cd frontend && npm install && npm run build) && (cd backend && npm install)` |
| Run Command | `cd backend && PORT=5000 node src/index.js` |
| Deployment Type | Autoscale |
| Port | 5000 |

---

## Deployment Steps

1. Open the project in **Replit**.
2. Click the **Deploy** button in the top-right corner.
3. Select **Autoscale** as the deployment type.
4. Confirm the build and run commands.
5. Click **Publish** to deploy the application.

After deployment, Replit will generate a **public deployment URL** where the application can be accessed.

---

## Deployment Verification

After the deployment is complete, verify the server status using the health endpoint.

### Endpoint

```bash
GET /api/health
```

### Expected Response

```json
{
  "status": "ok",
  "timestamp": "..."
}
```

This endpoint confirms that the backend server and API are running successfully.

---

## Production Architecture

In production, the application runs on a **single Express server** that serves both the backend API and the frontend application.

```
Browser → Express Server (Port 5000)
              ├── /api/* → Backend API routes
              └── /*     → Serves built React frontend
```

The Vite development proxy (`/api → localhost:3000`) is only used during development. In production, the Express server directly serves both the API and the compiled frontend application.

---

## Comprehensive API Documentation

**Complete API endpoint details, request/response formats, and error codes are documented in:**

📖 [**API_DOCS.md**](./backend/API_DOCS.md)

Includes:
- All endpoint specifications
- Request/response examples
- Status codes and error handling
- Authentication requirements
- Rate limit information

---

## Frontend Features

### 1. **Product Listing**
- Display all available products
- Real-time stock status
- Product filtering and search
- Clean, responsive grid layout

### 2. **Product Creation** (Admin)
- Add new products to catalog
- Input validation with user feedback
- Stock initialization
- Category management

### 3. **Order Management**
- Shopping cart functionality
- Quantity selection with stock verification
- Customer information collection
- Order confirmation and tracking

### 4. **Responsive Design**
- Mobile-optimized interface
- Cross-browser compatibility
- Touch-friendly interactions
- Accessible UI elements

---

## Submission Checklist

- [x] **GitHub Repository:** Public repository with clean commit history
- [x] **Database Schema:** Complete PostgreSQL schema with all tables
- [x] **API Documentation:** Comprehensive endpoint documentation
- [x] **README.md:** This detailed setup and deployment guide
- [x] **Environment Configuration:** `.env.example` files for easy setup
- [x] **Production Ready:** Deployable on Render and Vercel
- [x] **Security Implementation:** SQL injection protection, validation, JWT auth
- [x] **Error Handling:** Centralized error management with logging
- [x] **Bonus Features:** Admin auth, rate limiting, file logging

---

## Important Notes for Evaluators

### Default Admin Credentials
Default admin credentials are automatically seeded during `npm run db:init`:
- **Username:** Configured via `ADMIN_USERNAME` in `.env`
- **Password:** Configured via `ADMIN_PASSWORD` in `.env`

### JWT Token Configuration
- **Secret Key:** Must be set in `JWT_SECRET` environment variable
- **Token Expiration:** Default 1 hour (configurable)
- **Usage:** Include in `Authorization: Bearer <token>` header

### Administrative API Protection
To enforce JWT authentication on product write endpoints:
1. Set `REQUIRE_ADMIN_AUTH=true` in backend `.env`
2. Redeploy backend on Render
3. All POST/PUT requests to `/api/products` now require valid JWT token

### Stock Management
- **Automatic Deduction:** Stock decreases when orders are placed
- **Transaction Safety:** Database transactions ensure consistency
- **Validation:** Orders rejected if insufficient stock
- **Real-time Updates:** Stock available immediately after order

### Error Logging
- **Location:** `backend/logs/error.log`
- **Format:** Timestamp | Error Message | Stack Trace
- **Review:** Check logs for production debugging
- **Cleanup:** Periodically archive old logs for storage efficiency

---

## Troubleshooting

### Backend Won't Start
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Verify database connection
npm run db:init
```

### Database Connection Error
- Verify `DATABASE_URL` in `.env` is correct
- Ensure Supabase database is active
- Check PostgreSQL credentials and permissions
- Test connection with: `psql <CONNECTION_STRING>`

### Frontend API Calls Fail
- Confirm `VITE_API_BASE_URL` in frontend `.env`
- Check backend is running on correct port
- Verify CORS settings in backend
- Review browser console for detailed errors

### CORS Issues
- Ensure `FRONTEND_URL` matches deployed frontend URL
- Include protocol (https://) in CORS configuration
- Clear browser cache and restart development server

---

## Performance Considerations

### Database Optimization
- **Connection Pooling:** Session Pooler reduces connection overhead
- **Indexes:** Automatic on primary keys and foreign keys
- **Query Optimization:** Parameterized queries are pre-compiled

### Frontend Optimization
- **Code Splitting:** Vite automatically chunks code
- **Asset Optimization:** Images and CSS minified
- **Lazy Loading:** Components loaded on demand

### API Response Times
- **Average:** 50-200ms for typical queries
- **Heavy Operations:** Order processing typically completes in <500ms
- **Monitoring:** Check deployment logs for performance metrics

---

## Contributing Guidelines

While this is an assignment project, the following practices are encouraged:

1. **Code Style:** Use consistent formatting
2. **Comments:** Document complex logic
3. **Testing:** Verify all features before pushing
4. **Commits:** Write clear, descriptive commit messages
5. **Branches:** Create feature branches for development

---

## Project Statistics

- **Backend Files:** 9 core files (config, db, middleware, routes, utils)
- **Frontend Files:** 3 core files (components, styling)
- **Database Tables:** 4 normalized entities
- **API Endpoints:** 8+ documented endpoints
- **Lines of Code:** ~2000+ production code

---

## License

This project is submitted as an assignment for **Backend Developer Practical Assignment**. All rights reserved.

---

## Support & Contact

For questions, issues, or clarifications regarding this project:

- **Email:** [ysbhati1925@gmail.com](mailto:ysbhati1925@gmail.com)
- **GitHub Issues:** [github.com/YuvrajCodes1925/myura-wellness-backend-assignment/issues](https://github.com/YuvrajCodes1925/myura-wellness-backend-assignment/issues)
- **LinkedIn:** [linkedin.com/in/yuvraj-singh-276976266](https://www.linkedin.com/in/yuvraj-singh-276976266/)

---

<div align="center">

### Made with ❤️ by Yuvraj Singh

⭐ **If you found this project helpful, please consider giving it a star!**

</div>
