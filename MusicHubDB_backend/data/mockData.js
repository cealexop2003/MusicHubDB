// Mock data based on MusicHubDB schema

const users = [
  { user_id: 1, concert_id: 6, name: 'Julian Casablancas', email: 'julian@strokes.com', password: 'password123', age: 45, address: 'Tsimiski 100, Thessaloniki', range: 'A2-E5' },
  { user_id: 7891, concert_id: null, name: 'Nick Valensi', email: 'nick@strokes.com', password: 'password123', age: 42, address: 'Mitropoleos 50, Thessaloniki', range: 'G2-C5' },
  { user_id: 9431, concert_id: null, name: 'Fabrizio Moretti', email: 'fab@strokes.com', password: 'password123', age: 43, address: 'Egnatia 75, Thessaloniki', range: null },
  { user_id: 15627, concert_id: 579, name: 'Albert Hammond Jr.', email: 'albert@strokes.com', password: 'password123', age: 43, address: 'Aristotelous 25, Thessaloniki', range: 'A2-D5' },
  { user_id: 9888, concert_id: null, name: 'Nikolai Fraiture', email: 'nikolai@strokes.com', password: 'password123', age: 44, address: 'Proxenou Koromila 15, Thessaloniki', range: 'E1-A3' },
  { user_id: 12345, concert_id: null, name: 'Maria Papadopoulou', email: 'maria@music.gr', password: 'password123', age: 28, address: 'Komninon 8, Thessaloniki', range: 'C3-A5' },
  { user_id: 27111, concert_id: null, name: 'Dimitris Nikolaidis', email: 'dimitris@music.gr', password: 'password123', age: 35, address: 'Vasilissis Olgas 45, Thessaloniki', range: 'F2-C5' },
  { user_id: 32673, concert_id: 999, name: 'Sofia Georgiou', email: 'sofia@music.gr', password: 'password123', age: 26, address: 'Karaoli kai Dimitriou 30, Thessaloniki', range: 'D3-B5' },
  { user_id: 39037, concert_id: 888, name: 'Alexandros Petrou', email: 'alex@music.gr', password: 'password123', age: 31, address: 'Leontos Sofou 12, Thessaloniki', range: 'B2-F4' },
  { user_id: 58958, concert_id: null, name: 'Elena Katsarou', email: 'elena@music.gr', password: 'password123', age: 22, address: 'Agias Sofias 60, Thessaloniki', range: 'E3-C6' },
  { user_id: 49834, concert_id: null, name: 'Giorgos Ioannou', email: 'giorgos@music.gr', password: 'password123', age: 19, address: 'Ethnikis Aminis 20, Thessaloniki', range: 'G2-E5' }
];

const musicians = [
  { musician_id: 1, experience: 25, band_status: 1, genre: 'rock' },
  { musician_id: 7891, experience: 23, band_status: 1, genre: 'rock' },
  { musician_id: 9431, experience: 22, band_status: 0, genre: 'rock' },
  { musician_id: 15627, experience: 21, band_status: 1, genre: 'alternative' },
  { musician_id: 9888, experience: 20, band_status: 1, genre: 'rock' },
  { musician_id: 12345, experience: 8, band_status: 1, genre: 'folk' },
  { musician_id: 27111, experience: 15, band_status: 1, genre: 'country' },
  { musician_id: 32673, experience: 10, band_status: 1, genre: 'punk' },
  { musician_id: 39037, experience: 12, band_status: 1, genre: 'electronic' }
];

const bands = [
  { band_id: 1, name: 'The Strokes', creation_date: '1999', genre: 'rock', members_count: 5 },
  { band_id: 18, name: 'The Strokes', creation_date: '1998-01-01', genre: 'rock', members_count: 5 },
  { band_id: 89, name: "The Fae's Deceit", creation_date: '2000-01-01', genre: 'folk', members_count: 6 },
  { band_id: 125, name: '3 Psychos and their Therapist', creation_date: '2012-01-01', genre: 'alternative', members_count: 4 },
  { band_id: 234, name: "Worker's Rebellion", creation_date: '2007-01-01', genre: 'metal', members_count: 5 },
  { band_id: 361, name: 'The Yee-Haws and Doo-Dads', creation_date: '2020-01-01', genre: 'country', members_count: 7 }
];

