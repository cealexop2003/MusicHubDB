# 🏗️ MusicHubDB - System Architecture

## 🎯 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      USER BROWSER                            │
│                   http://localhost:3000                      │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ HTTP Requests/Responses
                         │
┌────────────────────────▼────────────────────────────────────┐
│                  REACT FRONTEND                              │
│                  (Port 3000)                                 │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  App.js (React Router)                               │   │
│  │  ┌────────────┬──────────────┬─────────────────┐    │   │
│  │  │ Home       │ Musicians    │ Bands           │    │   │
│  │  │ Concerts   │ JamSessions  │ Teachers        │    │   │
│  │  │ Students   │ Detail Pages │ Navigation      │    │   │
│  │  └────────────┴──────────────┴─────────────────┘    │   │
│  └──────────────────────┬───────────────────────────────┘   │
│                         │                                    │
│  ┌──────────────────────▼───────────────────────────────┐   │
│  │  services/api.js (Axios HTTP Client)                 │   │
│  │  - getMusicians()    - getBands()                    │   │
│  │  - getConcerts()     - getJamSessions()              │   │
│  │  - getTeachers()     - getStudents()                 │   │
│  └──────────────────────┬───────────────────────────────┘   │
│                         │                                    │
└─────────────────────────┼────────────────────────────────────┘
                          │
                          │ GET /api/musicians
                          │ GET /api/bands
                          │ GET /api/concerts
                          │ etc.
                          │
┌─────────────────────────▼────────────────────────────────────┐
│                  EXPRESS BACKEND                              │
│                  (Port 5001)                                  │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐    │
│  │  server.js                                           │    │
│  │  - CORS middleware                                   │    │
│  │  - JSON parser                                       │    │
│  │  - Route registration                                │    │
│  └──────────────────────┬───────────────────────────────┘    │
│                         │                                     │
│  ┌──────────────────────▼───────────────────────────────┐    │
│  │  Routes (8 modules)                                  │    │
│  │  ┌──────────────┬───────────────┬─────────────────┐ │    │
│  │  │ musicians.js │ bands.js      │ concerts.js     │ │    │
│  │  │ jamSessions  │ teachers.js   │ students.js     │ │    │
│  │  │ instruments  │ users.js      │                 │ │    │
│  │  └──────────────┴───────────────┴─────────────────┘ │    │
│  └──────────────────────┬───────────────────────────────┘    │
│                         │                                     │
│  ┌──────────────────────▼───────────────────────────────┐    │
│  │  data/mockData.js                                    │    │
│  │  - users[]         - musicians[]                     │    │
│  │  - bands[]         - concerts[]                      │    │
│  │  - jamSessions[]   - instruments[]                   │    │
│  │  - teachers[]      - students[]                      │    │
│  │  - lessons[]       - relationships[]                 │    │
│  └──────────────────────────────────────────────────────┘    │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐    │
│  │  FUTURE: MySQL Database Connection                   │    │
│  │  (Will replace mockData.js)                          │    │
│  └──────────────────────────────────────────────────────┘    │
└───────────────────────────────────────────────────────────────┘
```

---

## 🔄 Request Flow Example

### Example: User views all musicians

```
1. USER ACTION
   └─> User clicks "Musicians" in navbar

2. FRONTEND (React)
   └─> Navigate to /musicians route
   └─> Musicians.js component loads
   └─> useEffect() runs on mount
   └─> Calls: getMusicians() from api.js

3. API SERVICE
   └─> axios.get('http://localhost:5001/api/musicians')
   └─> HTTP GET request sent

4. BACKEND (Express)
   └─> server.js receives request
   └─> Matches route: /api/musicians
   └─> Forwards to: routes/musicians.js
   └─> GET handler executes

5. DATA LAYER
   └─> Import from mockData.js
   └─> Get musicians[] array
   └─> Get users[] array
   └─> Get instruments[] array
   └─> Get bands[] array
   └─> Join data together

6. RESPONSE
   └─> Format as JSON
   └─> Send HTTP 200 response
   └─> Return combined data

7. FRONTEND RECEIVES
   └─> axios promise resolves
   └─> setMusicians(response.data)
   └─> React re-renders
   └─> Map musicians to cards

8. USER SEES
   └─> Grid of musician cards displayed
   └─> Can click for details
```

---

## 🎨 Frontend Component Tree

```
App.js (BrowserRouter)
│
├─ Navbar.js (Always visible)
│  └─ Links to all pages
│
└─ Routes
   ├─ / → Home.js
   │      └─ Feature cards linking to sections
   │
   ├─ /musicians → Musicians.js
   │      └─ API call → Card grid
   │
   ├─ /musicians/:id → MusicianDetail.js
   │      └─ API call → Detail view
   │
   ├─ /bands → Bands.js
   │      └─ API call → Card grid
   │
   ├─ /bands/:id → BandDetail.js
   │      └─ API call → Detail view
   │
   ├─ /concerts → Concerts.js
   │      └─ API call → Card grid
   │
   ├─ /concerts/:id → ConcertDetail.js
   │      └─ API call → Detail view
   │
   ├─ /jam-sessions → JamSessions.js
   │      └─ API call → Card grid
   │
   ├─ /jam-sessions/:id → JamSessionDetail.js
   │      └─ API call → Detail view
   │
   ├─ /teachers → Teachers.js
   │      └─ API call → Card grid
   │
   └─ /students → Students.js
          └─ API call → Card grid
