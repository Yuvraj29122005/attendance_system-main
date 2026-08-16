# 🚀 Complete Deployment Guide: RV Attendance Tracker on Vercel

This guide provides step-by-step instructions to deploy the RV Attendance Tracker on Vercel with a database.

---

## 🌟 How the Database Works
- **Local Development (`npm run dev`)**: Works out of the box with zero setup using the built-in local database (`data/db.json`), pre-seeded with all 22 AIML and 57 AIDS students and subjects.
- **Production (Vercel)**: Automatically switches to **Vercel Postgres (Neon)** as soon as you connect a free database in your Vercel dashboard.

---

## 📋 Step-by-Step Deployment Instructions

### 🔹 STEP 1: Push Your Code to GitHub

1. Open your terminal in the project directory:
   ```bash
   cd c:\laragon\www\attendance_system-main
   ```
2. Initialize git and commit:
   ```bash
   git init
   git add .
   git commit -m "Initial commit for Vercel deployment"
   ```
3. Create a new repository on [GitHub.com](https://github.com/new) (e.g. `rv-attendance-tracker`).
4. Link and push your repository:
   ```bash
   git branch -M main
   git remote add origin https://github.com/YOUR_GITHUB_USERNAME/rv-attendance-tracker.git
   git push -u origin main
   ```

---

### 🔹 STEP 2: Deploy to Vercel

1. Log in to [Vercel.com](https://vercel.com).
2. Click **"Add New..."** → **"Project"**.
3. Under **"Import Git Repository"**, find your `rv-attendance-tracker` repository and click **"Import"**.
4. Leave all settings at default:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `next build`
   - **Output Directory**: `.next`
5. Click **"Deploy"**.
6. Wait ~30 seconds for the deployment to finish.

---

### 🔹 STEP 3: Create & Connect Vercel Postgres Database (Free)

1. In your project dashboard on Vercel, navigate to the **"Storage"** tab at the top.
2. Click **"Create Database"**.
3. Select **"Postgres"** (powered by Neon Serverless).
4. Click **"Continue"**, accept the terms, choose your preferred region, and click **"Create"**.
5. Once created, click **"Connect Project"** and select your `rv-attendance-tracker` project.
   > ℹ️ *Vercel will automatically inject the `POSTGRES_URL` and database environment variables.*
6. Go to **Deployments** tab → Click the `...` next to your latest deployment → Click **"Redeploy"** so the database credentials take effect.

---

### 🔹 STEP 4: Initialize the Database (One-Time Setup)

Once the redeployment is complete:
1. Open your live Vercel URL in your browser:
   ```text
   https://YOUR-APP-NAME.vercel.app/api/init
   ```
2. You will see a success message:
   ```json
   {
     "success": true,
     "message": "Database initialized!"
   }
   ```
3. This creates all database tables (`students`, `subjects`, `attendance`) and seeds all 79 students and 5 subjects automatically!

---

### 🔹 STEP 5: Verify Your Application

1. Open `https://YOUR-APP-NAME.vercel.app/`
   - Test marking attendance for AIML and AIDS slots.
   - Click **"⚡ Generate Report"** and **"💾 Save to DB"**.
2. Open `https://YOUR-APP-NAME.vercel.app/students`
   - View AIML and AIDS student lists.
   - Switch between **Students** and **Subjects** tabs.
   - Test adding, editing, or deleting entries.

---

## 💻 Running Locally

To run the application locally on your computer:
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.
- Works immediately with zero configuration.
- To connect local development to your Vercel Postgres database, copy your `POSTGRES_URL` connection string from Vercel to a `.env.local` file.

---

## 🛠️ Features Included
- ✅ Full AIML (22 students) & AIDS (57 students) tracking
- ✅ 6 Time Slots with subject selection and Absent/Library toggles
- ✅ One-click WhatsApp-ready formatted report generation
- ✅ PWA installable on mobile and desktop
- ✅ Dark / Light theme toggle with local memory
- ✅ Instant, serverless response times on Vercel
