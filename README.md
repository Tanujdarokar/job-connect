# JobConnect - Modern Career & Hiring Platform

JobConnect is an enterprise-grade job application web platform built with **React**, **Vite**, **Tailwind CSS**, and **Redux Toolkit**.

---

## 🚀 Key Features

### 🌟 Roles & Access Control
- **Job Seeker**: Search & filter 40+ curated tech jobs, 1-click apply, track application stages, save jobs, build profile & resume, test AI resume scoring, and chat with employers.
- **Employer / Recruiter**: Post & manage jobs, review applicants, filter candidates by skills, schedule live interviews with browser video rooms, and view analytics.
- **Admin**: Monitor users, moderate job postings, review activity logs, and view platform health metrics.

### 🎨 Design & Experience
- **Theme**: Persistent Light / Dark / System modes with glassmorphism, glowing gradients, and custom scrollbars.
- **Multi-language**: Full i18n support for **English**, **Hindi (हिन्दी)**, and **Gujarati (ગુજરાતી)**.
- **Data Persistence**: Offline-first mock database engine powered by **LocalForage (IndexedDB)** with automatic **localStorage** fallback and simulated realistic network latency (200–450ms).

---

## 🛠️ Tech Stack

- **Build Tool**: Vite (JavaScript / JSX)
- **UI & Styling**: Tailwind CSS, Lucide Icons, Framer Motion
- **State Management**: Redux Toolkit (`createSlice`, `createAsyncThunk`), `react-redux`
- **Routing**: React Router v6 with `ProtectedRoute`, `RoleRoute`, and `PublicRoute`
- **Forms & Validation**: React Hook Form + Yup
- **Feedback & Toasts**: `react-hot-toast`
- **Localization**: `react-i18next`

---

## 💻 Setup & Running Locally

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

3. **Build for Production**:
   ```bash
   npm run build
   ```

---

## 🔑 Demo Credentials

Demo accounts are pre-seeded and can be auto-filled with 1-click buttons on the login page:

| Role | Email | Password | Details |
|---|---|---|---|
| **Job Seeker** | `seeker@jobconnect.demo` | `password123` | Aarav Sharma (Senior React Dev) |
| **Employer** | `employer@techcorp.demo` | `password123` | Priya Patel (TechCorp Innovations) |
| **Admin** | `admin@jobconnect.demo` | `password123` | Super Admin |

*Mobile OTP Demo:* Enter any 10-digit number and use `123456` as OTP.

---

## 🔄 How to Swap Mock Services with a Real Backend (Firebase / Supabase / REST)

All data calls adhere to the **Repository / Service Pattern**. To connect a real backend:
1. Navigate to `src/features/<feature>/services/<feature>Service.js`.
2. Replace localforage/mock calls inside the service methods (e.g. `login`, `getJobs`, `applyJob`) with your actual API SDK (e.g., `supabase.auth.signInWithPassword` or `axios.post('/api/auth/login')`).
3. Redux slices and React UI components require **zero code changes**.
