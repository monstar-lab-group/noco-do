# Deployment Guide for noco-do

This guide provides step-by-step instructions for deploying the noco-do application to Vercel with PostgreSQL database and IP restriction.

## Prerequisites

- A Vercel account
- Your application code pushed to a GitHub repository
- Basic understanding of Prisma and PostgreSQL

## Deployment Steps

### 1. Create a Vercel Postgres Database

1. Log in to your Vercel account
2. Navigate to the Storage tab
3. Click "Create Database"
4. Select "Postgres" as the database type
5. Choose your region and plan (Free tier is available)
6. Click "Create"

### 2. Connect Your Project to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Import your GitHub repository
4. Vercel will automatically detect the Next.js framework

### 3. Configure Environment Variables

In your Vercel project settings, add the following environment variables:

1. Database variables (automatically added by Vercel when you connect Postgres):
   - `POSTGRES_URL`
   - `POSTGRES_PRISMA_URL`
   - `POSTGRES_URL_NON_POOLING`
   - `POSTGRES_USER`
   - `POSTGRES_HOST`
   - `POSTGRES_PASSWORD`
   - `POSTGRES_DATABASE`

2. Application variables:
   - `ADMIN_EMAIL`: Your admin email
   - `ADMIN_PASSWORD`: Your admin password
   - `JWT_SECRET`: A secure random string (at least 32 characters)
   - `BLOB_READ_WRITE_TOKEN`: Your Vercel Blob storage token (if using file uploads)
   - `ALLOWED_IPS`: Comma-separated list of allowed IP addresses for IP restriction

### 4. Update Prisma Schema for Production

Before deploying, update your `prisma/schema.prisma` file to use PostgreSQL:

```prisma
datasource db {
  provider  = "postgresql"
  url       = env("POSTGRES_PRISMA_URL") // uses connection pooling
  directUrl = env("POSTGRES_URL_NON_POOLING") // uses a direct connection
}
```

### 5. Deploy Your Application

1. Push your changes to GitHub
2. Vercel will automatically deploy your application
3. During the build process, Prisma will create the database schema

### 6. Initialize the Database

After deployment, you need to run the seed script to populate the database:

1. In your Vercel project, go to the "Deployments" tab
2. Click on the latest deployment
3. Go to the "Functions" tab
4. Use the Vercel CLI to run:

```bash
vercel env pull .env.production.local
npx prisma db push
bun run seed
```

### 7. Configure IP Restriction

The application includes IP-based access restriction via Next.js middleware:

1. In your Vercel project, add an environment variable:
   - `ALLOWED_IPS`: Comma-separated list of allowed IP addresses
2. The middleware will restrict access to only the IPs in this list
3. In development mode, IP restriction is disabled

### 8. Verify Deployment

1. Visit your deployed application URL
2. Test the admin login functionality
3. Verify that IP restriction is working (if configured)
4. Check that video uploads and playback work correctly

## Troubleshooting

### Database Connection Issues
- Verify your environment variables in Vercel
- Check the Prisma logs in your Vercel deployment
- Ensure the database schema is properly migrated

### IP Restriction Not Working
- Verify the `ALLOWED_IPS` environment variable is set correctly
- Check that the middleware is properly configured
- Remember that IP restriction is disabled in development mode

### Build Failures
- Check the build logs in Vercel
- Ensure all dependencies are listed in package.json
- Verify that the Prisma schema is valid

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
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
