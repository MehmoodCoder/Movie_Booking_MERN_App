# MoviefyHub

🎬🎟️🍿 MoviefyHub is a full-stack movie ticket booking application. Browse movies and showtimes, select seats, pay through Stripe Checkout, and manage bookings with a React and Vite frontend and an Express, MongoDB, and Node.js backend.

---

## 🚀 Features

- **Authentication & User Management:** Sign-in and session handling through Clerk, with private user metadata used for admin roles and favorites.
- **Movie Discovery:** Now-playing movies, movie details, cast information, posters, and backdrops fetched from TMDB.
- **Showtime & Seat Selection:** Browse upcoming shows, select seats, and check occupied seats before creating a booking.
- **Stripe Checkout:** Create hosted Checkout Sessions and confirm completed payments through a Stripe webhook.
- **Booking Management:** View bookings, payment status, seat selections, and booking details.
- **Admin Dashboard:** Regular admins manage their own shows and review bookings and revenue associated with those shows; MainAdmin can view platform-wide shows, bookings, and revenue.
- **MainAdmin Theater Requests:** Users can request admin access by submitting theater details. A `main-admin` can approve or reject requests; approval assigns the regular `admin` role.
- **Background Jobs & Email:** Inngest handles Clerk user sync events, payment timeout cleanup, scheduled reminders, booking confirmations, and new-show email notifications.
- **Responsive Interface:** React, Tailwind CSS, React Router, and React Hot Toast provide the movie browsing and booking experience.

---

## 🛠️ Tech Stack

- **Frontend:** React 19, Vite, React Router DOM, Tailwind CSS v4, Axios, React Hot Toast, Clerk React, Lucide React
- **Backend:** Node.js, Express.js v5, Mongoose, Clerk Express, Inngest, Stripe SDK, Nodemailer, Axios, CORS, Dotenv, Nodemon
- **Database:** MongoDB Atlas with Mongoose
- **Authentication:** Clerk session authentication and private metadata role checks
- **Movie Data:** TMDB API
- **Payments:** Stripe Checkout Sessions and Stripe webhooks
- **Email:** Nodemailer using an SMTP provider
- **Version Control:** Git and GitHub
- **Deployment:** Frontend and backend can be deployed independently; configure public backend and Inngest endpoints for production

---

## ✨ Features

- 🏗️ **Full-Stack MERN Architecture** – React and Vite client connected to an Express REST API and MongoDB Atlas.
- ⚡ **Axios API Integration** – Shared client requests to the configured backend URL.
- 🔐 **Clerk Authentication & Access Control** – Clerk provides sign-in and bearer tokens; server middleware checks private metadata roles for protected routes.
- 👑 **Role-Based Admin Access** – `admin` and `main-admin` can use admin tools. Only `main-admin` can approve or reject theater-admin requests.
- 🎞️ **TMDB Movie Catalog** – Backend requests now-playing lists, movie information, and credits; movie data is stored in MongoDB when a show is created.
- 📅 **Showtimes & Seat Availability** – Browse scheduled shows and verify seat availability before booking.
- 💳 **Stripe Checkout & Webhooks** – The backend creates hosted Checkout Sessions; the webhook marks successful bookings paid and triggers confirmation email work.
- 📧 **Inngest and Nodemailer Workflows** – Background handlers synchronize Clerk users, remove unpaid bookings and release seats, send booking confirmations, prepare show reminders, and announce new shows.
- 📊 **Admin Dashboard** – Review booking and revenue totals, active shows, bookings, and show management tools.
- 🗄️ **MongoDB & Mongoose Models** – Persist users, movies, shows, bookings, and theater-admin requests.
- 🌐 **Dynamic Client-Side Routing** – React Router powers home, movie details, seat selection, bookings, favorites, and admin pages.
- 🎨 **Responsive UI** – Tailwind CSS v4 and React Hot Toast provide responsive layout and user feedback.
- ⚙️ **Environment-Based Configuration** – Keep client and server configuration in separate `.env` files. Never commit real credentials.
- ⚡ **Developer Workflow** – Vite serves the client and Nodemon restarts the Express server during development.

