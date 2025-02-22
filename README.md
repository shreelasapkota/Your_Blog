# Your Blog

> Your Stories, Our Platform

A blog platform built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 📖 Read Blogs
- 🔍 Search Feature
- ✍️ Create blog posts
- 📱 Responsive

## Quick Start

```bash
# Clone repository
git clone https://github.com/shreelasapkota/Blog.git

# Install dependencies
npm install

# Start development server
npm run dev
```

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS

## Project Structure

```
src/
├── app/              # Next.js app directory
├── components/       # Reusable components
├── types/           # TypeScript definitions
└── public/          # Static files
```

## Creating Posts

1. Navigate to `/create`
2. Fill in title, summary, and content
3. Use markdown editor for rich content
4. Submit to publish

## API
RESTful JSON endpoints: `GET /api/posts` (all posts), `GET /api/posts/${slug}` (single post), `POST /api/posts` (create post with title, summary, content). Responses include post data with slug, title, summary, date, and content fields.

## Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Start production server
```

## Requirements

- Node.js 18+
- npm or yarn

## Contributing

1. Fork repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

