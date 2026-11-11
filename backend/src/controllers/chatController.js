/**
 * chatController.js
 * ─────────────────────────────────────────────────────────────────────────────
 * POST /api/chat
 * MNNIT Allahabad — Department of Computer Science & Engineering
 * Official Academic Session 2026–27 Master Controller
 */

const pool            = require("../config/db");
const { parseIntent } = require("../services/intentParser");
const { getAIAnswer } = require("../services/nlpService");

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// Subject alias dictionary for MNNIT CSE / MCA
const SUBJECT_ALIASES = {
  dbms: ["data management system", "database management system", "database", "dbms", "database systems", "dbms lab"],
  os: ["operating system", "operating systems", "os", "operating system lab", "os lab"],
  daa: ["analysis of algorithms", "algorithm", "algorithms", "daa", "algorithms lab"],
  sc: ["soft computing", "soft comp"],
  oom: ["object based modeling", "object based modelling", "object oriented", "oom", "oops", "obm"],
  wp: ["web programming", "web programming lab", "web dev"],
  dco: ["digital computer organization", "digital & computer organization", "dco", "dco lab"],
  logic: ["foundation of logic", "logic"],
  shell: ["shell programming", "shell programming lab", "unix", "linux"],
  multimedia: ["multimedia technology", "multimedia", "multimedia lab"],
  testing: ["software testing", "sw testing", "pe-iii"],
  spm: ["software project management", "spm"],
  ethics: ["professional ethics", "ethics"],
  ecommerce: ["e-commerce", "ecommerce", "e-commerce lab"],
  mining: ["web mining", "pe-ii"],
  pps: ["programming & problem solving", "programming and problem solving", "pps", "pps lab"],
  it: ["principles of it industries management", "it management", "it industries"],
};

// Official MNNIT CSED Faculty Master Directory (2026–27)
const VERIFIED_FACULTY = [
  {
    name: "Dr. Manoj Wairiya",
    initials: "MW",
    department: "Computer Science & Engineering",
    subjects: ["Operating System", "Programming & Problem Solving", "OS"],
    cabin_no: "CS-101",
    email: "wairya@mnnit.ac.in",
  },
  {
    name: "Prof. Anil Kumar Singh",
    initials: "AKS",
    department: "Computer Science & Engineering",
    subjects: ["Data Management System", "DBMS", "Database Management System", "DBMS Lab", "Database Systems"],
    cabin_no: "CS-201",
    email: "ak@mnnit.ac.in",
  },
  {
    name: "Dr. Shashank Srivastava",
    initials: "SS",
    department: "Computer Science & Engineering",
    subjects: ["Soft Computing"],
    cabin_no: "CS-203",
    email: "shashank12@mnnit.ac.in",
  },
  {
    name: "Prof. D. K. Yadav",
    initials: "DKY",
    department: "Computer Science & Engineering",
    subjects: ["Object Based Modeling", "OBM", "OOPS"],
    cabin_no: "CS-202",
    email: "dky@mnnit.ac.in",
  },
  {
    name: "Dr. Divya Kumar",
    initials: "DIV",
    department: "Computer Science & Engineering",
    subjects: ["Analysis of Algorithms", "Algorithms Lab", "DAA"],
    cabin_no: "CS-104",
    email: "divyak@mnnit.ac.in",
  },
  {
    name: "Dr. Pragya Dwivedi",
    initials: "PD",
    department: "Computer Science & Engineering",
    subjects: ["Web Programming Lab"],
    cabin_no: "CS-105",
    email: "pragya@mnnit.ac.in",
  },
  {
    name: "Dr. Dinesh Singh",
    initials: "DIN",
    department: "Computer Science & Engineering",
    subjects: ["Operating System Lab", "Web Mining (PE-II)", "OS Lab"],
    cabin_no: "CS-106",
    email: "dinesh@mnnit.ac.in",
  },
  {
    name: "Mr. Rajesh Tripathi",
    initials: "RT",
    department: "Computer Science & Engineering",
    subjects: ["Digital Computer Organization", "DCO Lab", "DCO"],
    cabin_no: "CS-107",
    email: "rtripathi@mnnit.ac.in",
  },
  {
    name: "Dr. Kapil",
    initials: "KAP",
    department: "Computer Science & Engineering",
    subjects: ["Foundation of Logic", "Principles of IT Industries Management"],
    cabin_no: "CS-108",
    email: "kapil@mnnit.ac.in",
  },
  {
    name: "Dr. Ranvijay",
    initials: "RAN",
    department: "Computer Science & Engineering",
    subjects: ["Shell Programming Lab"],
    cabin_no: "CS-204",
    email: "ranvijay@mnnit.ac.in",
  },
  {
    name: "Dr. Prasun Chandra Tripathi",
    initials: "PCT",
    department: "Computer Science & Engineering",
    subjects: ["Shell Programming Lab", "PPS Lab", "Programming & Problem Solving Lab"],
    cabin_no: "CS-109",
    email: "pctripathi@mnnit.ac.in",
  },
  {
    name: "Dr. Himanshu Nandanwar",
    initials: "HIN",
    department: "Computer Science & Engineering",
    subjects: ["Multimedia Technology", "Multimedia Lab"],
    cabin_no: "CS-110",
    email: "hnandanwar@mnnit.ac.in",
  },
  {
    name: "Dr. Komal Gupta",
    initials: "KOG",
    department: "Computer Science & Engineering",
    subjects: ["E-Commerce", "E-Commerce Lab"],
    cabin_no: "CS-111",
    email: "komal@mnnit.ac.in",
  },
  {
    name: "Dr. Kailash W. Kalare",
    initials: "KK",
    department: "Computer Science & Engineering",
    subjects: ["Professional Ethics"],
    cabin_no: "CS-112",
    email: "kwkalare@mnnit.ac.in",
  },
  {
    name: "Dr. Shreeya Swagatika Sahoo",
    initials: "SSS",
    department: "Computer Science & Engineering",
    subjects: ["Software Project Management", "SPM"],
    cabin_no: "CS-113",
    email: "shreeya@mnnit.ac.in",
  },
  {
    name: "Prof. Anoj Kumar",
    initials: "AJK",
    department: "Computer Science & Engineering",
    subjects: ["Software Testing (PE-III)", "SW Testing"],
    cabin_no: "CS-205",
    email: "anojk@mnnit.ac.in",
  },
];