---

## Prerequisites

- **Node.js:** Use a current LTS version compatible with Vite 8 (Node.js 20.19+ or 22.12+).
- **npm** package manager
- A **MongoDB Atlas** cluster or local MongoDB instance
- A **Clerk** application
- A **TMDB** API account and API Read Access Token
- A **Stripe** account (test mode is suitable for local development)
- An **Inngest** account for deployed background processing
- An **SMTP** account or SMTP relay for email delivery

---

### 💳 Payment Gateway Testing (Stripe Test Cards)

This project creates Stripe-hosted Checkout Sessions. Use Stripe test-mode cards while your Stripe account and server use test credentials:

#### 1. Successful Transaction (Default Card)

- **Card Number:** `4242 4242 4242 4242`
- **Expiry Date (MM / YY):** Any future date
- **CVC:** `123`
- **Postal / ZIP Code:** Any valid test postal code

#### 2. Payment Edge Cases & Failure Testing

| Test Scenario            | Card Number           | Expected Behavior                  |
| :----------------------- | :-------------------- | :--------------------------------- |
| **Generic Card Decline** | `4000 0000 0000 0002` | Stripe reports a card decline      |
| **Insufficient Funds**   | `4000 0000 0000 9995` | Stripe reports insufficient funds  |
| **Expired Card**         | `4000 0000 0000 0069` | Stripe reports an expired card     |
| **Incorrect CVC**        | `4000 0000 0000 0127` | Stripe reports a CVC check failure |

Use only test card numbers with Stripe test keys. Do not use real payment details for testing.

---

## 📂 Project Directory Structure


**Generated:** 10/11/2026, 11:23:13 AM
**Root Path:** `workspace\Movie_Booking_MERN_App`

```
├── 📁 client
│   ├── 📁 public
│   │   ├── 🖼️ HeroImg.png
│   │   └── 🖼️ favicon.svg
│   ├── 📁 src
│   │   ├── 📁 assets
│   │   │   ├── 📄 assets.js
│   │   │   ├── 🖼️ logo.svg
│   │   │   ├── 🖼️ marvelLogo.svg
│   │   │   └── 🖼️ screenImage.svg
│   │   ├── 📁 components
│   │   │   ├── 📁 admin
│   │   │   │   ├── 📄 AdminNavBar.jsx
│   │   │   │   ├── 📄 AdminSideBar.jsx
│   │   │   │   └── 📄 Title.jsx
│   │   │   ├── 📄 BlurCircle.jsx
│   │   │   ├── 📄 DateSelect.jsx
│   │   │   ├── 📄 FeaturedSection.jsx
│   │   │   ├── 📄 Footer.jsx
│   │   │   ├── 📄 Hero.jsx
│   │   │   ├── 📄 Loading.jsx
│   │   │   ├── 📄 MovieCard.jsx
│   │   │   ├── 📄 NavBar.jsx
│   │   │   └── 📄 TrailerSection.jsx
│   │   ├── 📁 context
│   │   │   └── 📄 AppContext.jsx
│   │   ├── 📁 lib
│   │   │   ├── 📄 dateFormat.js
│   │   │   ├── 📄 isoTimeFormat.js
│   │   │   ├── 📄 kConverter.js
│   │   │   └── 📄 timeFormat.js
│   │   ├── 📁 pages
│   │   │   ├── 📁 admin
│   │   │   │   ├── 📄 AddShows.jsx
│   │   │   │   ├── 📄 Dashboard.jsx
│   │   │   │   ├── 📄 Layuot.jsx
│   │   │   │   ├── 📄 ListBookings.jsx
│   │   │   │   ├── 📄 ListShows.jsx
│   │   │   │   └── 📄 TheaterRequests.jsx
│   │   │   ├── 📄 Favorite.jsx
│   │   │   ├── 📄 Home.jsx
│   │   │   ├── 📄 MovieDetails.jsx
│   │   │   ├── 📄 Movies.jsx
│   │   │   ├── 📄 MyBookings.jsx
│   │   │   └── 📄 SeatLayout.jsx
│   │   ├── 📄 App.jsx
│   │   ├── 🎨 index.css
│   │   └── 📄 main.jsx
│   ├── ⚙️ .gitignore
│   ├── 📝 README.md
│   ├── 📄 eslint.config.js
│   ├── 🌐 index.html
│   ├── ⚙️ package-lock.json
│   ├── ⚙️ package.json
│   ├── ⚙️ vercel.json
│   └── 📄 vite.config.js
├── 📁 server
│   ├── 📁 config
│   │   ├── 📄 db.js
│   │   └── 📄 nodemailer.js
│   ├── 📁 controllers
│   │   ├── 📄 AdminController.js
│   │   ├── 📄 BookingController.js
│   │   ├── 📄 ShowsController.js
│   │   ├── 📄 StripeWebHook.js
│   │   ├── 📄 TheaterAdminController.js
│   │   └── 📄 UserController.js
│   ├── 📁 inngest
│   │   └── 📄 index.js
│   ├── 📁 middlewares
│   │   └── 📄 auth.js
│   ├── 📁 models
│   │   ├── 📄 BookingModel.js
│   │   ├── 📄 MovieModel.js
│   │   ├── 📄 ShowsModel.js
│   │   ├── 📄 TheaterAdminRequestModel.js
│   │   └── 📄 UserModel.js
│   ├── 📁 routes
│   │   ├── 📄 AdminRouter.js
│   │   ├── 📄 BookingRoutes.js
│   │   ├── 📄 ShowsRoutes.js
│   │   ├── 📄 TheaterAdminRouter.js
│   │   └── 📄 UserRouter.js
│   ├── ⚙️ package-lock.json
│   ├── ⚙️ package.json
│   ├── 📄 server.js
│   └── ⚙️ vercel.json
├── ⚙️ .gitignore
└── 📝 README.md
```

