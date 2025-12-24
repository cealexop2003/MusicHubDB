# 🔜 Phase 2: Connecting to MySQL Database

## 📋 Current Status

✅ Backend API working with mock data  
✅ Frontend displaying all features  
⏳ **Next:** Connect to actual MySQL database

---

## 🎯 Step-by-Step Database Integration

### Step 1: Install MySQL Driver

```bash
cd MusicHubDB_backend
npm install mysql2
```

### Step 2: Create Database Connection

Create file: `MusicHubDB_backend/db/connection.js`

```javascript
const mysql = require('mysql2/promise');
require('dotenv').config();

// Create connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test connection
pool.getConnection()
  .then(connection => {
    console.log('✅ Database connected successfully!');
    connection.release();
  })
  .catch(err => {
    console.error('❌ Database connection failed:', err.message);
  });

module.exports = pool;
```

### Step 3: Import Your Database

```bash
# Make sure MySQL is running
mysql -u root -p

# Create database and import
mysql -u root -p < /Users/chris/Desktop/MusicHubDB/musichubdbdump.sql

# Create users (if needed)
mysql -u root -p < /Users/chris/Desktop/MusicHubDB/users.sql
```

### Step 4: Update .env File

The `.env` file already has the correct values:
```
DB_HOST=localhost
DB_USER=app_admin
DB_PASSWORD=superpass
DB_NAME=MusicHubDB
```

### Step 5: Convert Routes to Use Database

**Example: routes/musicians.js**

Replace this:
```javascript
const { musicians, users, instruments, bands, bandsHaveMusicians } = require('../data/mockData');

router.get('/', (req, res) => {
  const musiciansWithDetails = musicians.map(musician => {
    const user = users.find(u => u.user_id === musician.musician_id);
    // ... more mock data manipulation
  });
  res.json(musiciansWithDetails);
});
```

With this:
```javascript
const pool = require('../db/connection');

router.get('/', async (req, res) => {
  try {
    const [musicians] = await pool.query(`
      SELECT 
        m.musician_id,
        m.experience,
        m.band_status,
        m.genre,
        u.name,
        u.age,
        u.address,
        u.range,
        u.concert_id
      FROM Musician m
      JOIN User u ON m.musician_id = u.user_id
    `);
    
    // Get instruments for each musician
    for (let musician of musicians) {
      const [instruments] = await pool.query(
        'SELECT * FROM Instrument WHERE user_id = ?',
        [musician.musician_id]
      );
      musician.instruments = instruments;
      
      // Get bands for each musician
      const [bands] = await pool.query(`
        SELECT b.* FROM Band b
        JOIN Bands_Have_Musicians bhm ON b.band_id = bhm.band_id
        WHERE bhm.musician_id = ?
      `, [musician.musician_id]);
      musician.bands = bands;
    }
    
    res.json(musicians);
  } catch (error) {
    console.error('Error fetching musicians:', error);
    res.status(500).json({ error: 'Failed to fetch musicians' });
  }
});
```

### Step 6: Update GET by ID Endpoint

```javascript
router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    // Get musician with user info
    const [musicians] = await pool.query(`
      SELECT 
        m.musician_id,
        m.experience,
        m.band_status,
        m.genre,
        u.name,
        u.age,
        u.address,
        u.range,
        u.concert_id
      FROM Musician m
      JOIN User u ON m.musician_id = u.user_id
      WHERE m.musician_id = ?
    `, [id]);
    
    if (musicians.length === 0) {
      return res.status(404).json({ error: 'Musician not found' });
    }
    
    const musician = musicians[0];
    
    // Get instruments
    const [instruments] = await pool.query(
      'SELECT * FROM Instrument WHERE user_id = ?',
      [id]
    );
    musician.instruments = instruments;
    
    // Get bands
    const [bands] = await pool.query(`
      SELECT b.* FROM Band b
      JOIN Bands_Have_Musicians bhm ON b.band_id = bhm.band_id
      WHERE bhm.musician_id = ?
    `, [id]);
    musician.bands = bands;
    
    res.json(musician);
  } catch (error) {
    console.error('Error fetching musician:', error);
    res.status(500).json({ error: 'Failed to fetch musician' });
  }
});
```

---

## 🔄 Complete Conversion Checklist

### Musicians Route (routes/musicians.js)
- [ ] GET /api/musicians - List all
- [ ] GET /api/musicians/:id - Get one
- [ ] POST /api/musicians - Create
- [ ] PUT /api/musicians/:id - Update
- [ ] DELETE /api/musicians/:id - Delete

### Bands Route (routes/bands.js)
- [ ] GET /api/bands - List all
- [ ] GET /api/bands/:id - Get one
- [ ] POST /api/bands - Create
- [ ] PUT /api/bands/:id - Update
- [ ] DELETE /api/bands/:id - Delete

### Concerts Route (routes/concerts.js)
- [ ] GET /api/concerts - List all
- [ ] GET /api/concerts/:id - Get one
- [ ] POST /api/concerts - Create
- [ ] PUT /api/concerts/:id - Update
- [ ] DELETE /api/concerts/:id - Delete

### Jam Sessions Route (routes/jamSessions.js)
- [ ] GET /api/jam-sessions - List all
- [ ] GET /api/jam-sessions/:id - Get one
- [ ] POST /api/jam-sessions - Create
- [ ] PUT /api/jam-sessions/:id - Update
- [ ] DELETE /api/jam-sessions/:id - Delete

### Teachers Route (routes/teachers.js)
- [ ] GET /api/teachers - List all
- [ ] GET /api/teachers/:id - Get one

### Students Route (routes/students.js)
- [ ] GET /api/students - List all
- [ ] GET /api/students/:id - Get one