// Official MNNIT CSED Rooms Directory (2026–27)
const VERIFIED_ROOMS = [
  { room_name: "NLH1", block: "New Lecture Hall Complex", floor: 0, capacity: 150, type: "Classroom" },
  { room_name: "NLH2", block: "New Lecture Hall Complex", floor: 1, capacity: 150, type: "Classroom" },
  { room_name: "L1 Lab", block: "CS Engineering Block (CSED)", floor: 1, capacity: 50, type: "Lab" },
  { room_name: "L2 Lab", block: "CS Engineering Block (CSED)", floor: 2, capacity: 50, type: "Lab" },
  { room_name: "CCTF Lab", block: "Computer Centre Complex", floor: 1, capacity: 60, type: "Lab" },
  { room_name: "GS3", block: "Ganga Seminar Hall Complex", floor: 0, capacity: 80, type: "Classroom" },
  { room_name: "GS4", block: "Ganga Seminar Hall Complex", floor: 1, capacity: 80, type: "Classroom" },
  { room_name: "GS5", block: "Ganga Seminar Hall Complex", floor: 1, capacity: 80, type: "Classroom" },
  { room_name: "GS8", block: "Ganga Seminar Hall Complex", floor: 2, capacity: 80, type: "Classroom" },
  { room_name: "CSNB1", block: "Computer Science New Building", floor: 1, capacity: 90, type: "Classroom" },
];

