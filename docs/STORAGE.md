# Cross-Platform Storage Configuration

This document outlines the file storage configuration for the noco-do application across different deployment environments.

## Overview

The application supports multiple storage providers, making it compatible with various hosting platforms including Vercel, Netlify, and others.

## Storage Providers

### Vercel Blob Storage

Vercel Blob is the default storage provider when deploying to Vercel.

```env
STORAGE_PROVIDER=vercel
BLOB_READ_WRITE_TOKEN=your_blob_token_here
```

### Netlify Large Media

For Netlify deployments, the application can use Netlify Large Media for file storage.

```env
STORAGE_PROVIDER=netlify
```

### S3-Compatible Storage

For other environments or when more control is needed, S3-compatible storage can be used.

```env
STORAGE_PROVIDER=s3
S3_BUCKET=your-bucket-name
S3_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
```

## Environment-Specific Considerations

### Vercel

Vercel Blob provides a simple and integrated solution for file storage:

- No additional setup required beyond providing the BLOB_READ_WRITE_TOKEN
- Files are stored in Vercel's CDN for fast delivery
- Automatic scaling and no maintenance required

### Netlify

Netlify Large Media uses Git LFS for file storage:

- Requires Netlify CLI and Git LFS setup
- Files are versioned alongside your code
- Good for smaller applications with moderate file storage needs

### Other Environments

S3-compatible storage provides the most flexibility:

- Works with AWS S3, MinIO, DigitalOcean Spaces, etc.
- Requires more configuration but offers more control
- Suitable for applications with high storage requirements

## Implementation Details

The application uses a storage abstraction layer that automatically selects the appropriate provider based on the `STORAGE_PROVIDER` environment variable.

### Key Functions

- `uploadFile(file)`: Uploads a file using the configured storage provider
- `deleteFile(url)`: Deletes a file using the configured storage provider
- `generateThumbnail(videoFile)`: Generates a thumbnail for a video file

### Adding a New Storage Provider

To add a new storage provider:

1. Create a new class that implements the `StorageProvider` interface in `lib/storage.ts`
2. Add the new provider to the `getStorageProvider` factory function
3. Update the environment variable documentation

## Local Development

For local development, the application defaults to using Vercel Blob if no storage provider is specified. To use a different provider locally:

1. Set the appropriate environment variables in your `.env` file
2. Install any required dependencies for the chosen provider
3. Run the application with `npm run dev`

## Migrating Between Storage Providers

When migrating between storage providers:

1. Set up the new storage provider
2. Use a migration script to copy files from the old provider to the new one
3. Update the environment variables to use the new provider
4. Verify that all files are accessible through the new provider

## Scaling Considerations

- Vercel Blob and S3 automatically scale with your application
- Netlify Large Media has some limitations for very large files or high-volume applications
- Consider implementing caching mechanisms for frequently accessed files
- Use a CDN for improved global performance