---

## 🌐 Deployment & Environment Setup

### 1. MongoDB Atlas Configuration

1. Create or select a MongoDB Atlas project and cluster.
2. Create a database user with a strong password and only the permissions the application needs.
3. Add the IP addresses of your development machine and backend host to **Network Access**. Avoid allowing access from anywhere unless you understand and accept the exposure.
4. Copy the cluster connection URI into the backend `MONGO_URI`.
5. The current server appends `/moviefyhub` to `MONGO_URI`; use the cluster URI without an existing database path or query string so the database name is not duplicated.

---

### 2. Environment Variables on Vercel

Set environment variables in each deployment provider's project settings:

1. Add `VITE_` variables to the frontend project and backend variables to the backend project.
2. Configure the values for the required environments (Development, Preview, and Production when applicable).
3. Keep secret keys private. Do not add them to source control, frontend variables, screenshots, or public build configuration.
4. `VITE_` variables are bundled into the browser application and are not secret. Only use them for publishable keys, public URLs, currency, and image URLs.
5. Redeploy after changing deployment environment variables.

#### Frontend (`client/.env`)

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...____
VITE_CURRENCY=$
VITE_BASE_URL=Backend Live link
VITE_TMDB_IMAGE_BASE_URL=tmdb base img url
```

#### Backend (`server/.env`)

```env
PORT=port
MONGO_URI=MongoDB URI
CLERK_PUBLISHABLE_KEY=pk_test_....___
CLERK_SECRET_KEY=sk_test_..___
INNGEST_EVENT_KEY=inngest event key
INNGEST_SIGNIN_KEY=signkey-prod-_______
TMDB_API_KEY=api kay
STRIPE_SECRET_KEY=sk_test_...___
STRIPE_PUBLISHABLE_KEY=pk_test_....___
STRIPE_WEBHOOK_SECRET=whsec_...___
SMTP_HOST=smtp.host.com
SMTP_PORT=587
SMTP_USER=owner_email@host.com
SMTP_PASS=smtp-password
SENDER_EMAIL=owner_email@host.com
```

The snippets above are the requested templates; replace placeholder values with credentials from the corresponding service. The `TMDB_API_KEY` setting is used by the backend as a TMDB Bearer token, so provide the TMDB API Read Access Token expected by the current request code. `STRIPE_PUBLISHABLE_KEY` is included in the template, although the current application creates hosted Checkout Sessions on the backend and does not use that key in the client.

The requested `INNGEST_SIGNIN_KEY` spelling is retained exactly in the template. Confirm the signing-key variable name expected by your Inngest deployment and SDK configuration before deploying; Inngest commonly refers to its signing key as `INNGEST_SIGNING_KEY`.

---

### 3. Deploy to Vercel

1. Push the project to GitHub without committing either `.env` file.
2. Create a frontend deployment from the repository's `client` directory.
3. Set the frontend build command to `npm run build` and output directory to `dist` (Vite default).
4. Set the frontend environment variables listed above. `VITE_BASE_URL` must point to the deployed backend origin.
5. Deploy the Express backend as its own service and set the backend environment variables. The server must be reachable over HTTPS by the client and Stripe.
6. Configure the Stripe webhook endpoint to reach the backend's `/api/stripe` endpoint. Use the webhook signing secret for that specific endpoint in `STRIPE_WEBHOOK_SECRET`.
7. Configure the Inngest application to reach the backend's `/api/inngest` endpoint and synchronize the registered functions.
8. Configure Clerk's allowed origins and production keys for the deployed frontend and backend.
9. Redeploy both services after changing environment variables.

> 💡 The repository contains a Vite client and a standalone Express server. Deploy them using providers/settings that support their respective runtimes; do not assume that selecting the repository root will automatically deploy both. Inngest and Stripe require public, correctly configured backend endpoints.

```text
Project_Folder/
├── client/
└── server/
```

---

# 📦 MERN Stack: Frontend Architecture Setup Guide

This guide covers running the existing MoviefyHub frontend and connecting it to Clerk and the Express API. The frontend is already scaffolded; do not initialize a second Vite project in this repository.

## 1. Initialize Vite Project

Run the following command in your terminal:

```bash
npm init vite
```

### During the prompt configuration, fill out the selections exactly like this:

Proceed? y

Project Name: name

Package Name: name

Select a framework: React

Select a variant: JavaScript

Select oxlintrc? Yes

Install with npm? Yes

---

### 💻 How to Run the frontend of the MERN Project Locally

From the repository root:

```bash
cd client
npm install
npm run dev
```

Before starting Vite, create `client/.env` and set its values using the frontend environment template above. Point `VITE_BASE_URL` to the backend, for example `http://localhost:5000`, and use the TMDB image base URL appropriate for the poster size used by the UI (for example `https://image.tmdb.org/t/p/w500`).