// Official MNNIT CSED Timetable Directory (2026–27)
const VERIFIED_TIMETABLE = [
  // MCA 3rd Semester
  { branch: "MCA", semester: 3, day: "Monday", start_time: "08:00:00", end_time: "10:00:00", subject: "Object Based Modeling", faculty: "Prof. D. K. Yadav", room: "NLH2" },
  { branch: "MCA", semester: 3, day: "Monday", start_time: "10:00:00", end_time: "11:00:00", subject: "Web Programming Lab", faculty: "Dr. Pragya Dwivedi", room: "L1 Lab CSED" },
  { branch: "MCA", semester: 3, day: "Monday", start_time: "11:00:00", end_time: "12:00:00", subject: "Operating System", faculty: "Dr. Manoj Wairiya", room: "NLH2" },
  { branch: "MCA", semester: 3, day: "Monday", start_time: "14:00:00", end_time: "16:00:00", subject: "Analysis of Algorithms", faculty: "Dr. Divya Kumar", room: "GS3" },
  { branch: "MCA", semester: 3, day: "Monday", start_time: "16:00:00", end_time: "17:00:00", subject: "Soft Computing", faculty: "Dr. Shashank Srivastava", room: "NLH2" },

  { branch: "MCA", semester: 3, day: "Tuesday", start_time: "16:00:00", end_time: "17:00:00", subject: "Soft Computing", faculty: "Dr. Shashank Srivastava", room: "NLH2" },

  { branch: "MCA", semester: 3, day: "Wednesday", start_time: "09:00:00", end_time: "11:00:00", subject: "Data Management System", faculty: "Prof. Anil Kumar Singh", room: "NLH2" },
  { branch: "MCA", semester: 3, day: "Wednesday", start_time: "13:00:00", end_time: "14:00:00", subject: "Analysis of Algorithms", faculty: "Dr. Divya Kumar", room: "GS4" },
  { branch: "MCA", semester: 3, day: "Wednesday", start_time: "14:00:00", end_time: "16:00:00", subject: "Analysis of Algorithms Lab", faculty: "Dr. Divya Kumar", room: "L2 Lab CSED" },
  { branch: "MCA", semester: 3, day: "Wednesday", start_time: "16:00:00", end_time: "17:00:00", subject: "Operating System", faculty: "Dr. Manoj Wairiya", room: "CSNB1" },

  { branch: "MCA", semester: 3, day: "Thursday", start_time: "09:00:00", end_time: "10:00:00", subject: "Soft Computing", faculty: "Dr. Shashank Srivastava", room: "NLH2" },
  { branch: "MCA", semester: 3, day: "Thursday", start_time: "10:00:00", end_time: "11:00:00", subject: "Operating System", faculty: "Dr. Manoj Wairiya", room: "NLH2" },
  { branch: "MCA", semester: 3, day: "Thursday", start_time: "11:00:00", end_time: "12:00:00", subject: "Object Based Modeling", faculty: "Prof. D. K. Yadav", room: "NLH2" },
  { branch: "MCA", semester: 3, day: "Thursday", start_time: "14:00:00", end_time: "16:00:00", subject: "Data Management System Lab", faculty: "Prof. Anil Kumar Singh", room: "CCTF Lab CSED" },

  { branch: "MCA", semester: 3, day: "Friday", start_time: "09:00:00", end_time: "10:00:00", subject: "Data Management System", faculty: "Prof. Anil Kumar Singh", room: "NLH2" },
  { branch: "MCA", semester: 3, day: "Friday", start_time: "10:00:00", end_time: "11:00:00", subject: "Analysis of Algorithms", faculty: "Dr. Manoj Wairiya", room: "GS5" },
  { branch: "MCA", semester: 3, day: "Friday", start_time: "11:00:00", end_time: "12:00:00", subject: "Data Management System", faculty: "Prof. Anil Kumar Singh", room: "NLH2" },
  { branch: "MCA", semester: 3, day: "Friday", start_time: "14:00:00", end_time: "16:00:00", subject: "Operating System Lab", faculty: "Dr. Dinesh Singh", room: "CCTF Lab CSED" },

  // MCA 1st Semester
  { branch: "MCA", semester: 1, day: "Monday", start_time: "08:00:00", end_time: "09:00:00", subject: "Principles of IT Industries Management", faculty: "Dr. Kapil", room: "NLH2" },
  { branch: "MCA", semester: 1, day: "Monday", start_time: "10:00:00", end_time: "11:00:00", subject: "Shell Programming Lab (Group A)", faculty: "Dr. Prasun Chandra Tripathi", room: "L1 Lab CSED" },
  { branch: "MCA", semester: 1, day: "Monday", start_time: "13:00:00", end_time: "14:00:00", subject: "Digital Computer Organization", faculty: "Mr. Rajesh Tripathi", room: "NLH2" },
  { branch: "MCA", semester: 1, day: "Monday", start_time: "15:00:00", end_time: "17:00:00", subject: "Digital Computer Organization Lab (Group A)", faculty: "Mr. Rajesh Tripathi", room: "L1 Lab" },

  { branch: "MCA", semester: 1, day: "Tuesday", start_time: "09:00:00", end_time: "11:00:00", subject: "Programming & Problem Solving", faculty: "Dr. Manoj Wairiya", room: "NLH2" },
  { branch: "MCA", semester: 1, day: "Tuesday", start_time: "13:00:00", end_time: "14:00:00", subject: "Principles of IT Industries Management", faculty: "Dr. Kapil", room: "NLH2" },
  { branch: "MCA", semester: 1, day: "Tuesday", start_time: "15:00:00", end_time: "17:00:00", subject: "Programming & Problem Solving Lab (Group A)", faculty: "Dr. Manoj Wairiya", room: "L1 Lab" },

  { branch: "MCA", semester: 1, day: "Wednesday", start_time: "08:00:00", end_time: "09:00:00", subject: "Programming & Problem Solving", faculty: "Dr. Manoj Wairiya", room: "NLH2" },
  { branch: "MCA", semester: 1, day: "Wednesday", start_time: "09:00:00", end_time: "10:00:00", subject: "Foundation of Logic", faculty: "Dr. Kapil", room: "NLH2" },
  { branch: "MCA", semester: 1, day: "Wednesday", start_time: "13:00:00", end_time: "14:00:00", subject: "Digital Computer Organization", faculty: "Mr. Rajesh Tripathi", room: "NLH2" },
  { branch: "MCA", semester: 1, day: "Wednesday", start_time: "15:00:00", end_time: "17:00:00", subject: "Shell Programming Lab (Group B)", faculty: "Dr. Ranvijay", room: "CCTF Lab" },

  { branch: "MCA", semester: 1, day: "Thursday", start_time: "09:00:00", end_time: "11:00:00", subject: "Programming & Problem Solving Lab (Group B)", faculty: "Dr. Prasun Chandra Tripathi", room: "L1 Lab CSED" },
  { branch: "MCA", semester: 1, day: "Thursday", start_time: "14:00:00", end_time: "15:00:00", subject: "Foundation of Logic", faculty: "Dr. Kapil", room: "NLH2" },
  { branch: "MCA", semester: 1, day: "Thursday", start_time: "16:00:00", end_time: "18:00:00", subject: "Digital Computer Organization Lab (Group B)", faculty: "Mr. Rajesh Tripathi", room: "L1 Lab" },

  { branch: "MCA", semester: 1, day: "Friday", start_time: "08:00:00", end_time: "10:00:00", subject: "Foundation of Logic", faculty: "Dr. Kapil", room: "NLH2" },
  { branch: "MCA", semester: 1, day: "Friday", start_time: "14:00:00", end_time: "15:00:00", subject: "Programming & Problem Solving", faculty: "Dr. Manoj Wairiya", room: "NLH2" },
  { branch: "MCA", semester: 1, day: "Friday", start_time: "15:00:00", end_time: "17:00:00", subject: "Digital Computer Organization", faculty: "Mr. Rajesh Tripathi", room: "NLH2" },

  // MCA 5th Semester
  { branch: "MCA", semester: 5, day: "Monday", start_time: "08:00:00", end_time: "09:00:00", subject: "Multimedia Technology", faculty: "Dr. Himanshu Nandanwar", room: "GS8" },
  { branch: "MCA", semester: 5, day: "Monday", start_time: "09:00:00", end_time: "11:00:00", subject: "PE-II (Web Mining)", faculty: "Dr. Dinesh Singh", room: "GS8" },
  { branch: "MCA", semester: 5, day: "Monday", start_time: "13:00:00", end_time: "15:00:00", subject: "PE-III (SW Testing)", faculty: "Prof. Anoj Kumar", room: "GS8" },

  { branch: "MCA", semester: 5, day: "Tuesday", start_time: "08:00:00", end_time: "09:00:00", subject: "E-Commerce", faculty: "Dr. Komal Gupta", room: "NLH1" },
  { branch: "MCA", semester: 5, day: "Tuesday", start_time: "09:00:00", end_time: "11:00:00", subject: "Multimedia Technology Lab", faculty: "Dr. Himanshu Nandanwar", room: "CCTF Lab" },
  { branch: "MCA", semester: 5, day: "Tuesday", start_time: "13:00:00", end_time: "14:00:00", subject: "PE-III (SW Testing)", faculty: "Prof. Anoj Kumar", room: "GS8" },
  { branch: "MCA", semester: 5, day: "Tuesday", start_time: "14:00:00", end_time: "16:00:00", subject: "E-Commerce Lab", faculty: "Dr. Komal Gupta", room: "CCTF Lab" },

  { branch: "MCA", semester: 5, day: "Wednesday", start_time: "08:00:00", end_time: "09:00:00", subject: "Software Project Management", faculty: "Dr. Shreeya Swagatika Sahoo", room: "GS8" },
  { branch: "MCA", semester: 5, day: "Wednesday", start_time: "09:00:00", end_time: "10:00:00", subject: "Professional Ethics", faculty: "Dr. Kailash W. Kalare", room: "GS8" },
  { branch: "MCA", semester: 5, day: "Wednesday", start_time: "10:00:00", end_time: "11:00:00", subject: "PE-II (Web Mining)", faculty: "Dr. Dinesh Singh", room: "GS8" },
  { branch: "MCA", semester: 5, day: "Wednesday", start_time: "14:00:00", end_time: "15:00:00", subject: "Software Project Management", faculty: "Dr. Shreeya Swagatika Sahoo", room: "GS8" },

  { branch: "MCA", semester: 5, day: "Thursday", start_time: "08:00:00", end_time: "09:00:00", subject: "Multimedia Technology", faculty: "Dr. Himanshu Nandanwar", room: "GS8" },
  { branch: "MCA", semester: 5, day: "Thursday", start_time: "15:00:00", end_time: "16:00:00", subject: "E-Commerce", faculty: "Dr. Komal Gupta", room: "GS8" },

  { branch: "MCA", semester: 5, day: "Friday", start_time: "08:00:00", end_time: "10:00:00", subject: "E-Commerce", faculty: "Dr. Komal Gupta", room: "GS8" },
  { branch: "MCA", semester: 5, day: "Friday", start_time: "14:00:00", end_time: "15:00:00", subject: "Multimedia Technology", faculty: "Dr. Himanshu Nandanwar", room: "GS8" },
  { branch: "MCA", semester: 5, day: "Friday", start_time: "15:00:00", end_time: "16:00:00", subject: "Professional Ethics", faculty: "Dr. Kailash W. Kalare", room: "GS8" },
];

