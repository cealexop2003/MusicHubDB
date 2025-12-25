import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Musicians
export const getMusicians = () => api.get('/musicians');
export const getMusician = (id) => api.get(`/musicians/${id}`);

// Bands
export const getBands = () => api.get('/bands');
export const getBand = (id) => api.get(`/bands/${id}`);

// Concerts
export const getConcerts = () => api.get('/concerts');
export const getConcert = (id) => api.get(`/concerts/${id}`);

// Jam Sessions
export const getJamSessions = () => api.get('/jam-sessions');
export const getJamSession = (id) => api.get(`/jam-sessions/${id}`);

// Teachers
export const getTeachers = () => api.get('/teachers');
export const getTeacher = (id) => api.get(`/teachers/${id}`);

// Students
export const getStudents = () => api.get('/students');
export const getStudent = (id) => api.get(`/students/${id}`);

// Instruments
export const getInstruments = () => api.get('/instruments');
export const getInstrument = (id) => api.get(`/instruments/${id}`);

// Users
export const getUsers = () => api.get('/users');
export const getUser = (id) => api.get(`/users/${id}`);

// Authentication
export const login = (credentials) => api.post('/auth/login', credentials);
export const signup = (userData) => api.post('/auth/signup', userData);

// Requests
export const getMyRequests = (userId) => api.get(`/requests/my-requests/${userId}`);
export const requestJamSession = (data) => api.post('/requests/jam-session', data);
export const cancelJamSessionRequest = (musicianId, jamId) => api.delete(`/requests/jam-session/${musicianId}/${jamId}`);
export const requestBand = (data) => api.post('/requests/band', data);
export const cancelBandRequest = (musicianId, bandId) => api.delete(`/requests/band/${musicianId}/${bandId}`);
export const requestLesson = (data) => api.post('/requests/lesson', data);
export const cancelLessonRequest = (studentId, teacherId) => api.delete(`/requests/lesson/${studentId}/${teacherId}`);
export const showConcertInterest = (data) => api.post('/requests/concert', data);
export const removeConcertInterest = (userId, concertId) => api.delete(`/requests/concert/${userId}/${concertId}`);
export const approveJamRequest = (requestId, status) => api.put(`/requests/jam-session/${requestId}`, { status });
export const approveBandRequest = (requestId, status) => api.put(`/requests/band/${requestId}`, { status });
export const approveLessonRequest = (requestId, status) => api.put(`/requests/lesson/${requestId}`, { status });
export const getTeacherLessonRequests = (teacherId) => api.get(`/requests/lesson/teacher/${teacherId}`);

export default api;