```

---

## 🔌 Backend Route Structure

```
server.js
│
├─ Middleware
│  ├─ cors()
│  ├─ express.json()
│  └─ express.urlencoded()
│
├─ Route Registration
│  ├─ /api/musicians → routes/musicians.js
│  ├─ /api/bands → routes/bands.js
│  ├─ /api/concerts → routes/concerts.js
│  ├─ /api/jam-sessions → routes/jamSessions.js
│  ├─ /api/teachers → routes/teachers.js
│  ├─ /api/students → routes/students.js
│  ├─ /api/instruments → routes/instruments.js
│  └─ /api/users → routes/users.js
│
├─ Health Check
│  └─ /api/health
│
├─ 404 Handler
│  └─ All unmatched routes
│
└─ Error Handler
   └─ Global error catching
```

---

## 📊 Data Model (Mock Data)

```
Users (Base Entity)
├─ user_id (PK)
├─ concert_id (FK)
├─ name
├─ age
├─ address
└─ range

Musicians (Extends User)
├─ musician_id (PK, FK → User)
├─ experience
├─ band_status
└─ genre

Bands
├─ band_id (PK)
├─ name
├─ creation_date
├─ genre
└─ members_count

Concerts
├─ concert_id (PK)
├─ band_id (FK → Band)
├─ musician_id (FK → Musician)
├─ instruments
├─ name
├─ date
├─ price
├─ genre
├─ address
├─ artist
├─ start_time
└─ end_time

Jam-Sessions
├─ jam_id (PK)
├─ date
├─ address
├─ genre
├─ start_time
├─ end_time
└─ participants

Instruments
├─ instrument_id (PK)
├─ user_id (FK → User)
├─ type
└─ name

Teachers
├─ teacher_id (PK, FK → User)
├─ lesson_format
├─ experience
├─ certification
└─ hourly_wage

Students
├─ student_id (PK, FK → User)
└─ lesson_format

Relationships:
├─ Bands_Have_Musicians (M:N)
│  ├─ band_id (FK)
│  └─ musician_id (FK)
│
├─ Jam-Sessions_Have_Musicians (M:N)
│  ├─ jam_id (FK)
│  └─ musician_id (FK)
│
└─ Teachers_Give_Lessons_to_Students (M:N)
   ├─ teacher_id (FK)
   ├─ student_id (FK)
   └─ lesson details
```

---

## 🚀 Technology Stack

```
┌─────────────────────────────────────────┐
│           FRONTEND STACK                │
├─────────────────────────────────────────┤
│ React 18.2          │ UI Library        │
│ React Router 6.20   │ Client Routing    │
│ Axios 1.6.2         │ HTTP Client       │
│ CSS3                │ Styling           │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│           BACKEND STACK                 │
├─────────────────────────────────────────┤
│ Node.js             │ Runtime           │
│ Express 4.18        │ Web Framework     │
│ CORS 2.8            │ Cross-Origin      │
│ dotenv 16.3         │ Config            │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│           DATA LAYER (Current)          │
├─────────────────────────────────────────┤
│ JavaScript Objects  │ Mock Data         │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│           DATA LAYER (Future)           │
├─────────────────────────────────────────┤
│ MySQL 9.4           │ Database          │
│ mysql2              │ Driver            │
└─────────────────────────────────────────┘
```

---

## 🔐 Current vs Future Architecture

### Current (Mock Data):
```
Frontend → Backend → mockData.js → Return Data
```

### Future (Database):
```
Frontend → Backend → MySQL Connection → SQL Query → Return Data
```

**Migration is simple:**
1. Install mysql2
2. Create db/connection.js
3. Replace array operations with SQL queries
4. Same API endpoints, same frontend!

---

## 📈 Scalability Design

### Current Features:
- ✅ RESTful API design
- ✅ Separation of concerns
- ✅ Modular route structure
- ✅ Reusable React components
- ✅ Centralized API service

### Ready for Growth:
- 🔄 Easy to add new routes
- 🔄 Easy to add new components
- 🔄 Database swap without frontend changes
- 🔄 Can add authentication
- 🔄 Can add more CRUD operations
- 🔄 Can add search/filter features

---

## 🎯 Key Architectural Decisions

### Why This Structure?

1. **Separate Frontend/Backend**
   - Independent development
   - Can scale separately
   - Clear API contract

2. **Mock Data First**
   - Test architecture without DB
   - Easy development
   - Quick iteration

3. **Modular Routes**
   - Easy to maintain
   - Clear organization
   - Testable units

4. **Component-Based Frontend**
   - Reusable UI elements
   - Easy to update
   - Clean code structure

5. **Centralized API Service**
   - Single source of truth
   - Easy to modify endpoints
   - Consistent error handling

---

## 💡 Design Patterns Used

### Backend:
- **Router Pattern** - Modular route handlers
- **Middleware Pattern** - CORS, JSON parsing
- **Repository Pattern** - Data access (mockData.js)

### Frontend:
- **Component Pattern** - Reusable UI components
- **Container/Presentational** - Smart/dumb components
- **Service Layer** - API abstraction (api.js)
- **Router Pattern** - Client-side routing

---

**This architecture is production-ready and follows industry best practices!** 🚀