/**
 * Score a faculty member based on specific name, initials, exact subject phrase, or aliases
 */
function scoreFacultyMatch(faculty, userQuery) {
  const cleanQuery = " " + userQuery.toLowerCase().replace(/[^a-z0-9]/g, " ").replace(/\s+/g, " ") + " ";
  const fName = faculty.name.toLowerCase();
  const fInit = (faculty.initials || "").toLowerCase();
  const subs = Array.isArray(faculty.subjects) ? faculty.subjects : (faculty.subject ? [faculty.subject] : []);

  let maxScore = 0;

  // 1. Exact full name match
  if (cleanQuery.includes(" " + fName + " ")) return 100;

  // 2. Exact last name / distinctive token match
  const nameParts = fName.replace(/(dr\.|prof\.|lt\.|mr\.)/g, "").trim().split(/\s+/).filter(p => p.length > 3);
  for (const part of nameParts) {
    if (cleanQuery.includes(" " + part + " ")) {
      maxScore = Math.max(maxScore, 95);
    }
  }

  // 3. Initials match
  if (fInit && cleanQuery.includes(" " + fInit + " ")) {
    maxScore = Math.max(maxScore, 90);
  }

  // 4. Exact Subject Phrase match
  for (const sub of subs) {
    const sLower = sub.toLowerCase();
    if (cleanQuery.includes(" " + sLower + " ")) {
      maxScore = Math.max(maxScore, 100);
    }
  }

  // 5. Subject Alias matching (e.g. "dbms" -> matches "Data Management System")
  for (const [aliasKey, aliasList] of Object.entries(SUBJECT_ALIASES)) {
    const queryHasAlias = aliasList.some(a => cleanQuery.includes(" " + a + " "));
    if (queryHasAlias) {
      const facultyTeachesAlias = subs.some(s => {
        const sLow = s.toLowerCase();
        return aliasList.some(a => sLow.includes(a));
      });
      if (facultyTeachesAlias) {
        maxScore = Math.max(maxScore, 90);
      }
    }
  }

  return maxScore;
}

