# ✅ Campus Companion AI — Deployment Checklist

> Use this document before every deployment (staging or production).
> Check off each item **in order**. Do NOT skip sections.

---

## 🔧 Phase 1 — Local Pre-flight (Run Before Pushing to GitHub)

### Backend
- [ ] `backend/.env` contains real values (no placeholders like `<get from Sejal>`)
- [ ] `GEMINI_API_KEY` is valid and tested locally via Postman
- [ ] `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` are correct
- [ ] `backend/uploads/` directory exists (create with `mkdir -p backend/uploads && touch backend/uploads/.gitkeep`)
- [ ] All 6 routes are mounted in `backend/src/app.js`
- [ ] CORS allows `http://localhost:5173` (for local) and production frontend URL
- [ ] `node src/app.js` starts with no errors
- [ ] All 7 Postman tests pass with **green** status

### Database
- [ ] `campus_companion_db` database created in MySQL
- [ ] `schema.sql` executed successfully — no errors
- [ ] All 4 seed files executed: `seed_timetable.sql`, `seed_rooms.sql`, `seed_events.sql`, `seed_faculty.sql`
- [ ] `SHOW TABLES;` shows all 5 expected tables
- [ ] `SELECT COUNT(*) FROM timetable;` (and other tables) returns non-zero rows

### Frontend
- [ ] `frontend/.env` has `VITE_API_BASE_URL=http://localhost:5000/api`
- [ ] `npm run dev` starts with no errors
- [ ] Chat flow works end-to-end in browser
- [ ] Timetable page loads data from DB
- [ ] Events page loads data
- [ ] Notices upload + Q&A flow works

---

## 📦 Phase 2 — Git Preparation

- [ ] `.gitignore` is committed and working (`.env`, `node_modules/`, `uploads/` are NOT tracked)
- [ ] `backend/uploads/.gitkeep` committed so the empty folder is tracked
- [ ] All feature branches merged into `main` (no pending merge conflicts)
- [ ] `README.md` is up to date
- [ ] `docs/bug_log.md` updated with all known/fixed bugs
- [ ] Final commit pushed to GitHub: `git push origin main`

---

## 🚀 Phase 3 — Backend Deployment (Railway / Render)

### Railway
- [ ] Logged into [railway.app](https://railway.app)
- [ ] New project created → "Deploy from GitHub repo"
- [ ] `backend/` selected as root directory (or monorepo root with `backend/` start command)
- [ ] Start command set to: `node src/app.js`
- [ ] Environment variables set in Railway dashboard:

  | Variable         | Value                          |
  |------------------|--------------------------------|
  | `PORT`           | `5000` (Railway may override)  |
  | `DB_HOST`        | _(Railway MySQL hostname)_     |
  | `DB_USER`        | _(Railway MySQL user)_         |
  | `DB_PASSWORD`    | _(Railway MySQL password)_     |
  | `DB_NAME`        | `campus_companion_db`          |
  | `GEMINI_API_KEY` | _(real key from Sejal)_        |

- [ ] MySQL plugin added to Railway project
- [ ] Schema + seed SQL files imported into Railway MySQL
- [ ] Deployment succeeds — no build/start errors in Railway logs
- [ ] Backend URL noted (e.g., `https://campus-backend.railway.app`)
- [ ] Test `GET https://campus-backend.railway.app/api/events` returns valid JSON

---

## 🌐 Phase 4 — Frontend Deployment (Vercel)

- [ ] Logged into [vercel.com](https://vercel.com)
- [ ] New project → "Import Git Repository" → select frontend repo/folder
- [ ] Framework preset: **Vite**
- [ ] Root directory set to `frontend/`
- [ ] Build command: `npm run build`
- [ ] Output directory: `dist`
- [ ] Environment variable set in Vercel:

  | Variable              | Value                                        |
  |-----------------------|----------------------------------------------|
  | `VITE_API_BASE_URL`   | `https://campus-backend.railway.app/api`     |

- [ ] Deployment succeeds
- [ ] Frontend URL noted (e.g., `https://campus-companion.vercel.app`)

---

## 🔗 Phase 5 — Post-Deployment Integration Tests

- [ ] Open `https://campus-companion.vercel.app` in browser — no blank screen
- [ ] Chat: type "Where is Lab 3?" → AI response appears
- [ ] Timetable page loads data (not empty, not 500 error)
- [ ] Events page loads event cards
- [ ] Notices: upload a PDF → success message shown
- [ ] Notices: ask a question → AI answer returned
- [ ] Browser DevTools Network tab — no CORS errors, no 404s
- [ ] Check Railway/Render logs — no repeated 500 errors

---

## 📣 Phase 6 — Final Sign-off

- [ ] All team members notified of live URLs
- [ ] `README.md` updated with live frontend + backend URLs
- [ ] Screenshots added to `docs/` or README
- [ ] Bug log closed out for this release
- [ ] Tag the release: `git tag v1.0.0 && git push origin v1.0.0`

---

> 🎉 Deployment complete! Share the Vercel URL with your evaluators.
