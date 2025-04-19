// // const express = require("express");
// // const cors = require("cors");
// // const app = express();
// // const port = 3000;
// // const bodyParser = require("body-parser");
// // const db = require("./connection");
// // const response = require("./response");

// // app.use(cors());
// // app.use(bodyParser.json());
// // app.use(express.static("public"));
// // app.use(express.json());
// // app.use(express.urlencoded({ extended: true }));
// // db.connect((err) => {
// //   if (err) {
// //     console.log("Database connection error:", err);
// //   } else {
// //     console.log("Connected to PostgreSQL database");
// //   }
// // });

// // app.get("/api/accounts/info", async (req, res) => {
// //   try {
// //     const result = await db.query("SELECT first_name, last_name FROM profiles");
// //     response(200, result.rows, "Accounts fetched successfully", res);
// //   } catch (err) {
// //     console.error("Error fetching accounts:", err);
// //     response(500, null, "Error fetching accounts", res);
// //   }
// // });
// // app.post("/api/accounts/info", async (req, res) => {
// //   const {
// //     first_name,
// //     last_name,
// //     // main_email,
// //     // verify_main_email,
// //     // alt_email,
// //     // verify_alt_email,
// //     // country_code_main,
// //     // main_phone_number,
// //     // verify_main_phone,
// //     // country_code_alt,
// //     // alt_phone_number,
// //     // verify_alt_phone,
// //     // gender,
// //     // birthday,
// //     // home_address,
// //     // work_address,
// //     // status_information,
// //   } = req.body;

// //   // Validate required fields
// //   if (
// //     !first_name ||
// //     !last_name 
// //     // !main_email ||
// //     // verify_main_email !== true ||
// //     // !country_code_main ||
// //     // !main_phone_number ||
// //     // verify_main_phone !== true ||
// //     // !gender ||
// //     // !birthday ||
// //     // !home_address
// //   ) {
// //     return res.status(400).json({ message: "Please fill all required fields" });
// //   }

// //   // const query = `
// //   //     INSERT INTO profile
// //   //     (first_name, last_name, main_email, verify_main_email, alt_email, verify_alt_email, country_code_main, main_phone_number, verify_main_phone, country_code_alt, alt_phone_number, verify_alt_phone, gender, birthday, home_address, work_address, status_information) 
// //   //     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
// //   //   `;

// //   // const values = [
// //   //   first_name,
// //   //   last_name,
// //   //   main_email,
// //   //   verify_main_email,
// //   //   alt_email,
// //   //   verify_alt_email,
// //   //   country_code_main,
// //   //   main_phone_number,
// //   //   verify_main_phone,
// //   //   country_code_alt,
// //   //   alt_phone_number,
// //   //   verify_alt_phone,
// //   //   gender,
// //   //   birthday,
// //   //   home_address,
// //   //   work_address,
// //   //   status_information,
// //   // ];

// // const query = `
// //   INSERT INTO profile (
// //     first_name, last_name, main_email, verify_main_email,
// //     verify_main_phone, birthday, status_information,
// //     country_code_main, main_phone_number, home_address, gender
// //   )
// //   VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
// // `;

// // const values = [
// //   first_name,
// //   last_name,
// //   "john@example.com",
// //   true,                      // verify_main_email
// //   true,                      // verify_main_phone
// //   "2000-01-01",              // birthday
// //   "Active",                  // status_information
// //   "+62",                     // country_code_main
// //   "8123456789",              // main_phone_number
// //   "Jl. Contoh No. 123",      // home_address
// //   "Male"                     // gender
// // ];

// //   try {
// //     const result = await db.query(query, values);
// //     return res
// //       .status(201)
// //       .json({ message: "Account created successfully", result });
// //   } catch (err) {
// //     console.error("Database query error:", err);
// //     return res
// //       .status(500)
// //       .json({ message: "An error occurred while processing your request", error: err });
// //   }
// // });

// // app.listen(port, () => {
// //   console.log(`Example app listening on port ${port}`);
// // });

// const express = require("express");
// cons path = require("path");
// const userRoutes = require("./routes/userRoutes");
// const cors = require("cors");
// const app = express();
// const port = process.env.PORT || 3000;
// const bodyParser = require("body-parser");
// const db = require("../db");
// require("dotenv").config();
// const response = require("./response");

// app.use(cors());
// app.use(bodyParser.json());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));
// app.use("/api/accounts", userRoutes);

// // Test database connection
// db.connect((err) => {
//   if (err) {
//     console.log("Database connection error:", err);
//   } else {
//     console.log("Connected to PostgreSQL database");
//   }
// });