/**
 * Filter faculty strictly to only the highest-scoring specific match(es)
 */
function findBestFacultyMatches(facultyList, userQuery) {
  const scored = facultyList.map(f => ({
    faculty: f,
    score: scoreFacultyMatch(f, userQuery),
  }));

  const bestScore = Math.max(...scored.map(s => s.score));

  if (bestScore >= 85) {
    return scored.filter(s => s.score === bestScore).map(s => s.faculty);
  }

  return [];
}

/**
 * Extract time/day/branch details from user query
 */
function extractQueryDetails(message) {
  const lower = (message || "").toLowerCase();

  let detectedDay = null;
  const now = new Date();
  if (lower.includes("tomorrow")) {
    const tomorrowIndex = (now.getDay() + 1) % 7;
    detectedDay = DAY_NAMES[tomorrowIndex];
  } else if (lower.includes("today")) {
    detectedDay = DAY_NAMES[now.getDay()];
  } else {
    for (const d of ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]) {
      if (lower.includes(d)) {
        detectedDay = d.charAt(0).toUpperCase() + d.slice(1);
        break;
      }
    }
  }

  let detectedBranch = null;
  if (lower.includes("cse") || lower.includes("computer science") || lower.includes("b.tech") || lower.includes("btech")) {
    detectedBranch = "CSE";
  } else if (lower.includes("mca")) {
    detectedBranch = "MCA";
  }

  let detectedSemester = null;
  const semMatch = lower.match(/(?:sem|semester)\s*([1-8])|(1st|2nd|3rd|4th|5th|6th|7th|8th)\s*(?:sem|semester)?/);
  if (semMatch) {
    if (semMatch[1]) detectedSemester = parseInt(semMatch[1], 10);
    else if (semMatch[2]) detectedSemester = parseInt(semMatch[2].charAt(0), 10);
  }

  return { detectedDay, detectedBranch, detectedSemester, lower };
}

