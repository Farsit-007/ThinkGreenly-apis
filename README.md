# 🌱 Sustainability Idea Hub (Backend)

[![Build Status](https://img.shields.io/github/actions/workflow/status/your-repo/backend/ci.yml)](https://github.com/khaledssbd/ThinkGreenly-apis/actions)
[![Coverage](https://coveralls.io/repos/github/your-repo/backend/badge.svg)](https://coveralls.io/github/khaledssbd/ThinkGreenly-apis)

# 📌 Overview

RESTful API for the Sustainability Idea Hub, built with Node.js, Express, and PostgreSQL. Handles authentication, idea moderation, and payments.

## 🌍 Live URL

Want to test your own, please use this link
[Live Deployment](https://think-greenly-serverside.vercel.app/)

## 🛠️ Features

- **JWT Authentication**: Secure member/admin login.
- **CRUD Operations**: Manage ideas, comments, and votes.
- **Admin Endpoints**: Approve/reject ideas with feedback.
- **Payment API**: Integrates SSLCommerz/ShurjoPay.
- **Database**: PostgreSQL with Prisma ORM.

## 🏗️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Auth**: JWT, bcrypt

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js ≥18.x
- PostgreSQL ≥15.x

### Installation

1. Clone the repo:
   ```bash
   git clone https://github.com/khaledssbd/ThinkGreenly-apis.git sustainability-hub-backend
   cd sustainability-hub-backend
   ```
2. Install dependencies

   ```bash
   npm install --legacy-peer-deps
   ```

3. Set up environment variables in a `.env` file:

   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/sustainability_hub"
   # Environment
   NODE_ENV=development

   # Port
   PORT=5000

   # Database URL
   DB_URL=""

   # Bcrypt Salt Rounds
   BCRYPT_SALT_ROUNDS=

   # JWT Secrets and Expiry
   JWT_ACCESS_SECRET=
   JWT_ACCESS_EXPIRES_IN=
   JWT_REFRESH_SECRET=
   JWT_REFRESH_EXPIRES_IN=
   JWT_OTP_SECRET=
   JWT_PASS_RESET_SECRET=
   JWT_PASS_RESET_EXPIRES_IN=

   # Cloudinary Credentials
   CLOUDINARY_CLOUD_NAME=
   CLOUDINARY_API_KEY=
   CLOUDINARY_API_SECRET=

   # Email Configuration
   SENDER_EMAIL=""
   SENDER_APP_PASS=""

   # SSLCommerz Payment Info
   STORE_NAME=""
   PAYMENT_API=""
   VALIDATION_API=""
   STORE_ID=""
   STORE_PASSWORD=""
   VALIDATION_URL="http://localhost:5000/api/v1/ssl/validate"
   SUCCESS_URL="http://localhost:3000/success"
   FAILED_URL="http://localhost:3000/failed"
   CANCEL_URL="http://localhost:3000"

   FRONTEND_LINK="http://localhost:3000"
   BACKEND_LINK="http://localhost:5000"
   ```

4. Set up database

   ```bash
   npx prisma migrate dev
   ```

5. Start the server
   ```bash
   npm run dev
   ```

## API Endpoints

### Auth APIs

```
✅️ POST  /api/v1/auth/login                    Login User
✅️ POST  /api/v1/auth/send-email             Send Email (e.g., reset link)
✅️ POST  /api/v1/auth/reset-password         Reset Password
✅️ POST  /api/v1/auth/refresh-token          Generate Refresh Token
✅️ PATCH  /api/v1/auth/change-password        Change Password
```

### User APIs

```
✅️ POST  /api/v1/users                     Create User
✅️ PATCH  /api/v1/users/:id/status          Update User Status/Role (Admin)
✅️ GET   /api/v1/users/me                Get My Profile
✅️ GET   /api/v1/users/:id                Get Single User
✅️ PATCH  /api/v1/users/:id/profile         Update Profile
```

### Admin APIs

```
✅️ GET   /api/v1/admin/ideas              Get All Ideas (Admin View)
✅️ GET   /api/v1/admin/users              Get All Users
✅️ PATCH  /api/v1/admin/ideas/:id/status    Update Idea Status (Approve/Reject)
✅️ PATCH  /api/v1/admin/users/:id/status   Update User Status (e.g., isActive)
```

### Idea APIs

```
✅️ POST  /api/v1/ideas/drafts             Draft an Idea
✅️ GET   /api/v1/ideas                   Get All Ideas (Public)
✅️ GET   /api/v1/ideas/:id               Get an Idea
✅️ PUT   /api/v1/ideas/:id               Update an Idea
✅️ DELETE  /api/v1/ideas/:id              Delete an Idea
✅️ POST  /api/v1/ideas                   Create an Idea (Submit for Review)
✅️ GET   /api/v1/ideas/me                Get All Own Ideas
```

### Payment APIs

```
✅️ POST  /api/v1/payments                Create a Payment (Paid Ideas)
✅️ GET   /api/v1/payments                Get All Payments (Admin)
✅️ GET   /api/v1/payments/me             Get Member Payments
✅️ GET   /api/v1/payments/:id            Get Payment Details
✅️ PATCH  /api/v1/payments/:id/validate   Validate a Payment
```

### Comment APIs

```
✅️ POST  /api/v1/comments                Create Comment
✅️ GET   /api/v1/comments/:id            Get Comment
✅️ DELETE  /api/v1/comments/:id           Delete Comment
```

### Category APIs

```
✅️ POST  /api/v1/categories              Create Category (Admin)
✅️ GET   /api/v1/categories              Get All Categories
```

### Vote APIs

```
✅️ POST  /api/v1/votes                   Register Vote (Upvote/Downvote)
✅️ DELETE  /api/v1/votes/:id             Remove Vote
✅️ GET   /api/v1/votes/me                Get Current User’s Vote for an Idea
✅️ GET   /api/v1/ideas/sorted-by-votes   Get All Ideas Sorted by Votes
✅️ GET   /api/v1/votes/stats            Get Upvote/Downvote Stats
```

## How to Contribute

1. Fork the repository.

2. Create a branch:

   ```
   bash
   git checkout -b fix/your-fix

   ```

3. Test changes:

   ```
   bash
   npm test

   ```

4. Push to your fork and open a Pull Request.

## License

MIT (do whatever you want to do :smile: )
