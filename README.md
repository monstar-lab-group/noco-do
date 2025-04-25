# Operations Video Platform

A comprehensive video management platform built with Next.js, Tailwind CSS, and Vercel Blob. This platform allows operations teams to share training videos, tutorials, and other video content with their organization.

![Operations Video Platform](https://placeholder.svg?height=400&width=800)

## Features

- 📹 **Video Management**: Upload, embed, and manage videos
- 🔍 **Search & Filter**: Find videos by title, description, or category
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile devices
- 🔒 **Admin Dashboard**: Secure admin area for content management
- 📂 **Categories**: Organize videos by category
- 🌓 **Dark Mode**: Toggle between light and dark themes
- 🔄 **Vercel Blob Integration**: Secure and scalable video storage

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes, Server Actions
- **Database**: Prisma ORM with SQLite (can be replaced with PostgreSQL, MySQL, etc.)
- **Storage**: Vercel Blob for video files
- **Authentication**: Custom JWT-based authentication

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Vercel account (for Blob storage)

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/yourusername/operations-video-platform.git
   cd operations-video-platform
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Set up environment variables:
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
   Edit `.env.local` with your own values.

4. Set up the database:
   \`\`\`bash
   npx prisma db push
   \`\`\`

5. Seed the database with initial data:
   \`\`\`bash
   npm run seed
   \`\`\`

6. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

7. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

See `.env.example` for all required environment variables.

## Deployment

### Deploy on Vercel

The easiest way to deploy the application is to use the [Vercel Platform](https://vercel.com).

1. Push your code to a Git repository (GitHub, GitLab, BitBucket)
2. Import the project in Vercel
3. Set the required environment variables
4. Deploy

## Project Structure

\`\`\`
operations-video-platform/
├── app/                  # Next.js App Router
│   ├── admin/            # Admin dashboard pages
│   ├── api/              # API routes
│   ├── video/            # Video pages
│   └── page.tsx          # Home page
├── components/           # React components
├── lib/                  # Utility functions and libraries
├── prisma/               # Prisma schema and migrations
├── public/               # Static assets
├── scripts/              # Scripts for database seeding, etc.
└── types/                # TypeScript type definitions
\`\`\`

## Admin Access

After running the seed script, you can log in to the admin dashboard with:

- Email: The email specified in your `.env.local` file (ADMIN_EMAIL)
- Password: The password specified in your `.env.local` file (ADMIN_PASSWORD)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
\`\`\`

Now, let's create a comprehensive .env.example file:
# noco-do
