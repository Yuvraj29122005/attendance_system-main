import { sql } from '@vercel/postgres';
import fs from 'fs';
import path from 'path';

const isPostgres = Boolean(process.env.POSTGRES_URL || process.env.DATABASE_URL);

// Local JSON database fallback path
const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

const INITIAL_SUBJECTS = [
  { id: 1, name: 'OOP' },
  { id: 2, name: 'MATHS' },
  { id: 3, name: 'DSA' },
  { id: 4, name: 'CN' },
  { id: 5, name: 'FAI/ML' }
];

const INITIAL_STUDENTS = [
  // AIML Students
  { id: 1, roll_no: 1, name: 'TELAGATHOTI NAVA TEJA', branch: 'AIML' },
  { id: 2, roll_no: 2, name: 'DHOLAKIYA RAJ HARESHBHAI', branch: 'AIML' },
  { id: 3, roll_no: 3, name: 'KOTA DINESH MR. SURENDRA', branch: 'AIML' },
  { id: 4, roll_no: 4, name: 'KURAKULA MANIVENKATA TEJA', branch: 'AIML' },
  { id: 5, roll_no: 5, name: 'NEELAM MANIKANTA', branch: 'AIML' },
  { id: 6, roll_no: 6, name: 'PEDHADIYA KHODIDAS JAMANBHAI', branch: 'AIML' },
  { id: 7, roll_no: 7, name: 'SHAMDAR RAMIZSHA MAHEBUBSHA', branch: 'AIML' },
  { id: 8, roll_no: 8, name: 'MOMIN SAID MEER', branch: 'AIML' },
  { id: 9, roll_no: 9, name: 'SHAIK NEMALIPURI MAHMAD NAZEER', branch: 'AIML' },
  { id: 10, roll_no: 10, name: 'CHEVALA NAGA NARAHARI BABU', branch: 'AIML' },
  { id: 11, roll_no: 11, name: 'MATHANGI MANEESH KUMAR', branch: 'AIML' },
  { id: 12, roll_no: 12, name: 'PATRA SIDDHARDHA', branch: 'AIML' },
  { id: 13, roll_no: 13, name: 'VEMANA PREM KUMAR', branch: 'AIML' },
  { id: 14, roll_no: 14, name: 'JOSHI MRUTYUNJAY AMITBHAI', branch: 'AIML' },
  { id: 15, roll_no: 15, name: 'SAKHRELIYA VANSHIL SANJAYBHAI', branch: 'AIML' },
  { id: 16, roll_no: 16, name: 'VAMAJA RAJ ISHVARBHAI', branch: 'AIML' },
  { id: 17, roll_no: 17, name: 'MAKADIYA KRENSI RAMNIKBHAI', branch: 'AIML' },
  { id: 18, roll_no: 18, name: 'RATHOD SWATI RATILAL', branch: 'AIML' },
  { id: 19, roll_no: 19, name: 'KADAM HARSH ANKUSHBHAI', branch: 'AIML' },
  { id: 20, roll_no: 20, name: 'PRINCEKUMAR SUTHAR', branch: 'AIML' },
  { id: 21, roll_no: 21, name: 'PANDUGU DIKSHITH', branch: 'AIML' },
  { id: 22, roll_no: 22, name: 'CHENNAIHGARI SPANDANA', branch: 'AIML' },

  // AIDS Students
  { id: 23, roll_no: 1, name: 'CHANDANA CHARANYA RATNA PRIYA', branch: 'AIDS' },
  { id: 24, roll_no: 2, name: 'DASARI ANUHYA DEVI', branch: 'AIDS' },
  { id: 25, roll_no: 3, name: 'GADENAVENI SHIVA', branch: 'AIDS' },
  { id: 26, roll_no: 4, name: 'GARAPATI SANJANA PRABHA DEVI', branch: 'AIDS' },
  { id: 27, roll_no: 5, name: 'KARIPI SAI DURGA PRAVEEN', branch: 'AIDS' },
  { id: 28, roll_no: 6, name: 'KOTTA BALAJI', branch: 'AIDS' },
  { id: 29, roll_no: 7, name: 'LINGALA HARINI', branch: 'AIDS' },
  { id: 30, roll_no: 8, name: 'MEKALA DIVAKAR REDDY', branch: 'AIDS' },
  { id: 31, roll_no: 9, name: 'POLINA MOHITHA', branch: 'AIDS' },
  { id: 32, roll_no: 10, name: 'SABBINENI SAGAR', branch: 'AIDS' },
  { id: 33, roll_no: 11, name: 'SHAIK HANEEF', branch: 'AIDS' },
  { id: 34, roll_no: 12, name: 'JITENDER TAMMINANA', branch: 'AIDS' },
  { id: 35, roll_no: 13, name: 'TIRUMALA RAJU BALA VENKATA PAVAN VARMA', branch: 'AIDS' },
  { id: 36, roll_no: 14, name: 'VALLEPALLI VASANTH RAJ', branch: 'AIDS' },
  { id: 37, roll_no: 15, name: 'BADE ASMITHA SRIJA', branch: 'AIDS' },
  { id: 38, roll_no: 16, name: 'CHAKALI KOUSHIK BABU', branch: 'AIDS' },
  { id: 39, roll_no: 17, name: 'MADIRA SAI THRIVEDI', branch: 'AIDS' },
  { id: 40, roll_no: 18, name: 'NILLA SUVARSHA', branch: 'AIDS' },
  { id: 41, roll_no: 19, name: 'PASYAVULA BHARAT RAMA SWAMI', branch: 'AIDS' },
  { id: 42, roll_no: 20, name: 'SALA NAGA VENKATA NIKHIL', branch: 'AIDS' },
  { id: 43, roll_no: 21, name: 'TALLAPALLE TEJOVANTH VENKATA SAI RAMESH', branch: 'AIDS' },
  { id: 44, roll_no: 22, name: 'SATYA KESHIK TUNGALA', branch: 'AIDS' },
  { id: 45, roll_no: 23, name: 'BADAM DHEEMANTH REDDY', branch: 'AIDS' },
  { id: 46, roll_no: 24, name: 'MADIREDDY LAKSHMI PRASANNA', branch: 'AIDS' },
  { id: 47, roll_no: 25, name: 'PALLE NITHIN', branch: 'AIDS' },
  { id: 48, roll_no: 26, name: 'PALLE NITHISH', branch: 'AIDS' },
  { id: 49, roll_no: 27, name: 'PATHI CHARITHA SRI', branch: 'AIDS' },
  { id: 50, roll_no: 28, name: 'RAAVI NETHAJI', branch: 'AIDS' },
  { id: 51, roll_no: 29, name: 'BORAD KRISH HARESHBHAI', branch: 'AIDS' },
  { id: 52, roll_no: 30, name: 'BURRI SRINU', branch: 'AIDS' },
  { id: 53, roll_no: 31, name: 'GURRAM NAGA PHANEENDRA KUMAR', branch: 'AIDS' },
  { id: 54, roll_no: 32, name: 'MOLAGAVALLI DINESH PATEL', branch: 'AIDS' },
  { id: 55, roll_no: 33, name: 'PARASA PAVAN KUMAR', branch: 'AIDS' },
  { id: 56, roll_no: 34, name: 'PUSULURI HEMANTHA LAKSHMI GOPIKA', branch: 'AIDS' },
  { id: 57, roll_no: 35, name: 'BYALLA VISHNUVARDHAN', branch: 'AIDS' },
  { id: 58, roll_no: 36, name: 'DAGI KISHOR', branch: 'AIDS' },
  { id: 59, roll_no: 37, name: 'MURABOYINA MADHU SPANDHANA', branch: 'AIDS' },
  { id: 60, roll_no: 38, name: 'PERAM SHYAM SUNDARA REDDY', branch: 'AIDS' },
  { id: 61, roll_no: 39, name: 'RALLABANDI VENKATA SUPRAJA', branch: 'AIDS' },
  { id: 62, roll_no: 40, name: 'BOSIGARI CHANDRA JAHNAVI', branch: 'AIDS' },
  { id: 63, roll_no: 41, name: 'CHIRALA GANESH', branch: 'AIDS' },
  { id: 64, roll_no: 42, name: 'PARLAPU VAISHNAVI', branch: 'AIDS' },
  { id: 65, roll_no: 43, name: 'SHAIK ISHFAAQ', branch: 'AIDS' },
  { id: 66, roll_no: 44, name: 'GANGIREDDY RAKESH REDDY', branch: 'AIDS' },
  { id: 67, roll_no: 45, name: 'KANAPARTHI ANURAG', branch: 'AIDS' },
  { id: 68, roll_no: 46, name: 'MANGALA ARCHITHA', branch: 'AIDS' },
  { id: 69, roll_no: 47, name: 'VELUGURI KARTHIKEYA', branch: 'AIDS' },
  { id: 70, roll_no: 48, name: 'GRANDHI NAGA JYOTHI', branch: 'AIDS' },
  { id: 71, roll_no: 49, name: 'ATHUPAKAM LOKESH REDDY', branch: 'AIDS' },
  { id: 72, roll_no: 50, name: 'GANDHAM JEEVAN', branch: 'AIDS' },
  { id: 73, roll_no: 51, name: 'MEENA VENKATA RAGHUNANDAN', branch: 'AIDS' },
  { id: 74, roll_no: 52, name: 'GOHIL TANISH KETANBHAI', branch: 'AIDS' },
  { id: 75, roll_no: 53, name: 'BHANDERI NENSEE MAHENDRABHAI', branch: 'AIDS' },
  { id: 76, roll_no: 54, name: 'GUMMA VENKATA SRINIVASULU', branch: 'AIDS' },
  { id: 77, roll_no: 55, name: 'KURUBA PUNITH SAI', branch: 'AIDS' },
  { id: 78, roll_no: 56, name: 'CHAVDA MADHAV RAMESHBHAI', branch: 'AIDS' },
  { id: 79, roll_no: 57, name: 'PARMAR MEET RAJESHBHAI', branch: 'AIDS' }
];

