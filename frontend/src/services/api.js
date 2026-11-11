import axios from 'axios';

// Base Axios instance
const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 90000,
});

/**
 * 1. POST /api/chat
 * @param {string} message - User question
 * @returns {Promise<{ success: boolean, data: { reply: string } }>}
 */
export const sendChatMessage = async (message) => {
  const response = await API.post('/chat', { message });
  return response.data;
};

/**
 * 2. GET /api/timetable?day=Monday&branch=CSE
 * @param {string} [day] - Day of the week (e.g. 'Monday')
 * @param {string} [branch] - Branch name (e.g. 'CSE')
 * @returns {Promise<{ success: boolean, data: Array<{ subject: string, faculty: string, room: string, start_time: string, end_time: string }> }>}
 */
export const getTimetable = async (day, branch) => {
  const params = {};
  if (day) params.day = day;
  if (branch) params.branch = branch;
  const response = await API.get('/timetable', { params });
  return response.data;
};

/**
 * 3. GET /api/events
 * @returns {Promise<{ success: boolean, data: Array<{ title: string, venue: string, event_date: string, event_time: string, organizer: string }> }>}
 */
export const getEvents = async () => {
  const response = await API.get('/events');
  return response.data;
};

/**
 * 4. GET /api/rooms/:room_name (e.g. /api/rooms/Lab3)
 * @param {string} roomName
 * @returns {Promise<{ success: boolean, data: { room_name: string, block: string, floor: number, capacity: number, type: string } }>}
 */
export const getRoomDetails = async (roomName) => {
  const response = await API.get(`/rooms/${encodeURIComponent(roomName)}`);
  return response.data;
};

/**
 * 5. GET /api/faculty/:name (e.g. /api/faculty/Dr. Sharma)
 * @param {string} name
 * @returns {Promise<{ success: boolean, data: { name: string, subject: string, email: string, department: string, cabin_no: string } }>}
 */
export const getFacultyDetails = async (name) => {
  const response = await API.get(`/faculty/${encodeURIComponent(name)}`);
  return response.data;
};

/**
 * 6. POST /api/notices/upload
 * @param {FormData|File} fileOrFormData - Either a File object or pre-constructed FormData
 * @returns {Promise<{ success: boolean, data: { id: number, title: string, message: string } }>}
 */
export const uploadNotice = async (fileOrFormData) => {
  let data;
  if (fileOrFormData instanceof FormData) {
    data = fileOrFormData;
  } else {
    data = new FormData();
    data.append('notice', fileOrFormData);
  }

  const response = await API.post('/notices/upload', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

/**
 * 7. POST /api/notices/ask
 * @param {number|string} noticeId
 * @param {string} question
 * @returns {Promise<{ success: boolean, data: { answer: string } }>}
 */
export const askNoticeQuestion = async (noticeId, question) => {
  const response = await API.post('/notices/ask', {
    notice_id: noticeId,
    question,
  });
  return response.data;
};

export default API;
