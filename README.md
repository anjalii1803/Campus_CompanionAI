# Campus Companion AI

Campus Companion AI is a web-based assistant designed to help students access campus information easily. Students can ask questions about timetables, classrooms, faculty, events, and college notices through a chat interface.

## Features

- Chat with an AI assistant to get campus-related information.
- View class timetables.
- Find classroom and room details.
- Check campus events and notices.
- Upload PDF notices and ask questions about their content.

## Technologies Used

- **Frontend:** React, Vite, Axios
- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **AI:** Google Gemini API
- **Deployment:** Vercel and Railway

## Team Members

| Member | Responsibility |
|---|---|
| Anjali | Frontend Development |
| Sejal | AI Integration and Backend |
| Prachi | Database and API Development |
| Satyam | Integration, Testing and Deployment |

## Project Structure

```text
Campus_CompanionAI/
├── frontend/
├── backend/
├── database/
├── docs/
└── README.md
```

## How to Run the Project

### 1. Clone the repository

```bash
git clone https://github.com/anjalii1803/Campus_CompanionAI.git
cd Campus_CompanionAI
```

### 2. Set up the database

Start MySQL and create the database:

```sql
CREATE DATABASE campus_companion_db;
```

Import the SQL files from the `database` folder in the following order:

1. `schema.sql`
2. `seed_timetable.sql`
3. `seed_rooms.sql`
4. `seed_events.sql`
5. `seed_faculty.sql`

### 3. Configure environment variables

Create a `.env` file inside the `backend` folder:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=campus_companion_db
GEMINI_API_KEY=your_api_key
```

Create a `.env` file inside the `frontend` folder:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### 4. Install dependencies

Open a terminal in the project folder:

```bash
cd backend
npm install
```

Open another terminal:

```bash
cd frontend
npm install
```

### 5. Start the application

**Backend:**

```bash
cd backend
node src/app.js
```

**Frontend:**

```bash
cd frontend
npm run dev
```

Open the URL shown by Vite (usually `http://localhost:5173`) in your browser.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/chat` | Chat with the AI assistant |
| GET | `/api/timetable` | Get timetable information |
| GET | `/api/rooms/:room_name` | Get room details |
| GET | `/api/events` | View campus events |
| GET | `/api/faculty/:name` | Get faculty details |
| POST | `/api/notices/upload` | Upload a notice PDF |
| POST | `/api/notices/ask` | Ask questions about a notice |

## Testing

API endpoints can be tested using Postman. The Postman collection is available in the `docs` folder.

## Future Improvements

- Improve AI responses.
- Add more campus-related information.
- Improve the user interface.
- Deploy the application for public access.

---

**Developed as a college group project.**
