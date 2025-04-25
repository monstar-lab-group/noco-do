# Migrating from SQLite to Vercel Postgres

This document outlines the steps to migrate the noco-do application from SQLite to Vercel Postgres for production deployment.

## Prerequisites

- A Vercel account
- Your application code pushed to a GitHub repository
- Basic understanding of Prisma and PostgreSQL

## Steps to Migrate

### 1. Create a Vercel Postgres Database

1. Log in to your Vercel account
2. Navigate to the Storage tab
3. Click "Create Database"
4. Select "Postgres" as the database type
5. Choose your region and plan (Free tier is available)
6. Click "Create"

### 2. Connect Your Project to Vercel Postgres

1. In your Vercel project settings, go to the "Environment Variables" tab
2. Vercel will automatically add the following environment variables:
   - `POSTGRES_URL`
   - `POSTGRES_PRISMA_URL`
   - `POSTGRES_URL_NON_POOLING`
   - `POSTGRES_USER`
   - `POSTGRES_HOST`
   - `POSTGRES_PASSWORD`
   - `POSTGRES_DATABASE`

### 3. Update Your Prisma Schema

The Prisma schema has already been updated to use PostgreSQL:

```prisma
datasource db {
  provider  = "postgresql"
  url       = env("POSTGRES_PRISMA_URL") // uses connection pooling
  directUrl = env("POSTGRES_URL_NON_POOLING") // uses a direct connection
}
```

### 4. Deploy Your Application

1. Push your changes to GitHub
2. Import your repository in Vercel
3. Vercel will automatically detect the Prisma configuration
4. During the build process, Prisma will create the database schema

### 5. Run Database Migrations

After deployment, you need to run the seed script to populate the database:

1. In your Vercel project, go to the "Deployments" tab
2. Click on the latest deployment
3. Go to the "Functions" tab
4. Create a new function or use the Vercel CLI to run:

```bash
npx prisma db push
bun run seed
```

## IP Restriction Configuration

The application includes IP-based access restriction via Next.js middleware:

1. In your Vercel project, add an environment variable:
   - `ALLOWED_IPS`: Comma-separated list of allowed IP addresses

2. The middleware will restrict access to only the IPs in this list
3. In development mode, IP restriction is disabled

## Troubleshooting

- If you encounter database connection issues, verify your environment variables
- For migration errors, check the Prisma logs in your Vercel deployment
- If you need to reset the database, you can use `npx prisma migrate reset` (caution: this will delete all data)

## Local Development with Vercel Postgres

To use Vercel Postgres locally:

1. Create a `.env` file with your Vercel Postgres credentials
2. Run `npx prisma generate` to update the Prisma client
3. Run `npx prisma db push` to sync your schema
4. Run `bun run seed` to populate the database

## Additional Resources

- [Vercel Postgres Documentation](https://vercel.com/docs/storage/vercel-postgres)
- [Prisma with PostgreSQL](https://www.prisma.io/docs/concepts/database-connectors/postgresql)
- [Next.js Middleware Documentation](https://nextjs.org/docs/app/building-your-application/routing/middleware)