// // GET route for fetching accounts
// app.get("/api/accounts/info", async (req, res) => {
//   try {
//     const result = await db.query("SELECT first_name, last_name, main_email, verify_main_email, alt_email, verify_alt_email, country_code_main, main_phone_number, verify_main_phone, country_code_alt, alt_phone_number, verify_alt_phone, gender, birthday, home_address, work_address, status_information FROM profile");
//     res.status(200).json(result.rows);
//   } catch (err) {
//     console.error("Error fetching accounts:", err);
//     res.status(500).json({ message: "Error fetching accounts", error: err });
//   }
// });

// // POST route for adding an account
// app.post("/api/accounts/info", async (req, res) => {
//     const {
//     first_name,
//     last_name,
//     // main_email,
//     // verify_main_email,
//     // alt_email,
//     // verify_alt_email,
//     // country_code_main,
//     // main_phone_number,
//     // verify_main_phone,
//     // country_code_alt,
//     // alt_phone_number,
//     // verify_alt_phone,
//     // gender,
//     // birthday,
//     // home_address,
//     // work_address,
//     // status_information,
//   } = req.body;
//   const query = `
//     INSERT INTO profile (
//       first_name, last_name, main_email, verify_main_email,
//       verify_main_phone, birthday, status_information,
//       country_code_main, main_phone_number, home_address, gender
//     )
//     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
//   `;

//   const values = [
//     first_name,
//     last_name,
//     "john@example.com",
//     true,                      // verify_main_email
//     true,                      // verify_main_phone
//     "2000-01-01",              // birthday
//     "Active",                  // status_information
//     "+62",                     // country_code_main
//     "8123456789",              // main_phone_number
//     "Jl. Contoh No. 123",      // home_address
//     "Male"                     // gender
//   ];


//   try {
//     await db.query(query, values);
//     res.status(201).json({ message: "Account created successfully" });
//   } catch (err) {
//     console.error("Database query error:", err);
//     res.status(500).json({ message: "An error occurred while processing your request", error: err });
//   }
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const db = require("./db");
const response = require("./response");
const { create } = require("domain");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Test database connection
db.connect((err) => {
  if (err) {
    console.log("Database connection error:", err);
  } else {
    console.log("Connected to PostgreSQL database");
  }
});
app.delete('/api/accounts/info', async (req, res) => {
  try {
    // Problematic code that's causing a 500 error
    await db.query('DELETE FROM profile');
    res.status(200).json({ message: 'All data deleted successfully' });
  } catch (err) {
    console.error('Error deleting data:', err);
    res.status(500).json({ message: 'Error deleting data', error: err.message });
  }
});


app.get("/api/accounts/info", async (req, res) => {
  try {
    const result = await db.query(`
      SELECT 
        first_name, last_name, main_email, verify_main_email, alt_email, verify_alt_email, 
        country_code_main, main_phone_number, verify_main_phone, country_code_alt, 
        alt_phone_number, verify_alt_phone, gender, 
        TO_CHAR(birthday, 'YYYY-MM-DD') AS birthday, 
        home_address, work_address, status_information, created_at, updated_at 
      FROM profile
    `);
    response(200, result.rows, "Accounts fetched successfully", res);
  } catch (err) {
    console.error("Error fetching accounts:", err);
    response(500, null, "Error fetching accounts", res);
  }
});

// POST route for adding an account
app.post("/api/accounts/info", async (req, res) => {
  const {
    first_name,
    last_name,
    main_email,
    verify_main_email,
    alt_email,
    verify_alt_email,
    country_code_main,
    main_phone_number,
    verify_main_phone,
    country_code_alt,
    alt_phone_number,
    verify_alt_phone,
    gender,
    birthday,
    home_address,
    work_address,
    status_information,
    created_at,
    updated_at,
  } = req.body;
  
  // Validate required fields
  if (!first_name || !last_name) {
    return response(400, null, "Please fill all required fields", res);
  }

  const query = `
      INSERT INTO profile
      (first_name, last_name, main_email, verify_main_email, alt_email, verify_alt_email, country_code_main, main_phone_number, verify_main_phone, country_code_alt, alt_phone_number, verify_alt_phone, gender, birthday, home_address, work_address, status_information, created_at, updated_at) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)
    `;

  const values = [
    first_name,
    last_name,
    main_email,
    verify_main_email,
    alt_email,
    verify_alt_email,
    country_code_main,
    main_phone_number,
    verify_main_phone,
    country_code_alt,
    alt_phone_number,
    verify_alt_phone,
    gender,
    birthday,
    home_address,
    work_address,
    status_information,
    created_at,
    updated_at,
  ];

  try {
    const result = await db.query(query, values);
    response(201, result.rows[0], "Account created successfully", res);
  } catch (err) {
    console.error("Database query error:", err);
    response(500, null, "An error occurred while processing your request", res);
  }
});

// Serve the admin page
app.get("/admin.html", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});