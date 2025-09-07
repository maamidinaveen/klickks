const express = require("express");
const app = express();

const cors = require("cors");

app.use(express.json());
app.use(cors());

const path = require("path");
const dbPath = path.join(__dirname, "database.db");

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    // Create users table if it doesn't exist

    const createUsersTableQuery = `CREATE TABLE IF NOT EXISTS users(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE,
            password TEXT
        )`;

    await db.run(createUsersTableQuery);

    app.listen(3000, () => {
      console.log(`Server is running at http://localhost:3000`);
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();

// SignUP API handling

app.post("/signup/", async (request, response) => {
  const { email, password } = request.body;

  // Validation
  if (!email || !password) {
    return response
      .status(400)
      .json({ message: "Email and password are required" });
  }
  if (password.length < 6) {
    return response
      .status(400)
      .json({ message: "Password must be at least 6 characters" });
  }

  try {
    const dbUserQuery = `SELECT * FROM users WHERE email = ?`;
    const dbUser = await db.get(dbUserQuery, [email]);

    if (dbUser) {
      return response.status(400).json({ message: "Email Already Exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const createUserQuery = `INSERT INTO users(email, password) VALUES (?, ?)`;

    await db.run(createUserQuery, [email, hashedPassword]);
    response.status(201).json({ message: "User Created Successfully" });
  } catch (e) {
    response.status(500).json({ message: `SignUp Error: ${e.message}` });
  }
});

// Login API handling

app.post("/login/", async (request, response) => {
  const { email, password } = request.body;

  if (!email || !password) {
    return response
      .status(400)
      .json({ message: "Email and password are required" });
  }

  try {
    const dbUserQuery = `select * from users where email= ?`;
    const dbUser = await db.get(dbUserQuery, [email]);

    if (!dbUser) {
      return response.status(400).json({ message: "Invalid Email" });
    }

    const isPasswordMatch = await bcrypt.compare(password, dbUser.password);

    if (!isPasswordMatch) {
      return response.status(400).json({ message: "Invalid Password" });
    }

    const payload = { email };
    const jwtToken = jwt.sign(payload, "my_key"); // for sensitive data like JWT secret key instead of hardcoding 'my_key'
    response.status(200).json({ jwtToken });
  } catch (e) {
    response.status(500).json({ message: `${e.message}` });
  }
});

// MiddleWare function to verify JWT Token

const authenticateToken = (request, response, next) => {
  const authHeader = request.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return response
      .status(401)
      .json({ message: "Access Denied. No token provided." });
  }

  jwt.verify(token, "my_key", (error, payload) => {
    if (error) {
      console.log("jwt error ", error.message);
      return response.status(401).json({ message: "Invalid Token" });
    }
    console.log("decoded payload", payload);
    request.email = payload.email;
    next();
  });
};

app.get("/dashboard/", authenticateToken, async (request, response) => {
  const { email } = request;
  response.json({
    message: `Welcome ${email}, you have access to protected content 🎉`,
  });
});
