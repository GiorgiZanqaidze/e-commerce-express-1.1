
# 🚀 Express SQL API with Prisma

This is an Express API project that uses Prisma ORM to interact with an SQL database. It’s set up to manage data efficiently with an SQL backend.

## 📋 Table of Contents

- [⚙️ Prerequisites](#️-prerequisites)
- [📥 Installation](#-installation)
- [🔧 Configuration](#-configuration)
- [🗄️ Database Setup](#️-database-setup)
- [📜 Scripts](#-scripts)
- [💻 Usage](#-usage)
- [📂 Folder Structure](#-folder-structure)
- [🔗 API Endpoints](#-api-endpoints)

## ⚙️ Prerequisites

- **Node.js** (v14+)
- **Prisma CLI** (for database management)
- **SQL Database** (PostgreSQL, MySQL, SQLite, or compatible with Prisma)

## 📥 Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

## 🔧 Configuration

1. **Set up your environment variables** by creating a `.env` file in the root directory:

   ```plaintext
   DATABASE_URL="mysql://USER:PASSWORD@localhost:3306/DATABASE_NAME"
   ```

   Replace `USER`, `PASSWORD`, and `DATABASE_NAME` with your SQL credentials.

2. **Configure the Prisma schema** in `prisma/schema.prisma`:

   ```prisma
   datasource db {
     provider = "mysql" // or your database provider
     url      = env("DATABASE_URL")
   }
   ```

## 🗄️ Database Setup

1. **Run migrations** to set up your database tables:

   ```bash
   npx prisma migrate dev --name init
   ```

2. **Generate Prisma client**:

   ```bash
   npx prisma generate
   ```

3. **Optional:** Seed your database (if you have a seed script):

   ```bash
   npm run seed
   ```

## 📜 Scripts

- **`npm run dev`** – Start the server in development mode with hot reloading.
- **`npm run start`** – Start the server in production mode.
- **`npx prisma studio`** – Open Prisma Studio for database management.
- **`npx prisma migrate dev`** – Create a new migration.
- **`npx prisma db push`** – Push schema changes directly to the database.

## 💻 Usage

1. **Start the server:**

   ```bash
   npm run dev
   ```

2. **Use an API client** like Postman or Insomnia to interact with the endpoints (examples below).

## 📂 Folder Structure

```plaintext
project-root
├── prisma
│   ├── schema.prisma       # Prisma schema file
│   └── migrations          # Migration files
├── src
│   ├── controllers         # Route controllers
│   ├── routes              # API routes
│   ├── middlewares         # Middleware functions
│   ├── services            # Business logic
│   └── index.js            # Server entry point
├── .env                    # Environment variables
└── package.json            # Dependencies and scripts
```

## 🔗 API Endpoints

Sample endpoints to get you started:

- **GET** `/api/users` – Fetch all users
- **POST** `/api/users` – Create a new user
- **GET** `/api/users/:id` – Fetch user by ID
- **PUT** `/api/users/:id` – Update user by ID
- **DELETE** `/api/users/:id` – Delete user by ID