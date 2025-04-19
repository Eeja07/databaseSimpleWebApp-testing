const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const db = require("./db"); // Assume this is a custom module for PostgreSQL connection
const response = require("./response"); // Assume this is a custom utility to standardize responses

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));



// Test database connection
db.query('SELECT NOW()', [], (err, res) => {
  if (err) {
    console.error("Database connection error:", err);
  } else {
    console.log("Connected to PostgreSQL database at:", res.rows[0].now);
  }
});

// DELETE route to delete all profiles (add confirmation for safety)
app.delete('/api/accounts/info', async (req, res) => {
  try {
    // Request confirmation before proceeding
    const { confirm } = req.body;

    if (confirm !== "yes") {
      return response(400, null, "You must confirm deletion by sending { confirm: 'yes' }", res);
    }

    // Delete all data (be very cautious with this)
    await db.query('DELETE FROM profile');
    response(200, null, 'All data deleted successfully', res);
  } catch (err) {
    console.error('Error deleting data:', err);
    response(500, null, 'Error deleting data', res);
  }
});

// GET route to fetch all profiles
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

  // Basic validation for required fields
  if (!first_name || !last_name || !main_email) {
    return response(400, null, "Please provide first name, last name, and email", res);
  }

  const query = `
    INSERT INTO profile
    (first_name, last_name, main_email, verify_main_email, alt_email, verify_alt_email, country_code_main, 
     main_phone_number, verify_main_phone, country_code_alt, alt_phone_number, verify_alt_phone, gender, 
     birthday, home_address, work_address, status_information, created_at, updated_at)
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
