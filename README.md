
# LendeSqaare Wallet Service API

## Overview
A Node.js/TypeScript backend API for a wallet service that allows users to:
- Create accounts
- Fund their wallets
- Transfer funds between users
- Withdraw funds
- Check blacklist status via Lendsqr Adjutor Karma API

## Tech Stack
- **Node.js** (LTS)
- **TypeScript**
- **Knex.js** (ORM)
- **MySQL** (Database)
- **Jest** (Testing)
- **Docker** (Containerization)

## Why Docker?
Docker was used to:
1. **Ensure Consistency**: The app runs the same way in development, testing, and production.
2. **Simplify Setup**: No need to install dependencies locally; just run the container.
3. **Isolate Dependencies**: Avoid conflicts with other projects or system libraries.

## Setup

### **Option 1: Run with Docker (Recommended)**

1. **Clone the repository**:
   ```bash
   git clone https://github.com/paaber/lendsqr-wallet-service.git
   cd lendsqr-be-test
   ```

2. **Set up environment variables**:
   update the `development.env` file in the env directory:
   ```env
   PORT=3000
   DATABASE_URL= mysql://lend_qr_db:password@mysql:3306/lend_qr_db?connect_timeout=300
   BLACKLIST_API_URL=  https://adjutor.lendsqr.com/v2/verification/karma
   BLACKLIST_API_KEY=your-api-key
   ```

3. **Build and run the app**:
   ```bash
   docker-compose up --build
   ```

4. **Access the app**:
   The API will be available at `http://localhost:5711` (port 5711 is mapped to the container's port 3000).

5. **Run migrations**:
   ```bash
   docker-compose exec app npx knex migrate:latest
   ```

6. **Run tests**:
   ```bash
   docker-compose exec app npm test
   ```

---

### **Option 2: Run Locally**

1. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run migrations**:
   ```bash
   npx knex migrate:latest
   ```

4. **Start the server**:
   ```bash
   npm run dev
   ```

---

## API Endpoints

| Endpoint                | Method | Description                  |
|-------------------------|--------|------------------------------|
| `/users/register`       | POST   | Register a new user          |
| `/wallets/fund`         | POST   | Fund a user's wallet         |
| `/wallets/transfer`     | POST   | Transfer funds between users |
| `/wallets/withdraw`     | POST   | Withdraw funds               |

---

## E-R Diagram
![E-R Diagram](https://dbdesigner.page.link/GUFZvrcNTipguZ6o7)

---

## Deployment
The API is deployed on Heroku:  
`https://<candidate-name>-lendsqr-be-test.herokuapp.com`

---

## Unit Tests
Run tests with:
```bash
npm test
```

---

## License
MIT
```

