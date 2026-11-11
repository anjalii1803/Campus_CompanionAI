# 🎓 Campus Companion AI

> An AI-powered campus assistant that helps students instantly access timetables, room locations, faculty details, events, and college notices — all through a conversational interface.

---

## 🚀 Live Demo

| Service  | URL |
|----------|-----|
| Frontend | _(update after Vercel deploy)_ |
| Backend  | _(update after Railway deploy)_ |

---

## 📸 Screenshots

> _(Add screenshots to `docs/screenshots/` and link them here after deployment)_

| Chat Interface | Timetable | Events | Notices |
|---|---|---|---|
| ![Chat](docs/screenshots/chat.png) | ![Timetable](docs/screenshots/timetable.png) | ![Events](docs/screenshots/events.png) | ![Notices](docs/screenshots/notices.png) |

---

## 🧑‍💻 Team Members & Roles

| Name       | Role                          | Responsibility |
|------------|-------------------------------|----------------|
| **Anjali** | Frontend Developer            | React UI, Vite setup, all pages & components |
| **Sejal**  | AI & Backend Developer        | Express server, Gemini AI integration, chat + notices routes |
| **Prachi** | Database & API Developer      | MySQL schema, seed data, timetable/rooms/events/faculty routes |
| **Satyam** | Integration, Testing & DevOps | Merging all parts, bug fixes, Postman tests, deployment |

---

## 🛠️ Tech Stack

| Layer     | Technology |
|-----------|------------|
| Frontend  | React 18, Vite, Axios |
| Backend   | Node.js, Express.js |
| AI        | Google Gemini API |
| Database  | MySQL 8 |
| PDF Q&A   | Multer (upload) + Gemini (extraction) |
| Deployment | Vercel (frontend), Railway (backend + DB) |

---

## 📁 Project Structure

```
campus-companion-ai/
├── frontend/               ← Anjali's React app (Vite)
│   ├── src/
│   │   ├── components/     ← Reusable UI components
│   │   ├── pages/          ← Chat, Timetable, Events, Notices
│   │   └── services/
│   │       └── api.js      ← All Axios API calls
│   └── .env                ← VITE_API_BASE_URL
│
├── backend/                ← Sejal + Prachi's Express server
│   ├── src/
│   │   ├── app.js          ← Entry point, CORS, route mounting
│   │   ├── db.js           ← MySQL connection pool
│   │   └── routes/
│   │       ├── chatRoutes.js
│   │       ├── timetableRoutes.js
│   │       ├── eventRoutes.js
│   │       ├── roomRoutes.js
│   │       ├── facultyRoutes.js
│   │       └── noticeRoutes.js
│   ├── uploads/            ← Uploaded PDFs (gitignored; .gitkeep tracks folder)
│   └── .env                ← PORT, DB_*, GEMINI_API_KEY
│
├── database/               ← Prachi's SQL files
│   ├── schema.sql
│   ├── seed_timetable.sql
│   ├── seed_rooms.sql
│   ├── seed_events.sql
│   └── seed_faculty.sql
│
├── docs/
│   ├── bug_log.md
│   ├── deployment_checklist.md
│   └── campus_companion_postman_collection.json
│
├── .gitignore
└── README.md
```

---

## ⚡ Local Setup

### Prerequisites
- Node.js ≥ 18
- MySQL 8 running locally
- A Google Gemini API key (get from Sejal)

### 1 — Clone the repository

```bash
git clone https://github.com/<your-org>/campus-companion-ai.git
cd campus-companion-ai
```

### 2 — Set up the database

Open MySQL and run:

```sql
CREATE DATABASE campus_companion_db;
USE campus_companion_db;

SOURCE database/schema.sql;
SOURCE database/seed_timetable.sql;
SOURCE database/seed_rooms.sql;
SOURCE database/seed_events.sql;
SOURCE database/seed_faculty.sql;

SHOW TABLES;   -- should list 5 tables
```

### 3 — Configure environment variables

**Backend** — create `backend/.env`:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=campus_companion_db
GEMINI_API_KEY=your_real_gemini_api_key_here
```

**Frontend** — create `frontend/.env`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### 4 — Install dependencies

```bash
cd backend  && npm install
cd ../frontend && npm install
```

### 5 — Create the uploads folder

```bash
mkdir -p backend/uploads
```

### 6 — Run the project

Open **two terminals**:

```bash
# Terminal 1 — Backend
cd backend
node src/app.js
# → Server running on http://localhost:5000

# Terminal 2 — Frontend
cd frontend
npm run dev
# → App running on http://localhost:5173
```

Open [http://localhost:5173](http://localhost:5173) in your browser. 🎉

---

## 🔌 API Reference

Base URL (local): `http://localhost:5000/api`

| # | Method | Endpoint | Description |
|---|--------|----------|-------------|
| 1 | POST | `/chat` | Send a message; get AI reply |
| 2 | GET  | `/timetable?day=Monday&branch=CSE` | Get timetable for a day & branch |
| 3 | GET  | `/rooms/:room_name` | Get details for a room |
| 4 | GET  | `/events` | List all campus events |
| 5 | GET  | `/faculty/:name` | Get faculty info by name |
| 6 | POST | `/notices/upload` | Upload a PDF notice (field: `notice`) |
| 7 | POST | `/notices/ask` | Ask a question about an uploaded notice |

### Request / Response examples

**POST `/api/chat`**
```json
// Request body
{ "message": "Where is Lab 3?" }

// Response
{ "success": true, "data": { "reply": "Lab 3 is in CS Block, 2nd floor." } }
```

**GET `/api/timetable?day=Monday&branch=CSE`**
```json
{ "success": true, "data": [ { "day": "Monday", "subject": "DBMS", ... } ] }
```

**POST `/api/notices/ask`**
```json
// Request body
{ "notice_id": 1, "question": "What is the submission date?" }

// Response
{ "success": true, "data": { "answer": "The submission date is 5th November 2026." } }
```

> 📬 For full Postman collection, import `docs/campus_companion_postman_collection.json`.

---

## 🧪 Testing

1. Import `docs/campus_companion_postman_collection.json` into Postman
2. Run tests **in order** (Test 06 saves `notice_id` automatically for Test 07)
3. All 7 tests must show **green** before frontend testing
4. Then test all 4 flows in the browser (chat, timetable, events, notices)

---

## 🚀 Deployment

See [`docs/deployment_checklist.md`](docs/deployment_checklist.md) for the full step-by-step checklist.

**Summary:**

| Part | Platform | Steps |
|------|----------|-------|
| Backend | Railway | Push `backend/`, add MySQL plugin, set env vars |
| Frontend | Vercel | Push `frontend/`, set `VITE_API_BASE_URL` to Railway URL |

---

## 🐛 Bug Log

All integration bugs are documented in [`docs/bug_log.md`](docs/bug_log.md).

---

## 📜 Git Workflow

```bash
# Each member works on their feature branch
git checkout -b feature/anjali-frontend
git checkout -b feature/sejal-ai-backend
git checkout -b feature/prachi-database
git checkout -b feature/satyam-integration

# Satyam merges everything into main
git checkout main
git merge feature/sejal-ai-backend
git merge feature/prachi-database
git merge feature/anjali-frontend
# → Fix merge conflicts
git merge feature/satyam-integration
git push origin main
```

---

## 📄 License

This project was built as a college group project. All rights reserved by the team.

### Database Seed
- Run `backend/database/campus_companion_master_seed.sql` in MySQL to populate MCA timetable, rooms, and faculty data.
 
