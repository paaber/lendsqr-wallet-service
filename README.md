# Lendsqr Wallet Service

## Overview
The Lendsqr Wallet Service is an MVP backend service that provides wallet functionality for a mobile lending app. This service allows users to:
- Create an account
- Fund their wallet
- Transfer funds to other users
- Withdraw funds
- Ensure blacklisted users are not onboarded

This project is built with **Node.js, TypeScript, MySQL, and Knex.js ORM**, following best practices in software design and architecture.

## Environment Setup

### Prerequisites
Ensure you have the following installed on your system:
- [Node.js (LTS Version)](https://nodejs.org/en/)
- [MySQL](https://www.mysql.com/)
- [Knex.js](https://knexjs.org/)

### Installation Steps
1. Clone the repository:
   ```sh
   git clone <repo-url>
   cd lendsqr-wallet-service
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3.  set environment variables at `/env/development.env`:
   ```env
   DATABASE_URL = DATABASE_URL
   PORT=5000
   ```
4. Initialize TypeScript:
   ```sh
   npx tsc --init
   ```
5. Initialize Knex.js:
   ```sh
   npx knex init
   ```
6. Start the development server:
   ```sh
   npm run dev
   ```

## Project Structure
```
src/
├── configs/      # Environment and database configurations
├── routes/       # API route definitions
├── controllers/  # Business logic controllers
├── services/     # Service layer for reusable logic
├── models/       # Database models and queries
├── middlewares/  # Express middlewares
├── utils/        # Helper functions
├── app.ts        # Express app entry point
└── server.ts     # Application bootstrap
```

## Contribution Guidelines
- Follow DRY and SOLID principles
- Use meaningful commit messages following conventional commits
- Ensure code is properly formatted using ESLint and Prettier
- Write unit tests before pushing major changes

## Next Steps
- Implement database migrations and models
- Develop API endpoints for wallet functionality
- Write unit tests for API endpoints
- Deploy the service and update documentation

