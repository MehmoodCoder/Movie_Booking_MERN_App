# MoviefyHub 

**Live Link:** [https://mh56-moviefy-hub.vercel.app](https://mh56-moviefy-hub.vercel.app)

MoviefyHub is a full-stack movie ticket booking application for discovering movies, browsing showtimes, selecting seats, and managing ticket bookings. It combines a React frontend with a Node.js and Express API backed by MongoDB.

## Core Features

- **Authentication and roles:** Clerk handles user sign-in and sessions. Private metadata supports user favorites and role-based admin access, including MainAdmin-only theater request approvals.
- **Movie and show management:** TMDB provides now-playing movies, movie details, cast, and image paths. Admins can schedule shows and manage show listings.
- **Seat selection and bookings:** Users can check seat availability, book seats, and view their bookings and payment status.
- **Stripe payments:** Hosted Stripe Checkout processes payments; Stripe webhooks confirm successful bookings.
- **Background processing:** Inngest synchronizes Clerk users, handles unpaid booking timeouts and seat release, schedules show reminders, and dispatches booking and new-show email tasks.
- **Email notifications:** Nodemailer sends email through SMTP for booking confirmations, reminders, and new show announcements.
- **Admin dashboard:** Admins manage shows and review booking and revenue metrics.

## Tech Stack

- **Frontend:** React 19, Vite, React Router DOM, Tailwind CSS v4, Axios, React Hot Toast, Clerk React
- **Backend:** Node.js, Express 5, Clerk Express, Inngest, Stripe, Nodemailer
- **Database:** MongoDB Atlas with Mongoose
- **External services:** TMDB, Stripe, Clerk, Inngest, SMTP
