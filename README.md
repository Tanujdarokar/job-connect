# JobConnect

JobConnect is a React-based job portal prototype with separate experiences for job seekers, employers, and administrators. It includes job discovery, application tracking, employer tools, and interview and communication features.

## Features

- **Job seekers:** Browse and search jobs, view company profiles, save jobs, manage a profile, and track applications.
- **Employers:** Create and manage job postings, review applicants, search candidates, and view hiring analytics.
- **Administration:** Access an admin dashboard for platform oversight.
- **Additional tools:** Resume analysis, salary information, messaging, notifications, and interview scheduling.
- **Personalization:** Light, dark, and system themes, plus English, Hindi, and Gujarati localization.

## Tech stack

- React 18 and Vite
- React Router for page navigation and role-based route guards
- Redux Toolkit and React Redux for application state
- Tailwind CSS for styling
- React Hook Form and Yup for forms and validation
- LocalForage with localStorage fallback for browser-based persistence
- Framer Motion, Recharts, Lucide icons, and react-hot-toast

## Run locally

Install [Node.js](https://nodejs.org/) and npm, then run these commands from the project directory:

```bash
npm install
npm run dev
```

Vite starts the development server at `http://localhost:3000`.

## Production build

Build the app and preview the generated production bundle:

```bash
npm run build
npm run preview
```

## Project status

This project currently uses mock services and data persisted in the browser. It does not connect to a production API or backend, so authentication, job listings, messaging, and other data are for prototype/demo use only. Connect the feature services to a backend before using the app with real users or sensitive information.
