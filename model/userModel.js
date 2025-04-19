const db = require('../db');

exports.getAll = async () => {
  const result = await db.query('SELECT * FROM accopunt_information');
  return result.rows;
};

exports.create = async (name, email) => {
  const result = await db.query('INSERT INTO account_information (name, email) VALUES ($1, $2) RETURNING *', [name, email]);
  return result.rows[0];
};