const concerts = [
  { concert_id: 6, band_id: 18, musician_id: 1, instruments: 'vocals', name: 'Sweet & Sticky', date: '2026-06-16', price: 15, genre: 'rock', address: 'Florinis 4', artist: 'BMBLBZ', start_time: '21:30', end_time: '00:30' },
  { concert_id: 173, band_id: 89, musician_id: 909, instruments: 'vocals', name: 'Lost in Diablo', date: '2026-08-05', price: 18, genre: 'metal', address: 'Kasandrou 3', artist: 'The Unloved', start_time: '22:30', end_time: '01:00' },
  { concert_id: 579, band_id: 125, musician_id: 15627, instruments: 'vocals', name: "Bach's Dreams", date: '2026-02-28', price: 45, genre: 'classical', address: 'Thetidos 2', artist: 'Ethereal Quartet', start_time: '19:30', end_time: '21:45' },
  { concert_id: 888, band_id: 234, musician_id: 39037, instruments: 'vocals', name: 'Techno Overdrive', date: '2026-03-31', price: 35, genre: 'electronic', address: 'Afroditis 15', artist: 'Protons, Neutrons & Electrons', start_time: '23:00', end_time: '04:00' },
  { concert_id: 999, band_id: 361, musician_id: 32673, instruments: 'vocals', name: 'Revolution Paid by Blood', date: '2026-05-12', price: 30, genre: 'punk', address: 'Evrou 13', artist: "Anarchy's the Way", start_time: '22:00', end_time: '00:30' }
];

const jamSessions = [
  { jam_id: 29, date: '23/11/25', address: 'Skra 25', genre: 'rock', start_time: '18:00', end_time: '20:30', participants: 6 },
  { jam_id: 1745, date: '27/01/26', address: 'Filippou 21', genre: 'R&B', start_time: '17:00', end_time: '19:00', participants: 3 },
  { jam_id: 2017, date: '24/08/26', address: 'Eolou 5', genre: 'hip-hop', start_time: '19:00', end_time: '20:30', participants: 4 },
  { jam_id: 2095, date: '08/10/26', address: 'Armenopoulou 18', genre: 'electronic', start_time: '21:00', end_time: '22:30', participants: 8 },
  { jam_id: 2096, date: '15/06/26', address: 'Kassandrou 87', genre: 'folk', start_time: '16:00', end_time: '18:00', participants: 5 }
];

const instruments = [
  { instrument_id: 1, user_id: 7891, type: 'string', name: 'electric_guitar' },
  { instrument_id: 3, user_id: 9431, type: 'percussion', name: 'drums' },
  { instrument_id: 7, user_id: 58958, type: 'string', name: 'cello' },
  { instrument_id: 14, user_id: 49834, type: 'string', name: 'piano' },
  { instrument_id: 23, user_id: 1, type: 'wood_winds', name: 'flute' }
];

const students = [
  { student_id: 58958, lesson_format: 'online' },
  { student_id: 49834, lesson_format: 'in-person' }
];

const teachers = [
  { teacher_id: 12345, lesson_format: 'both', experience: 5, certification: 1, hourly_wage: 25 },
  { teacher_id: 27111, lesson_format: 'in-person', experience: 10, certification: 1, hourly_wage: 35 }
];

const lessons = [
  { lesson_id: 1, teacher_id: 12345, student_id: 58958, lesson_format: 'online', address: 'Online', instrument: 'cello', start_time: '18:00', end_time: '19:00', date: '2026-01-15' },
  { lesson_id: 2, teacher_id: 27111, student_id: 49834, lesson_format: 'in-person', address: 'Tsimiski 45', instrument: 'piano', start_time: '16:00', end_time: '17:30', date: '2026-01-20' }
];

const bandsHaveMusicians = [
  { band_id: 125, musician_id: 9888 },
  { band_id: 234, musician_id: 12345 },
  { band_id: 89, musician_id: 15627 },
  { band_id: 361, musician_id: 27111 },
  { band_id: 18, musician_id: 37611 }
];

const jamSessionsHaveMusicians = [
  { jam_id: 2095, musician_id: 9888 },
  { jam_id: 2096, musician_id: 12345 },
  { jam_id: 1745, musician_id: 15627 },
  { jam_id: 2017, musician_id: 27111 },
  { jam_id: 29, musician_id: 37611 }
];

// Requests mock data
const jamSessionRequests = [
  // { request_id: 1, jam_id: 29, musician_id: 7891, status: 'pending', created_at: '2025-12-20' }
];

const bandRequests = [
  // { request_id: 1, band_id: 18, musician_id: 9431, status: 'pending', created_at: '2025-12-20' }
];

const lessonRequests = [
  // { request_id: 1, teacher_id: 7891, student_id: 12345, status: 'pending', created_at: '2025-12-20' }
];

const concertInterests = [
  // { interest_id: 1, concert_id: 6, user_id: 7891, created_at: '2025-12-20' }
];

module.exports = {
  users,
  musicians,
  bands,
  concerts,
  jamSessions,
  instruments,
  students,
  teachers,
  lessons,
  bandsHaveMusicians,
  jamSessionsHaveMusicians,
  jamSessionRequests,
  bandRequests,
  lessonRequests,
  concertInterests
};
