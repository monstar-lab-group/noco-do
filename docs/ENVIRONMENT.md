# Environment Variables Configuration

This document outlines all the environment variables required for the Operations Video Platform to function correctly in different environments.

## Required Environment Variables

### Authentication

```
# Admin Authentication
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your-secure-password
```

These variables are used for admin login to the dashboard. They are processed server-side and never exposed to the client.

### Basic Authentication

```
# Basic Authentication for API and Assets
BASIC_AUTH_USERNAME=admin
BASIC_AUTH_PASSWORD=password
```

These variables protect all API endpoints and video assets with Basic Authentication. They are used by the middleware to authenticate requests.

## Setting Up Environment Variables

### Local Development

Create a `.env.local` file in the project root with the required variables:

```
# Admin Authentication
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=password

# Basic Authentication for API and Assets
BASIC_AUTH_USERNAME=admin
BASIC_AUTH_PASSWORD=password
```

### Netlify Deployment

In the Netlify dashboard:

1. Go to **Site settings** > **Build & deploy** > **Environment**
2. Add the required environment variables:
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD`
   - `BASIC_AUTH_USERNAME`
   - `BASIC_AUTH_PASSWORD`

## Troubleshooting

If you encounter 404 errors or authentication issues:

1. Verify all environment variables are correctly set
2. Check that the content directory is properly included in the build
3. Ensure the Netlify build configuration is correct

## Security Considerations

- Never use `NEXT_PUBLIC_` prefix for sensitive variables
- All authentication is handled server-side to prevent credential exposure
- Basic Authentication protects all API endpoints and assets