/**
 * Filter in-memory verified timetable
 */
function filterVerifiedTimetable({ detectedDay, detectedBranch, detectedSemester }) {
  let list = VERIFIED_TIMETABLE;

  if (detectedBranch) {
    list = list.filter(r => (r.branch || "").toUpperCase() === detectedBranch.toUpperCase());
  }
  if (detectedDay && detectedDay !== "Sunday") {
    list = list.filter(r => (r.day || "").toLowerCase() === detectedDay.toLowerCase());
  }
  if (detectedSemester) {
    list = list.filter(r => r.semester === detectedSemester);
  }

  return list;
}

/**
 * Fetch targeted campus data from MySQL or verified directory
 */
async function fetchCampusData(intent, userMessage) {
  const { detectedDay, detectedBranch, detectedSemester, lower } = extractQueryDetails(userMessage);

  // ── 1. FACULTY INTENT ───────────────────────────────────────────────────────
  if (intent === "faculty") {
    try {
      const [dbRows] = await pool.query("SELECT * FROM faculty");
      if (dbRows && dbRows.length > 0) {
        const bestDbMatches = findBestFacultyMatches(dbRows, userMessage);
        if (bestDbMatches.length > 0) {
          return { rows: bestDbMatches, details: { type: "faculty" } };
        }
      }
    } catch (e) {
      // fallback to in-memory
    }

    const bestMemMatches = findBestFacultyMatches(VERIFIED_FACULTY, userMessage);
    if (bestMemMatches.length > 0) {
      return { rows: bestMemMatches, details: { type: "faculty" } };
    }

    return { rows: [], details: { type: "faculty" } };
  }

  // ── 2. TIMETABLE INTENT ─────────────────────────────────────────────────────
  if (intent === "timetable") {
    try {
      let sql = "SELECT * FROM timetable WHERE 1=1";
      const params = [];

      if (detectedBranch) {
        sql += " AND UPPER(branch) = ?";
        params.push(detectedBranch);
      }
      if (detectedDay && detectedDay !== "Sunday") {
        sql += " AND LOWER(day) = LOWER(?)";
        params.push(detectedDay);
      }
      if (detectedSemester) {
        sql += " AND semester = ?";
        params.push(detectedSemester);
      }

      sql += " ORDER BY branch, semester, FIELD(day, 'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'), start_time LIMIT 50";

      const [rows] = await pool.query(sql, params);

      if (rows.length > 0) {
        return { rows, details: { detectedDay, detectedBranch, detectedSemester } };
      }

      if (detectedDay && detectedDay !== "Sunday") {
        const [fallbackRows] = await pool.query("SELECT * FROM timetable WHERE LOWER(day) = LOWER(?) ORDER BY branch, semester, start_time LIMIT 50", [detectedDay]);
        if (fallbackRows.length > 0) {
          return { rows: fallbackRows, details: { detectedDay, detectedBranch, detectedSemester } };
        }
      }
    } catch (e) {
      // ignore db error
    }

    // Use Verified In-Memory Timetable as ultimate guarantee
    const memRows = filterVerifiedTimetable({ detectedDay, detectedBranch, detectedSemester });
    if (memRows.length > 0) {
      return { rows: memRows, details: { detectedDay, detectedBranch, detectedSemester } };
    }

    // Default to MCA 3rd sem if no filter
    return { rows: VERIFIED_TIMETABLE.filter(r => r.semester === 3), details: { detectedDay, detectedBranch, detectedSemester } };
  }

  // ── 3. ROOM INTENT ──────────────────────────────────────────────────────────
  if (intent === "room") {
    try {
      const [allRooms] = await pool.query("SELECT * FROM rooms");
      if (allRooms && allRooms.length > 0) {
        const matched = allRooms.filter(r => {
          const rName = (r.room_name || "").toLowerCase().replace(/\s+/g, "");
          const cleanLower = lower.replace(/\s+/g, "");
          return cleanLower.includes(rName) || lower.includes((r.room_name || "").toLowerCase());
        });

        if (matched.length > 0) {
          return { rows: matched, details: {} };
        }
        return { rows: allRooms.slice(0, 10), details: {} };
      }
    } catch (e) {
      // fallback to verified rooms
    }

    const matchedMem = VERIFIED_ROOMS.filter(r => {
      const rName = (r.room_name || "").toLowerCase().replace(/\s+/g, "");
      const cleanLower = lower.replace(/\s+/g, "");
      return cleanLower.includes(rName) || lower.includes((r.room_name || "").toLowerCase());
    });

    if (matchedMem.length > 0) {
      return { rows: matchedMem, details: {} };
    }
    return { rows: VERIFIED_ROOMS.slice(0, 10), details: {} };
  }

  // ── 4. EVENT INTENT ─────────────────────────────────────────────────────────
  if (intent === "event") {
    try {
      const [rows] = await pool.query("SELECT * FROM events ORDER BY event_date ASC LIMIT 10");
      if (rows && rows.length > 0) return { rows, details: {} };
    } catch (e) {}
    return { rows: [], details: {} };
  }

  // ── 5. NOTICE INTENT ────────────────────────────────────────────────────────
  if (intent === "notice") {
    try {
      const [rows] = await pool.query("SELECT id, title, uploaded_at, extracted_text FROM notices ORDER BY uploaded_at DESC LIMIT 5");
      if (rows && rows.length > 0) return { rows, details: {} };
    } catch (e) {}
    return { rows: [], details: {} };
  }

  // Fallback faculty check
  const fallbackFaculty = findBestFacultyMatches(VERIFIED_FACULTY, userMessage);
  if (fallbackFaculty.length > 0) {
    return { rows: fallbackFaculty, details: { type: "faculty" } };
  }

  return { rows: [], details: {} };
}

