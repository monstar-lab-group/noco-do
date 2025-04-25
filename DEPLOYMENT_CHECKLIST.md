# Deployment Checklist for noco-do

This checklist ensures all necessary steps are completed for a successful deployment to Vercel.

## Pre-Deployment

- [ ] Merge PR #3 (Add Testing Infrastructure and Fix Missing Types)
- [ ] Create a Vercel account (if not already done)
- [ ] Create a Vercel Postgres database (free tier available)
- [ ] Connect your GitHub repository to Vercel

## Environment Variables

Add the following environment variables in Vercel:

### Database Variables (automatically added by Vercel)
- [ ] `POSTGRES_URL`
- [ ] `POSTGRES_PRISMA_URL`
- [ ] `POSTGRES_URL_NON_POOLING`
- [ ] `POSTGRES_USER`
- [ ] `POSTGRES_HOST`
- [ ] `POSTGRES_PASSWORD`
- [ ] `POSTGRES_DATABASE`

### Application Variables
- [ ] `ADMIN_EMAIL` - Your admin email
- [ ] `ADMIN_PASSWORD` - Your admin password
- [ ] `JWT_SECRET` - A secure random string (at least 32 characters)
- [ ] `BLOB_READ_WRITE_TOKEN` - Your Vercel Blob storage token (if using file uploads)
- [ ] `ALLOWED_IPS` - Comma-separated list of allowed IP addresses for IP restriction

## Code Updates

- [ ] Update `prisma/schema.prisma` to use PostgreSQL:
  ```prisma
  datasource db {
    provider  = "postgresql"
    url       = env("POSTGRES_PRISMA_URL")
    directUrl = env("POSTGRES_URL_NON_POOLING")
  }
  ```
- [ ] Commit and push the schema changes to your repository

## Deployment

- [ ] Deploy your application through Vercel dashboard
- [ ] Wait for the build to complete successfully
- [ ] Run database migrations:
  ```bash
  vercel env pull .env.production.local
  npx prisma db push
  bun run seed
  ```

## Post-Deployment Verification

- [ ] Visit your deployed application URL
- [ ] Test admin login functionality
- [ ] Verify IP restriction is working (if configured)
- [ ] Test video upload functionality
- [ ] Test video playback functionality
- [ ] Check that all pages load correctly

## Troubleshooting

If you encounter issues:
- [ ] Check Vercel deployment logs
- [ ] Verify all environment variables are set correctly
- [ ] Ensure database connection is working
- [ ] Check browser console for client-side errors
- [ ] Review server logs for API errors

## Documentation

- [ ] Review `DEPLOYMENT_GUIDE.md` for detailed instructions
- [ ] Review `VERCEL_MIGRATION.md` for database migration details
- [ ] Review `DATABASE_SWITCHING.md` for switching between SQLite and PostgreSQL
