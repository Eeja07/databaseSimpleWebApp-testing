const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const db = require("./connection");
const response = require("./response");

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

db.connect((err) => {
  if (err) {
    console.log("Database connection error:", err);
  } else {
    console.log("Connected to PostgreSQL database");
  }
});

app.get("/", (req, res) => {
  response(200, null, "Welcome to the API", res);
});

app.post("/", async (req, res) => {
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
  } = req.body;

  // Validate required fields
  if (
    !first_name ||
    !last_name ||
    !main_email ||
    verify_main_email !== true ||
    !country_code_main ||
    !main_phone_number ||
    verify_main_phone !== true ||
    !gender ||
    !birthday ||
    !home_address
  ) {
    return res.status(400).json({ message: "Please fill all required fields" });
  }

  const query = `
      INSERT INTO account_information
      (first_name, last_name, main_email, verify_main_email, alt_email, verify_alt_email, country_code_main, main_phone_number, verify_main_phone, country_code_alt, alt_phone_number, verify_alt_phone, gender, birthday, home_address, work_address, status_information) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
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
  ];

  try {
    const result = await db.query(query, values);
    return res
      .status(201)
      .json({ message: "Account created successfully", result });
  } catch (err) {
    console.error("Database query error:", err);
    return res
      .status(500)
      .json({ message: "An error occurred while processing your request", error: err });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});