/**
 * Direct Formatter
 */
function formatDbFallback(intent, { rows, details }, message) {
  if (!rows || rows.length === 0) {
    return "I couldn't find any matching records in the MNNIT campus database for your query. Please check your query or verify database records.";
  }

  if (intent === "faculty" || details.type === "faculty") {
    if (rows.length === 1) {
      const f = rows[0];
      const subs = Array.isArray(f.subjects) ? f.subjects.join(", ") : (f.subject || "N/A");
      return `👨‍🏫 **Faculty Details:**\n• **Name:** ${f.name} ${f.initials ? `(${f.initials})` : ''}\n• **Department:** ${f.department || 'Computer Science & Engineering'}\n• **Subject(s):** **${subs}**\n• **Cabin:** **${f.cabin_no || 'N/A'}**\n• **Email:** ✉️ ${f.email || 'N/A'}`;
    }
    return `👨‍🏫 **Faculty Details:**\n\n` +
      rows.map(f => {
        const subs = Array.isArray(f.subjects) ? f.subjects.join(", ") : (f.subject || "N/A");
        return `• **${f.name}** ${f.initials ? `(${f.initials})` : ''}: Teaches **${subs}** | Cabin: **${f.cabin_no || 'N/A'}** | Email: ${f.email || 'N/A'}`;
      }).join("\n");
  }

  if (intent === "timetable") {
    const dayLabel = details.detectedDay || "Weekly";
    const branchLabel = details.detectedBranch ? `(${details.detectedBranch})` : "";

    const groups = {};
    for (const r of rows) {
      const groupKey = `${r.branch || 'MCA'} - Semester ${r.semester || '3rd'}`;
      if (!groups[groupKey]) groups[groupKey] = [];
      groups[groupKey].push(r);
    }

    let response = `📅 **${dayLabel} Class Schedule ${branchLabel}:**\n\n`;
    for (const [groupName, items] of Object.entries(groups)) {
      response += `🎓 **${groupName}:**\n`;
      for (const item of items) {
        const timeStr = `${(item.start_time || '').slice(0, 5)} - ${(item.end_time || '').slice(0, 5)}`;
        response += `  • **${item.subject}** | ⏰ ${timeStr} | 📍 Room: **${item.room || 'TBA'}** | 👨‍🏫 ${item.faculty || 'Faculty'}\n`;
      }
      response += `\n`;
    }
    return response.trim();
  }

  if (intent === "room") {
    if (rows.length === 1) {
      const r = rows[0];
      return `📍 **${r.room_name} Location:**\n• **Building/Block:** ${r.block || 'MNNIT Campus'}\n• **Floor:** Floor ${r.floor ?? 'Ground'}\n• **Type:** ${r.type || 'Room'}\n• **Capacity:** ${r.capacity || 'N/A'} seats`;
    }
    return `📍 **Campus Rooms & Labs:**\n\n` +
      rows.map(r => `• **${r.room_name}**: ${r.block || 'Main'}, Floor ${r.floor ?? 'Ground'} (${r.type || 'Classroom'}, Capacity: ${r.capacity || 'N/A'})`).join("\n");
  }

  if (intent === "event") {
    return `🎉 **Upcoming Campus Events:**\n\n` +
      rows.map(r => `• **${r.title}**: ${r.event_date ? new Date(r.event_date).toLocaleDateString() : 'Upcoming'} at **${r.venue || 'Campus'}** (${r.organizer || 'MNNIT'})`).join("\n");
  }

  if (intent === "notice") {
    return `📢 **Latest Campus Notices:**\n\n` +
      rows.map(r => `• **${r.title}** (Uploaded: ${r.uploaded_at ? new Date(r.uploaded_at).toLocaleDateString() : 'Recent'})`).join("\n");
  }

  return "Here is the campus information retrieved from the database.";
}

