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

export default api;