---

## 2. Installing Core Dependencies for MERN Stack Backend

The frontend dependencies are declared in `client/package.json` and installed by `npm install`. The current project uses:

```text
@clerk/react
react-router-dom
@tailwindcss/vite
tailwindcss
react-hot-toast
axios
lucide-react
react
react-dom
```

No additional package installation is needed for a normal checkout. To inspect the exact installed dependency versions, refer to `client/package.json` and `client/package-lock.json`.

**It automatically Create package.json if not exists. Like**

**The existing `client/package.json` includes scripts for development, build, lint, and preview:**

```json
{
  "name": "client",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@clerk/react": "^6.17.5",
    "@tailwindcss/vite": "^4.3.3",
    "axios": "^1.20.0",
    "lucide-react": "^1.51.0",
    "react": "^19.2.8",
    "react-dom": "^19.2.8",
    "react-hot-toast": "^2.6.1",
    "react-player": "^3.4.0",
    "react-router-dom": "^7.18.4",
    "tailwindcss": "^4.3.3"
  },
  "devDependencies": {
    "@eslint/js": "^10.0.1",
    "@types/react": "^19.2.18",
    "@types/react-dom": "^19.2.7",
    "@vitejs/plugin-react": "^6.1.1",
    "eslint": "^10.10.0",
    "eslint-plugin-react-hooks": "^7.1.1",
    "eslint-plugin-react-refresh": "^0.5.6",
    "globals": "^17.12.0",
    "vite": "^8.3.0"
  }
}
```

