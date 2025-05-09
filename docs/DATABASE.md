# Cross-Platform Database Configuration

This document outlines the database configuration for the noco-do application across different deployment environments.

## Overview

The application is designed to work with multiple database providers and storage solutions, making it compatible with various hosting platforms including Vercel, Netlify, and others.

## Database Providers

The application supports the following database providers:

### PostgreSQL

Recommended for production deployments on Vercel, Netlify, and other cloud platforms.

```env
DATABASE_PROVIDER=postgresql
DATABASE_URL=postgresql://username:password@hostname:5432/database_name
```

### MySQL

Alternative option for production deployments.

```env
DATABASE_PROVIDER=mysql
DATABASE_URL=mysql://username:password@hostname:3306/database_name
```

### SQLite

Primarily for local development and testing.

```env
DATABASE_PROVIDER=sqlite
DATABASE_URL=file:./prisma/dev.db
```

## Environment-Specific Considerations

### Vercel

Vercel works well with PostgreSQL and provides serverless functions that can connect to any database. For optimal performance:

- Use a connection pooling solution like PgBouncer
- Consider Vercel Postgres for seamless integration
- Set appropriate connection limits for serverless functions

Configuration example:
```env
DATABASE_PROVIDER=postgresql
DATABASE_URL=postgresql://username:password@hostname:5432/database_name
STORAGE_PROVIDER=vercel
BLOB_READ_WRITE_TOKEN=your_blob_token_here
```

### Netlify

Netlify functions also work with PostgreSQL but have some differences:

- Netlify doesn't provide a built-in database service like Vercel
- Use external PostgreSQL providers (e.g., Supabase, Neon, Railway)
- Consider connection pooling for serverless functions

Configuration example:
```env
DATABASE_PROVIDER=postgresql
DATABASE_URL=postgresql://username:password@hostname:5432/database_name
STORAGE_PROVIDER=netlify
```

### Other Environments (Traditional Hosting)

For traditional hosting environments:

- Any supported database provider can be used
- Consider using S3 or similar for file storage
- Adjust connection parameters based on the hosting environment

Configuration example:
```env
DATABASE_PROVIDER=postgresql
DATABASE_URL=postgresql://username:password@hostname:5432/database_name
STORAGE_PROVIDER=s3
S3_BUCKET=your-bucket-name
S3_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
```

## Migration and Setup

### Initial Setup

1. Set the appropriate environment variables for your deployment platform
2. Run database migrations:
   ```bash
   npx prisma migrate deploy
   ```
3. Generate Prisma client:
   ```bash
   npx prisma generate
   ```

### Local Development

For local development:

1. Copy `.env.example` to `.env`
2. Configure database settings (SQLite is recommended for simplicity)
3. Run migrations:
   ```bash
   npx prisma migrate dev
   ```
4. Seed the database:
   ```bash
   npm run seed
   ```

## Data Persistence Considerations

### Serverless Environments (Vercel, Netlify)

- Serverless functions have ephemeral file systems
- Avoid using SQLite in production on these platforms
- Use PostgreSQL or MySQL with proper connection management
- Implement connection pooling to avoid connection limits

### Traditional Hosting

- File-based databases like SQLite can be used if the file system is persistent
- Still recommended to use PostgreSQL or MySQL for better scalability
- Adjust database connection parameters based on the hosting environment

## Scaling Considerations

- Use connection pooling for serverless environments
- Consider read replicas for high-traffic applications
- Implement proper indexing for frequently queried fields
- Use caching mechanisms for frequently accessed data
