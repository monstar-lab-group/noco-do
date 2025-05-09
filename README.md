# Operations Video Platform

A comprehensive video management platform built with Next.js, Tailwind CSS, and Markdown-based content management. This platform allows operations teams to share training videos, tutorials, and other video content with their organization.

[![Netlify Status](https://api.netlify.com/api/v1/badges/ca9bdd5f-60f7-4c95-8d00-4b53cba803ed/deploy-status)](https://app.netlify.com/sites/timely-kitten-24e694/deploys)

![Operations Video Platform](https://placeholder.svg?height=400&width=800)

## Features

- 📹 **Video Management**: Upload, embed, and manage videos
- 🔍 **Search & Filter**: Find videos by title, description, or category
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile devices
- 🔒 **Admin Dashboard**: Secure admin area for content management
- 📂 **Categories**: Organize videos by category
- 🌓 **Dark Mode**: Toggle between light and dark themes
- 🔐 **Basic Authentication**: Protect all assets and API endpoints
- 📝 **Markdown Content**: Simple file-based content management

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes, Server Actions
- **Content Management**: Markdown files with frontmatter
- **Package Manager**: Bun
- **Authentication**: Basic Authentication via middleware
- **Deployment**: Netlify-ready configuration

## Getting Started

### Prerequisites

- Node.js 18+ or Bun 1.0+

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/operations-video-platform.git
   cd operations-video-platform
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your own values.

4. Start the development server:
   ```bash
   bun dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

```
# Admin Authentication
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your-secure-password

# Basic Authentication for API and Assets
BASIC_AUTH_USERNAME=admin
BASIC_AUTH_PASSWORD=password
```

## Content Management

This platform uses a Markdown-based content management system. Videos and their metadata are stored as Markdown files in the `content/videos/` directory.

### Markdown File Structure

Each video is represented by a Markdown file with frontmatter:

```markdown
---
title: "Video Title"
description: "Video description"
videoUrl: "https://example.com/video.mp4"
thumbnailUrl: "/path/to/thumbnail.jpg"
type: "embed"
publishedAt: "2023-01-15"
---

# Video Title

This is the content of the video page.

## Key Topics

- Topic 1
- Topic 2
```

### Adding New Videos

To add a new video:

1. Create a new Markdown file in `content/videos/`
2. Add the required frontmatter
3. Add the content for the video page

## Deployment

### Deploy on Netlify

The project includes a `netlify.toml` configuration file for easy deployment on Netlify:

1. Push your code to a Git repository (GitHub, GitLab, BitBucket)
2. Import the project in Netlify
3. Set the required environment variables
4. Deploy

### Basic Authentication

All API endpoints and video assets are protected with Basic Authentication. Configure the authentication credentials using the environment variables:

```
BASIC_AUTH_USERNAME=admin
BASIC_AUTH_PASSWORD=password
```

## Project Structure

```
operations-video-platform/
├── app/                  # Next.js App Router
│   ├── admin/            # Admin dashboard pages
│   ├── api/              # API routes
│   ├── video/            # Video pages
│   └── page.tsx          # Home page
├── components/           # React components
├── content/              # Markdown content files
│   └── videos/           # Video markdown files
├── lib/                  # Utility functions and libraries
│   └── markdown.ts       # Markdown parsing utilities
├── middleware.ts         # Basic Authentication middleware
├── public/               # Static assets
└── types/                # TypeScript type definitions
```

## Admin Access

You can log in to the admin dashboard with:

- Email: The email specified in your `.env.local` file (ADMIN_EMAIL)
- Password: The password specified in your `.env.local` file (ADMIN_PASSWORD)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