**Note:** Use the existing lockfile with `npm install`; avoid replacing the package manifest with copied dependency versions.

---

**Note:** Install packages when needed

---

### Installing Tailwind CSS v4 (Vite)

```bash
npm install tailwindcss @tailwindcss/vite
```

Add plugin to `vite.config.js`:

```js
import tailwindcss from "@tailwindcss/vite";

export default {
  plugins: [tailwindcss()],
};
```

Add to `index.css`:

```css
@import "tailwindcss";
```

### Setting Up React Router v7 (via `create-react-router`)

Installed using the official React Router CLI as per [reactrouter.com](https://reactrouter.com):

```bash
npx create-react-router@latest
cd my-project
npm run dev
```

Or add to an existing Vite project:

```bash
npm install react-router-dom
```

### Will add guide how to install and configure clerk

---

### Setting Up Clerk Authentication

1. Create a Clerk application and configure its sign-in methods and allowed origins.
2. Copy the Clerk publishable key into `VITE_CLERK_PUBLISHABLE_KEY` in `client/.env`.
3. Copy the matching publishable key and secret key into `CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` in `server/.env`.
4. The frontend initializes `ClerkProvider` in `client/src/main.jsx`; the backend enables `clerkMiddleware()` in `server/server.js`.
5. Authenticated requests use Clerk session tokens. Server middleware checks Clerk private metadata for protected admin operations.
6. To configure the privileged theater approval account, set that account's private metadata role to `main-admin`. Approved applicants receive the `admin` role; only `main-admin` can review theater requests.
7. If using Clerk webhooks for user synchronization, configure the Clerk-to-Inngest event integration so the Inngest functions receive `clerk/user.created`, `clerk/user.updated`, and `clerk/user.deleted` events.

---

# 📦 MERN Stack: Backend Architecture Setup Guide

## 1. Installing Node.js & NPM

Install a current Node.js LTS release compatible with the Vite frontend and backend dependencies from the [Node.js Official Site](https://nodejs.org/).

Verify installation in your terminal:

```bash
node -v
npm -v
```

## 2. Installing MongoDB Community Server & Mongosh

MoviefyHub can use MongoDB Atlas or a local MongoDB service.

1. For Atlas, create a cluster, database user, and network access rule, then place the connection URI in `MONGO_URI`.
2. For a local database, install MongoDB Community Server and MongoDB Shell (`mongosh`).
3. Verify a local shell connection with:

```bash
mongosh
```

The server connects with Mongoose and uses the `moviefyhub` database name appended to `MONGO_URI`.

## 3. Setting Up `package.json` with ES Modules

Initialize your Node project inside any project directory:

```bash
npm init
```

### During the prompt configuration, fill out the selections like this:

package name: (name)

version: (1.0.0)

description: may add
​
entry point: (server.js)​

test command: just enter​

git repository: (https://github.com/username/repo_name.git)

keywords: may add

author: may add

license: (ISC) may be MIT for open source

type: (commonjs) recommended module

Is this OK? (yes)

---

### 💻 How to Run the backend of the MERN Project Locally

If you want to pull this project and run it again locally, simply execute these commands:

```bash
# Navigate to the project folder
cd Project_dir

# create node_modules folder by running this command
npm i

# Start the local development server
npm start
```

---

The existing `server/package.json` declares `"type": "module"` and starts `server.js`; do not replace it with a newly generated package file.

---

```json
{
  "name": "node",
  "version": "1.0.0",
  "bugs": {
    "url": "https://github.com/username/repo/issues"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/username/repo.git"
  },
  "license": "ISC",
  "author": "",
  "type": "commonjs",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node app.js" // add manually write "nodemon index.js" if installed
  }
}
```

---

## 4. Installing Core Dependencies for MERN Stack Backend

Run this command inside your project directory to install npm pakages in pakages.json file:

```bash
npm i express
npm i mongoose
npm i nodemon
npm i cors
npm i dotenv
npm i cloudinary
npm i svix
npm i multer
npm i @clerk/express
npm i stripe
bpm i nodemailer
```

**It automatically Create package.json if not exists. Like**

```json
{
  "name": "server",
  "version": "1.0.0",
  "description": "",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "keywords": [],
  "type": "module",
  "dependencies": {
    "@clerk/express": "^2.1.76",
    "axios": "^1.20.0",
    "cloudinary": "^2.11.0",
    "cors": "^2.8.6",
    "dotenv": "^18.0.6",
    "express": "^5.2.1",
    "inngest": "^4.22.0",
    "mongoose": "^9.11.0",
    "nodemailer": "^10.1.0",
    "nodemon": "^3.1.14",
    "stripe": "^23.0.0",
    "svix": "^2.8.0"
  }
}
```

**Note:** `npm install` uses the versions recorded in `server/package-lock.json`. Do not install duplicate or unrelated packages just to reproduce this documentation.

---

## 🔌 Service Setup

### TMDB API

1. Create a TMDB account and obtain an API Read Access Token.
2. Set that token as `TMDB_API_KEY` in `server/.env`. The backend sends it in the TMDB `Authorization: Bearer` header.
3. The server requests now-playing data and movie details/credits when an admin adds a show. Movie details, cast, and poster/backdrop paths are stored in MongoDB.
4. Set `VITE_TMDB_IMAGE_BASE_URL` in `client/.env` to the TMDB image base URL and a suitable image size. The client appends the stored poster path to it.

Read the [TMDB API documentation](https://developer.themoviedb.org/docs) and follow its attribution and usage requirements.

### Stripe Checkout, Webhooks, and Payment Processing

1. Use Stripe test mode for local development and set the server's `STRIPE_SECRET_KEY`.
2. The booking endpoint creates a hosted Stripe Checkout Session and stores its URL with the booking.
3. Configure the Stripe webhook endpoint as `<BACKEND_URL>/api/stripe`; webhook events must be sent as raw request bytes so signature verification works.
4. Set `STRIPE_WEBHOOK_SECRET` to the signing secret for that webhook endpoint. Do not use the webhook secret as an API key.
5. The webhook handles successful payment events, marks the booking as paid, and sends an Inngest booking-confirmation event.
6. Stripe Checkout currently uses USD in the backend. `VITE_CURRENCY` controls the currency label shown in the interface; change backend payment currency logic separately if the actual charged currency needs to change.
7. The Checkout Session is created with a 30-minute expiration. The current Inngest seat/booking cleanup waits 10 minutes before checking for payment; align these timeouts in code if the intended reservation window should be 30 minutes.

Use Stripe's [webhook testing guide](https://docs.stripe.com/webhooks) and the Stripe CLI to forward test events to the local backend.

### Inngest Background Functions

The server exposes the Inngest handler at `/api/inngest` and registers the functions from `server/inngest/index.js`. Configure the Inngest app to sync against the publicly reachable backend endpoint.

The current functions include:

- Clerk user creation, update, and deletion synchronization events.
- Payment-timeout processing that checks whether a booking was paid and releases held seats/removes an unpaid booking.
- Booking confirmation email handling after the Stripe webhook emits `app/show.booked`.
- A scheduled show reminder function configured with an eight-hour cron interval.
- New-show announcement emails triggered by `app/show.added`.

Configure the Inngest event and signing credentials in the backend deployment environment. Confirm the signing-key variable name against the active Inngest environment. For local development, use the Inngest Dev Server or the currently supported local workflow in the [Inngest documentation](https://www.inngest.com/docs).

**Reminder implementation note:** The reminder function currently filters the show model using `showTime`, while the show schema stores `showDateTime`. Verify or update that field mapping before relying on scheduled reminders in production.

### NodeMailer / SMTP

The shared Nodemailer transporter in `server/config/nodemailer.js` uses:

- `SMTP_HOST` and `SMTP_PORT` for the SMTP server.
- `SMTP_USER` and `SMTP_PASS` for SMTP authentication.
- `SENDER_EMAIL` for the message sender.

Use a provider-supported secure SMTP configuration, keep credentials only in the backend environment, and ensure the sender address is permitted by the provider. Inngest functions use this transporter for booking confirmations, show reminders, and new-show announcements.

---

## 📚 Modern Full-Stack Learning Resources

### ⚛️ Frontend Framework & Build Tools

- [React Documentation](https://react.dev) — _(React components, state, and hooks)_
- [Vite Guide](https://vite.dev) — _(Frontend development server and production builds)_
- [React Router Documentation](https://reactrouter.com) — _(Client-side routes and navigation)_
- [Tailwind CSS Documentation](https://tailwindcss.com) — _(Utility-first styling and responsive layouts)_

### 🔑 Authentication & User Management

- [Clerk Documentation](https://clerk.com/docs) — _(React authentication, Express middleware, sessions, and user metadata)_

### 🐍 Backend & REST APIs

- [Express Documentation](https://expressjs.com) — _(Node.js web framework and HTTP routing)_
- [Inngest Documentation](https://www.inngest.com/docs) — _(Event-driven background functions, cron jobs, and local development)_
- [Axios Documentation](https://axios-http.com) — _(HTTP requests for browser and Node.js applications)_

### 🎥 Movie Data & Payments

- [TMDB API Documentation](https://developer.themoviedb.org/docs) — _(Movie metadata, now-playing lists, credits, and image paths)_
- [Stripe Documentation](https://docs.stripe.com) — _(Checkout Sessions, payments, test mode, and webhooks)_

### ✉️ Email & Background Delivery

- [Nodemailer Documentation](https://nodemailer.com) — _(SMTP-based email transport for Node.js)_
- [Inngest Documentation](https://www.inngest.com/docs) — _(Reliable background execution and scheduled jobs)_

### 🍃 Database & Package Management

- [MongoDB Manual](https://www.mongodb.com/docs/) — _(MongoDB documents, indexes, and CRUD operations)_
- [Mongoose Documentation](https://mongoosejs.com/docs/) — _(MongoDB schemas, models, and queries for Node.js)_
- [NPM Documentation](https://docs.npmjs.com) — _(Node package manager and lockfiles)_

### 🌐 References & General Tutorials

- [MDN Web Docs](https://developer.mozilla.org) — _(HTML, CSS, JavaScript, browser APIs, and HTTP)_

---

## 👤 Author

**MehmoodCoder**

- 🔗 GitHub: [https://github.com/MehmoodCoder](https://github.com/MehmoodCoder)
- 🌐 Portfolio: [https://mh56-portfolio.vercel.app](https://mh56-portfolio.vercel.app)

---

## 📄 License

No `LICENSE` file is currently included in this repository. Add a license file before redistributing the project.

---

## 🤝 Contributing

Contributions are welcome. Please keep changes focused and do not commit API keys, `.env` files, or other credentials.

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-change`).
3. Make and test your changes.
4. Commit the changes (`git commit -m "Describe your change"`).
5. Push the branch and open a Pull Request.

---

## 📝 Changelog

### v1.0.0

- ✨ **Full-Stack Movie Booking:** Connected a React 19/Vite client to an Express 5 API and MongoDB Atlas.
- 🔐 **Clerk Authentication:** Integrated Clerk sign-in, session tokens, and private metadata role checks.
- 🎞️ **TMDB Integration:** Added now-playing discovery and TMDB movie details, cast, poster, and backdrop data.
- 🎟️ **Showtime and Seat Booking:** Implemented show scheduling, seat availability, booking records, and user booking views.
- 💳 **Stripe Checkout:** Added hosted Checkout Sessions and webhook-driven payment confirmation.
- ⚡ **Inngest Background Processing:** Added Clerk sync, payment timeout cleanup, scheduled reminders, and booking/new-show email workflows.
- 📧 **SMTP Email:** Integrated Nodemailer for HTML booking confirmations, reminders, and new-show announcements.
- 📊 **Admin Workflows:** Added dashboard metrics, show management, booking management, and MainAdmin-only theater request approvals.
- 🎨 **Responsive Frontend:** Built movie, showtime, favorites, booking, and admin experiences with React Router and Tailwind CSS v4.

---

### ** 🤷‍♂️ Happy coding without chai! ☕ **
