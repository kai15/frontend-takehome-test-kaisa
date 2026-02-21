# Course Platform — Frontend Take-Home

A web app for browsing and viewing course details with search, category filters, and a per-course comment system. Built with React, TypeScript, and Vite.

## Features

- **Course listing** — Grid of course cards with image, title, category, rating, and duration
- **Search & filter** — Search by title and filter by category
- **Pagination** — Page navigation for the course list (6 items per page)
- **Course detail** — Detail page with full description, metadata (author, level, duration), and comment section
- **Comments** — Add comments, like/unlike, sort (newest / oldest / most liked); data persisted in `localStorage`
- **Dark mode** — Light/dark theme toggle
- **Responsive** — Layout adapts to mobile, tablet, and desktop
- **Animations** — Transitions and animations with Framer Motion

## Tech Stack

| Area      | Technology              |
|-----------|-------------------------|
| Framework | React 19                |
| Build     | Vite 7                  |
| Language  | TypeScript              |
| Styling   | Tailwind CSS v4         |
| Routing   | React Router v7        |
| Animation | Framer Motion           |
| Icons     | Lucide React            |
| Data      | Static JSON + localStorage |

## Prerequisites

- **Node.js** (v18+ recommended)
- **npm** or **pnpm**

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Other scripts

```bash
# Production build
npm run build

# Preview production build
npm run preview

# Lint
npm run lint
```

## Project Structure (overview)

```
src/
├── components/     # Reusable components (Header, CourseCard, CommentCard, Pagination, etc.)
├── data/           # data.json — course list & categories
├── pages/          # Home (course list), CourseDetail (detail + comments)
├── types/          # TypeScript types (Course, Comment, User)
├── App.tsx
└── index.css       # Global styles + Tailwind
```

## Routes & Flow

| Route         | Description |
|---------------|-------------|
| `/`           | Home: course list, search, filter, pagination |
| `/course/:id` | Course detail + comments (add, like, sort)    |

Course data is loaded from `src/data/data.json`. Comments and likes per course are stored in `localStorage` (keys: `comments-{courseId}`, `likedComment-{courseId}`). To try the comment feature, use the “Set name” modal (or the existing name/login flow) so comments have a user name.

## License

Private — for take-home test purposes.
