# 🐛 Campus Companion AI — Bug Log

> **Instructions:** Add a new entry for every integration bug found.
> Copy the template below, fill it in, and check it off once resolved.
> Do NOT delete old entries — keep the full history.

---

## Template (copy & paste for each new bug)

```
### BUG-XXX — <Short Title>
| Field        | Detail |
|--------------|--------|
| **Date**     | YYYY-MM-DD |
| **Found by** | <Name> |
| **Severity** | 🔴 Critical / 🟠 High / 🟡 Medium / 🟢 Low |
| **Status**   | 🔄 Open / ✅ Fixed / ⏸ Deferred |

**Symptom:**
> What exactly went wrong? (error message, wrong response, UI glitch)

**Root Cause:**
> Why it happened.

**Fix Applied:**
> Exactly what was changed (file name + line number if possible).

**Verified by:**
> Who confirmed the fix works, and how.
```

---

## Bug Entries

### BUG-001 — CORS Blocking Frontend Requests
| Field        | Detail |
|--------------|--------|
| **Date**     | — |
| **Found by** | Satyam (Integration) |
| **Severity** | 🔴 Critical |
| **Status**   | 🔄 Open |

**Symptom:**
> Browser console shows: `Access to XMLHttpRequest at 'http://localhost:5000/api/...' from origin 'http://localhost:5173' has been blocked by CORS policy.`

**Root Cause:**
> `cors()` in `backend/src/app.js` not configured to allow `http://localhost:5173`.

**Fix Applied:**
> Updated `app.js`:
> ```js
> app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
> ```

**Verified by:**
> —

---

### BUG-002 — Chat Returns 500 (Missing GEMINI_API_KEY)
| Field        | Detail |
|--------------|--------|
| **Date**     | — |
| **Found by** | — |
| **Severity** | 🔴 Critical |
| **Status**   | 🔄 Open |

**Symptom:**
> `POST /api/chat` returns HTTP 500; backend log shows `Error: API key not valid`.

**Root Cause:**
> `backend/.env` has `GEMINI_API_KEY=<get from Sejal>` — placeholder not replaced.

**Fix Applied:**
> Replace placeholder in `backend/.env` with real key from Sejal.

**Verified by:**
> —

---

### BUG-003 — PDF Upload Fails (uploads/ Folder Missing)
| Field        | Detail |
|--------------|--------|
| **Date**     | — |
| **Found by** | — |
| **Severity** | 🟠 High |
| **Status**   | 🔄 Open |

**Symptom:**
> `POST /api/notices/upload` returns 500; Multer throws `ENOENT: no such file or directory, open 'uploads/...'`.

**Root Cause:**
> `backend/uploads/` directory does not exist (not committed due to `.gitignore`).

**Fix Applied:**
> ```bash
> mkdir -p backend/uploads && touch backend/uploads/.gitkeep
> ```

**Verified by:**
> —

---

### BUG-004 — DB Tables Not Found (Wrong DB Name / Credentials)
| Field        | Detail |
|--------------|--------|
| **Date**     | — |
| **Found by** | — |
| **Severity** | 🔴 Critical |
| **Status**   | 🔄 Open |

**Symptom:**
> Any `/api/timetable`, `/api/rooms`, `/api/events`, `/api/faculty` endpoint returns 500 with `ER_NO_SUCH_TABLE` or connection refused.

**Root Cause:**
> `backend/src/db.js` credentials don't match `backend/.env`, or schema.sql was not run.

**Fix Applied:**
> 1. Verify `backend/.env` values.
> 2. Run `schema.sql` and all seed files in MySQL.
> 3. Confirm with `SHOW TABLES;` in MySQL.

**Verified by:**
> —

---

### BUG-005 — 404 on API Routes
| Field        | Detail |
|--------------|--------|
| **Date**     | — |
| **Found by** | — |
| **Severity** | 🟠 High |
| **Status**   | 🔄 Open |

**Symptom:**
> Any `/api/...` endpoint returns 404.

**Root Cause:**
> Route not mounted in `backend/src/app.js`.

**Fix Applied:**
> Ensure all 6 route mounts are present in `app.js`:
> ```js
> app.use('/api/chat',      chatRoutes);
> app.use('/api/timetable', timetableRoutes);
> app.use('/api/events',    eventRoutes);
> app.use('/api/rooms',     roomRoutes);
> app.use('/api/faculty',   facultyRoutes);
> app.use('/api/notices',   noticeRoutes);
> ```

**Verified by:**
> —

---

### BUG-006 — Multer Field Name Mismatch
| Field        | Detail |
|--------------|--------|
| **Date**     | — |
| **Found by** | — |
| **Severity** | 🟡 Medium |
| **Status**   | 🔄 Open |

**Symptom:**
> PDF upload returns `MulterError: Unexpected field`.

**Root Cause:**
> Frontend FormData uses a different key than the backend Multer field name `"notice"`.

**Fix Applied:**
> Ensure frontend uses exactly `formData.append('notice', file)` and backend uses `upload.single('notice')`.

**Verified by:**
> —

---

*Add new entries below this line.*