/**
 * handleChat — controller for POST /api/chat
 */

const handleChat = async (req, res) => {
  const { message } = req.body;

  if (!message || typeof message !== "string" || !message.trim()) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid message."
    });
  }

  const userMessage = message.trim();

  try {
    const intent = parseIntent(userMessage);

    console.log(`[Chat] intent="${intent}" | message="${userMessage}"`);

    const queryData = await fetchCampusData(intent, userMessage);

    // These queries already have structured database answers.
    // No need to call Gemini.
    const directIntents = ["room", "faculty", "timetable", "event"];

    if (directIntents.includes(intent)) {
      const reply = formatDbFallback(intent, queryData, userMessage);

      return res.status(200).json({
        success: true,
        data: { reply }
      });
    }

    // Use Gemini for other conversational queries.
    const contextData = queryData.rows.length > 0
      ? JSON.stringify(queryData.rows, null, 2)
      : "No specific campus data found.";

    try {
      const reply = await getAIAnswer(userMessage, contextData);

      return res.status(200).json({
        success: true,
        data: { reply }
      });

    } catch (aiErr) {
      console.error("[Chat] Gemini error:", aiErr.message);

      return res.status(200).json({
        success: true,
        data: {
          reply: formatDbFallback(intent, queryData, userMessage)
        }
      });
    }

  } catch (err) {
    console.error("[Chat] Error:", err);

    return res.status(500).json({
      success: false,
      message: err.message || "Something went wrong."
    });
  }
};


module.exports = { handleChat };
