# Switching Between SQLite and PostgreSQL

This document explains how to switch between SQLite and PostgreSQL databases in the noco-do application.

## Current Configuration

The application is currently configured to use SQLite by default, as specified in the `prisma/schema.prisma` file:

```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```

## Switching to PostgreSQL for Vercel Deployment

To switch to PostgreSQL for Vercel deployment, follow these steps:

1. Create a backup of your current schema.prisma file
2. Update the schema.prisma file to use PostgreSQL:

```prisma
datasource db {
  provider  = "postgresql"
  url       = env("POSTGRES_PRISMA_URL") // uses connection pooling
  directUrl = env("POSTGRES_URL_NON_POOLING") // uses a direct connection
}
```

3. Update your environment variables:
   - For Vercel deployment, add the following environment variables in the Vercel dashboard:
     - `POSTGRES_PRISMA_URL`
     - `POSTGRES_URL_NON_POOLING`
     - `POSTGRES_USER`
     - `POSTGRES_HOST`
     - `POSTGRES_PASSWORD`
     - `POSTGRES_DATABASE`

4. Run database migration:
   ```bash
   npx prisma db push
   bun run seed
   ```

## Local Development with PostgreSQL

For local development with PostgreSQL:

1. Install PostgreSQL locally or use a Docker container
2. Create a `.env` file with your PostgreSQL credentials:

```
# PostgreSQL connection
DATABASE_URL="postgresql://username:password@localhost:5432/noco_do?schema=public"

# Admin User
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="password123"
```

3. Update the schema.prisma file to use PostgreSQL:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

4. Run database migration:
   ```bash
   npx prisma db push
   bun run seed
   ```

## CI Environment

The CI environment uses SQLite for testing. The configuration is in `.env.ci`:

```
# Use SQLite for CI
DATABASE_URL="file:./prisma/dev.db"

# Admin User for testing
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="password123"
```

## Important Notes

- When switching database providers, you need to run `npx prisma generate` to update the Prisma client
- Data will not be automatically migrated between SQLite and PostgreSQL
- For production use, PostgreSQL is recommended for better scalability and reliability
- SQLite is suitable for development and testing environments
