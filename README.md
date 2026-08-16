# RV Attendance Management System

Modern attendance tracker for 3rd Year AIML & AIDS students built with Next.js and Vercel Postgres (Neon).

## 🚀 Deploy on Vercel

### Step 1 — Push to GitHub
```bash
git add .
git commit -m "Convert to Next.js for Vercel"
git push origin main
```

### Step 2 — Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) and log in.
2. Click **Add New...** → **Project**.
3. Import your GitHub repository and click **Deploy**.

### Step 3 — Add Free Postgres Database
1. In your Vercel project dashboard, click the **Storage** tab.
2. Click **Create Database** → choose **Postgres** (powered by Neon).
3. Connect the database to your project. Vercel will automatically inject `POSTGRES_URL`.
4. Redeploy if prompted.

### Step 4 — Initialize Database
1. Once deployed, open:
   ```
   https://YOUR-APP.vercel.app/api/init
   ```
2. You will see:
   ```json
   {"success":true,"message":"Database initialized!"}
   ```
3. Your app is live and fully functional!

---

## 💻 Local Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Set up environment variables:
   - Copy `.env.example` to `.env.local`
   - Add your `POSTGRES_URL` connection string
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.
5. Initialize the database locally by visiting [http://localhost:3000/api/init](http://localhost:3000/api/init).
