# ProductHub - Product Management Application

A full-stack product management system built with React, Node.js, Express, and MongoDB.

## Live Deployment Links

- **Live Application (Frontend)**: [https://webiators-product-management.vercel.app](https://webiators-product-management.vercel.app)
- **Live API Endpoint (Backend)**: [https://webiators-product-management.vercel.app/api/health](https://webiators-product-management.vercel.app/api/health)

## Features

- **Product Inventory Management**: Create, read, update, and delete products.
- **Image Handling**: Supports preset product assets, custom image URLs, and direct file uploads from the computer file system.
- **Search & Filtering**: Real-time keyword search and category filtering (Electronics, Wearables, Accessories, Displays).
- **Authentication**: JWT-based authentication for product management operations.
- **Responsive UI**: Clean design with interactive hover effects and card layouts.

## Tech Stack

- **Frontend**: React, Vite, React Router DOM, CSS3
- **Backend**: Node.js, Express, MongoDB (Mongoose), Joi Validation
- **Auth**: JSON Web Tokens (JWT), bcryptjs
- **Deployment**: Vercel (Serverless Fullstack)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm
- MongoDB URI (cloud or local)

### Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Amitrajput111/webiators-product-management.git
   cd webiators-product-management
   ```

2. **Backend Setup**:
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend` directory:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRES_IN=1d
   ```
   Start the backend dev server:
   ```bash
   npm run dev
   ```

3. **Frontend Setup**:
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```
   Open `http://localhost:5173` (or the port displayed in terminal) in your browser.

## API Reference

### Authentication
- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Authenticate user and receive JWT

### Products
- `GET /api/products` — List all products
- `GET /api/products/:id` — Get product details
- `POST /api/products` — Create new product (Protected)
- `PUT /api/products/:id` — Update existing product (Protected)
- `DELETE /api/products/:id` — Delete product (Protected)

## License

ISC