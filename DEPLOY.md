# Deploying DSA (frontend on Netlify, backend on Render, DB on MongoDB Atlas)

The app is MERN, so three pieces go to three places:
- **MongoDB Atlas** – the database (free tier)
- **Render** – the Express backend/API (free tier)
- **Netlify** – the React frontend

Do them in this order. You'll need accounts on GitHub, Atlas, Render, and Netlify.

---

## 0) Put the code on GitHub (once)
Render and Netlify both deploy from a Git repo. From the project folder on your PC:

    git init
    git add .
    git commit -m "DSA app"
    git branch -M main
    git remote add origin https://github.com/<you>/<repo>.git   # create the empty repo on github.com first
    git push -u origin main

`node_modules`, `.env`, and build output are already git-ignored.

---

## 1) MongoDB Atlas (database)
1. Create a free **M0** cluster at https://www.mongodb.com/atlas
2. **Database Access** → add a user (username + password).
3. **Network Access** → Add IP → allow `0.0.0.0/0` (anywhere) for simplicity.
4. **Connect** → *Drivers* → copy the connection string:
   `mongodb+srv://<user>:<pass>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`
   Add the database name `dsa` before the `?`:
   `.../cluster0.xxxxx.mongodb.net/dsa?retryWrites=true&w=majority`
   Keep this string for step 2.

---

## 2) Render (backend API)
1. https://render.com → **New → Web Service** → connect your GitHub repo.
2. Settings:
   - **Root Directory:** `server`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
3. **Environment Variables:**
   - `MONGODB_URI` = the Atlas string from step 1
   - (PORT is provided by Render automatically — the server already reads it.)
4. Deploy. On first boot the server seeds all 385 questions + content into Atlas automatically.
5. Copy the service URL, e.g. `https://dsa-api.onrender.com`.
   Test it: open `https://dsa-api.onrender.com/api/health` → should return `{"ok":true,...}`.
   (Free tier sleeps after ~15 min idle; the first request then takes ~30-50s to wake.)

---

## 3) Netlify (frontend)
1. https://app.netlify.com → **Add new site → Import from Git** → pick the repo.
2. Settings:
   - **Base directory:** `client`
   - **Build command:** `npm run build`
   - **Publish directory:** `client/dist`  (netlify.toml in `client/` already sets build + SPA redirect)
3. **Environment variables:** add
   - `VITE_API_URL` = `https://dsa-api.onrender.com/api`  (your Render URL + `/api`, no trailing slash)
4. Deploy. Your app is live at the Netlify URL.

If you change `VITE_API_URL` later, trigger a redeploy (Vite bakes env vars in at build time).

---

## Notes
- CORS on the backend is open, so the Netlify origin can call it. To lock it down later, restrict `cors()` to your Netlify domain in `server/index.js`.
- Progress (solved/streak/quiz scores) is stored in Atlas under a single `userId: "me"` doc — fine for personal use.