// Helper for local JSON database
function getLocalDb() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DB_FILE)) {
      const initialData = {
        subjects: INITIAL_SUBJECTS,
        students: INITIAL_STUDENTS,
        attendance: []
      };
      fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
      return initialData;
    }
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (e) {
    console.error('Local DB read error:', e);
    return { subjects: INITIAL_SUBJECTS, students: INITIAL_STUDENTS, attendance: [] };
  }
}

function saveLocalDb(data) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (e) {
    console.error('Local DB write error:', e);
  }
}

// ---------------------- DATABASE API ----------------------

export async function initDb() {
  if (isPostgres) {
    await sql`
      CREATE TABLE IF NOT EXISTS students (
        id SERIAL PRIMARY KEY,
        roll_no INT NOT NULL,
        name VARCHAR(100) NOT NULL,
        branch TEXT NOT NULL,
        UNIQUE(roll_no, branch)
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS subjects (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL UNIQUE
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS attendance (
        id SERIAL PRIMARY KEY,
        date DATE NOT NULL,
        subject VARCHAR(100) NOT NULL,
        slot_no INT NOT NULL,
        branch TEXT NOT NULL,
        roll_no INT NOT NULL,
        status TEXT NOT NULL DEFAULT 'absent',
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;

    const subCount = await sql`SELECT COUNT(*) as count FROM subjects`;
    if (parseInt(subCount.rows[0].count) === 0) {
      await sql`INSERT INTO subjects (name) VALUES ('OOP'),('MATHS'),('DSA'),('CN'),('FAI/ML') ON CONFLICT DO NOTHING`;
    }

    const aimlCount = await sql`SELECT COUNT(*) as count FROM students WHERE branch = 'AIML'`;
    if (parseInt(aimlCount.rows[0].count) === 0) {
      const aimlStudents = INITIAL_STUDENTS.filter(s => s.branch === 'AIML');
      for (const s of aimlStudents) {
        await sql`INSERT INTO students (roll_no, name, branch) VALUES (${s.roll_no}, ${s.name}, ${s.branch}) ON CONFLICT DO NOTHING`;
      }
    }

    const aidsCount = await sql`SELECT COUNT(*) as count FROM students WHERE branch = 'AIDS'`;
    if (parseInt(aidsCount.rows[0].count) === 0) {
      const aidsStudents = INITIAL_STUDENTS.filter(s => s.branch === 'AIDS');
      for (const s of aidsStudents) {
        await sql`INSERT INTO students (roll_no, name, branch) VALUES (${s.roll_no}, ${s.name}, ${s.branch}) ON CONFLICT DO NOTHING`;
      }
    }
  } else {
    getLocalDb(); // Ensures file and directory exist with default seed data
  }
  return { success: true, message: 'Database initialized!' };
}

export async function getStudents(branch = 'AIML') {
  if (isPostgres) {
    const result = await sql`
      SELECT id, roll_no, name, branch 
      FROM students 
      WHERE branch = ${branch} 
      ORDER BY roll_no ASC
    `;
    return result.rows;
  } else {
    const db = getLocalDb();
    return db.students.filter(s => s.branch === branch).sort((a, b) => a.roll_no - b.roll_no);
  }
}

export async function addStudent(roll_no, name, branch) {
  const roll = parseInt(roll_no);
  const cleanName = (name || '').trim().toUpperCase();

  if (isPostgres) {
    await sql`
      INSERT INTO students (roll_no, name, branch) 
      VALUES (${roll}, ${cleanName}, ${branch})
    `;
    return { success: true, message: 'Student added!' };
  } else {
    const db = getLocalDb();
    const exists = db.students.some(s => s.roll_no === roll && s.branch === branch);
    if (exists) {
      throw new Error('Roll No already exists for this branch');
    }
    const maxId = db.students.reduce((max, s) => Math.max(max, s.id || 0), 0);
    const newStudent = { id: maxId + 1, roll_no: roll, name: cleanName, branch };
    db.students.push(newStudent);
    saveLocalDb(db);
    return { success: true, message: 'Student added!' };
  }
}

export async function deleteStudent(id) {
  const studentId = parseInt(id);
  if (isPostgres) {
    await sql`DELETE FROM students WHERE id = ${studentId}`;
  } else {
    const db = getLocalDb();
    db.students = db.students.filter(s => s.id !== studentId);
    saveLocalDb(db);
  }
  return { success: true, message: 'Student deleted!' };
}

export async function getSubjects() {
  if (isPostgres) {
    const result = await sql`SELECT id, name FROM subjects ORDER BY name ASC`;
    return result.rows;
  } else {
    const db = getLocalDb();
    return db.subjects.sort((a, b) => a.name.localeCompare(b.name));
  }
}

export async function addSubject(name) {
  const cleanName = (name || '').trim().toUpperCase();
  if (isPostgres) {
    await sql`INSERT INTO subjects (name) VALUES (${cleanName})`;
  } else {
    const db = getLocalDb();
    if (db.subjects.some(s => s.name.toUpperCase() === cleanName)) {
      throw new Error('Subject already exists');
    }
    const maxId = db.subjects.reduce((max, s) => Math.max(max, s.id || 0), 0);
    db.subjects.push({ id: maxId + 1, name: cleanName });
    saveLocalDb(db);
  }
  return { success: true, message: 'Subject added!' };
}

export async function updateSubject(id, name) {
  const subId = parseInt(id);
  const cleanName = (name || '').trim().toUpperCase();
  if (isPostgres) {
    await sql`UPDATE subjects SET name = ${cleanName} WHERE id = ${subId}`;
  } else {
    const db = getLocalDb();
    const sub = db.subjects.find(s => s.id === subId);
    if (!sub) throw new Error('Subject not found');
    sub.name = cleanName;
    saveLocalDb(db);
  }
  return { success: true, message: 'Subject updated!' };
}

export async function deleteSubject(id) {
  const subId = parseInt(id);
  if (isPostgres) {
    await sql`DELETE FROM subjects WHERE id = ${subId}`;
  } else {
    const db = getLocalDb();
    db.subjects = db.subjects.filter(s => s.id !== subId);
    saveLocalDb(db);
  }
  return { success: true, message: 'Subject deleted!' };
}

export async function saveAttendance(date, slots) {
  if (isPostgres) {
    await sql`DELETE FROM attendance WHERE date = ${date}`;

    for (let idx = 0; idx < slots.length; idx++) {
      const slot = slots[idx];
      const subject = slot.subject || ('Lecture ' + (idx + 1));
      const slotNo = idx + 1;

      if (slot.aimlLib) {
        await sql`INSERT INTO attendance (date, subject, slot_no, branch, roll_no, status) VALUES (${date}, ${subject}, ${slotNo}, 'AIML', 0, 'library')`;
      } else {
        const aimlRolls = parseRolls(slot.aiml);
        for (const roll of aimlRolls) {
          await sql`INSERT INTO attendance (date, subject, slot_no, branch, roll_no, status) VALUES (${date}, ${subject}, ${slotNo}, 'AIML', ${roll}, 'absent')`;
        }
      }

      if (slot.aidsLib) {
        await sql`INSERT INTO attendance (date, subject, slot_no, branch, roll_no, status) VALUES (${date}, ${subject}, ${slotNo}, 'AIDS', 0, 'library')`;
      } else {
        const aidsRolls = parseRolls(slot.aids);
        for (const roll of aidsRolls) {
          await sql`INSERT INTO attendance (date, subject, slot_no, branch, roll_no, status) VALUES (${date}, ${subject}, ${slotNo}, 'AIDS', ${roll}, 'absent')`;
        }
      }
    }
  } else {
    const db = getLocalDb();
    db.attendance = db.attendance.filter(a => a.date !== date);

    let maxId = db.attendance.reduce((max, a) => Math.max(max, a.id || 0), 0);

    for (let idx = 0; idx < slots.length; idx++) {
      const slot = slots[idx];
      const subject = slot.subject || ('Lecture ' + (idx + 1));
      const slotNo = idx + 1;

      if (slot.aimlLib) {
        db.attendance.push({ id: ++maxId, date, subject, slot_no: slotNo, branch: 'AIML', roll_no: 0, status: 'library' });
      } else {
        const aimlRolls = parseRolls(slot.aiml);
        for (const roll of aimlRolls) {
          db.attendance.push({ id: ++maxId, date, subject, slot_no: slotNo, branch: 'AIML', roll_no: roll, status: 'absent' });
        }
      }

      if (slot.aidsLib) {
        db.attendance.push({ id: ++maxId, date, subject, slot_no: slotNo, branch: 'AIDS', roll_no: 0, status: 'library' });
      } else {
        const aidsRolls = parseRolls(slot.aids);
        for (const roll of aidsRolls) {
          db.attendance.push({ id: ++maxId, date, subject, slot_no: slotNo, branch: 'AIDS', roll_no: roll, status: 'absent' });
        }
      }
    }
    saveLocalDb(db);
  }
  return { success: true, message: 'Attendance saved!' };
}

export async function getAttendanceReport(date) {
  if (isPostgres) {
    const result = await sql`
      SELECT a.slot_no, a.subject, a.branch, a.roll_no, a.status, s.name
      FROM attendance a
      LEFT JOIN students s ON s.roll_no = a.roll_no AND s.branch = a.branch
      WHERE a.date = ${date}
      ORDER BY a.slot_no, a.branch, a.roll_no
    `;
    return result.rows;
  } else {
    const db = getLocalDb();
    const records = db.attendance
      .filter(a => a.date === date)
      .map(a => {
        const student = db.students.find(s => s.roll_no === a.roll_no && s.branch === a.branch);
        return {
          slot_no: a.slot_no,
          subject: a.subject,
          branch: a.branch,
          roll_no: a.roll_no,
          status: a.status,
          name: student ? student.name : null
        };
      })
      .sort((a, b) => a.slot_no - b.slot_no || a.branch.localeCompare(b.branch) || a.roll_no - b.roll_no);
    return records;
  }
}

function parseRolls(str) {
  if (!str) return [];
  const rolls = [...new Set(
    String(str).split(',')
      .map(x => parseInt(x.trim()))
      .filter(x => !isNaN(x) && x > 0)
  )];
  rolls.sort((a, b) => a - b);
  return rolls;
}