### Instruments Route (routes/instruments.js)
- [ ] GET /api/instruments - List all
- [ ] GET /api/instruments/:id - Get one
- [ ] GET /api/instruments/user/:userId - By user

### Users Route (routes/users.js)
- [ ] GET /api/users - List all
- [ ] GET /api/users/:id - Get one

---

## 📝 Example Queries for Each Route

### Bands with Members
```sql
SELECT 
  b.band_id,
  b.name,
  b.creation_date,
  b.genre,
  b.`members#` as members_count
FROM Band b;

-- For each band, get members:
SELECT 
  u.user_id,
  u.name,
  m.experience,
  m.genre
FROM Bands_Have_Musicians bhm
JOIN Musician m ON bhm.musician_id = m.musician_id
JOIN User u ON m.musician_id = u.user_id
WHERE bhm.band_id = ?;
```

### Concerts
```sql
SELECT 
  c.concert_id,
  c.name,
  c.date,
  c.price,
  c.genre,
  c.address,
  c.artist,
  c.start_time,
  c.end_time,
  c.instruments,
  b.name as band_name,
  u.name as musician_name
FROM CONCERT c
LEFT JOIN Band b ON c.band_id = b.band_id
LEFT JOIN User u ON c.musician_id = u.user_id;
```

### Jam Sessions with Participants
```sql
SELECT 
  js.jam_id,
  js.date,
  js.address,
  js.genre,
  js.start_time,
  js.end_time,
  js.`participants#` as participants
FROM `Jam-Session` js;

-- Get participants:
SELECT 
  u.user_id,
  u.name,
  m.experience,
  m.genre
FROM `Jam-Sessions_Have_Musicians` jshm
JOIN Musician m ON jshm.musician_id = m.musician_id
JOIN User u ON m.musician_id = u.user_id
WHERE jshm.jam_id = ?;
```

### Teachers with Lessons
```sql
SELECT 
  t.teacher_id,
  t.lesson_format,
  t.experience,
  t.certification,
  t.hourly_wage,
  u.name,
  u.age,
  u.address
FROM Teacher t
JOIN User u ON t.teacher_id = u.user_id;
```

### Students with Lessons
```sql
SELECT 
  s.student_id,
  s.lesson_format,
  u.name,
  u.age,
  u.address
FROM Student s
JOIN User u ON s.student_id = u.user_id;
```

---

## 🧪 Testing Database Connection

### Test File: `test-db.js`

```javascript
const pool = require('./db/connection');

async function testConnection() {
  try {
    // Test basic query
    const [rows] = await pool.query('SELECT COUNT(*) as count FROM User');
    console.log('✅ Users in database:', rows[0].count);
    
    // Test musicians
    const [musicians] = await pool.query('SELECT COUNT(*) as count FROM Musician');
    console.log('✅ Musicians in database:', musicians[0].count);
    
    // Test bands
    const [bands] = await pool.query('SELECT COUNT(*) as count FROM Band');
    console.log('✅ Bands in database:', bands[0].count);
    
    console.log('\n✅ All database tests passed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database test failed:', error.message);
    process.exit(1);
  }
}

testConnection();
```

Run with:
```bash
node test-db.js
```

---

## 🔍 Debugging Tips

### Check MySQL is Running
```bash
# Mac
brew services list | grep mysql

# Or
mysqladmin -u root -p status
```

### Test Database Access
```bash
mysql -u app_admin -psuperpass MusicHubDB -e "SELECT * FROM User LIMIT 5;"
```

### Check for Errors
```bash
# Backend logs
node server.js

# Watch for connection errors in terminal
```

### Common Issues

**Error: Access denied**
- Check username/password in .env
- Verify user exists: `mysql -u root -p -e "SELECT User, Host FROM mysql.user;"`
- Run users.sql to create users

**Error: Database doesn't exist**
- Import dump: `mysql -u root -p < musichubdbdump.sql`

**Error: Table doesn't exist**
- Check table names match exactly (case-sensitive!)
- Your schema uses: `Jam-Session`, `CONCERT` (check capitalization)

**Error: Too many connections**
- Reduce connectionLimit in pool config
- Close connections properly with `connection.release()`

---

## ✅ Verification Steps

After converting to database:

1. **Test each endpoint with curl:**
```bash
curl http://localhost:5001/api/musicians
curl http://localhost:5001/api/musicians/1
curl http://localhost:5001/api/bands
curl http://localhost:5001/api/concerts
```

2. **Check frontend still works:**
- Start backend with database
- Start frontend
- Navigate through all pages
- Verify data displays correctly

3. **Compare mock vs real data:**
- Mock data had 9 musicians
- Check if database has same or different data
- Adjust frontend if needed

---

## 🎯 Migration Strategy

### Option 1: All at Once
1. Convert all routes to database
2. Test thoroughly
3. Deploy

### Option 2: Gradual (Recommended)
1. Start with one route (musicians)
2. Test it thoroughly
3. Move to next route (bands)
4. Continue until all converted
5. Remove mockData.js when done

### Option 3: Hybrid
1. Keep mock data as fallback
2. Try database first
3. Use mock if database fails
4. Good for development

---

## 📚 Useful Resources

### MySQL2 Documentation
- https://github.com/sidorares/node-mysql2

### SQL Query Examples
- See your `queries/` folder for complex queries
- query1.sql through query8.sql

### Your Database Schema
- See `MusicHubDB .pdf` for ER diagram
- See `musichubdbdump.sql` for structure

---

## 🚀 Ready to Connect!

When you're ready:
1. Follow steps above
2. Test thoroughly
3. Keep mock data as backup initially
4. Frontend doesn't need changes!

**The architecture is ready for the database - just swap the data layer!**

Good luck! 🎵
