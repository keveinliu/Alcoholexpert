const { Pool } = require('pg');
const config = require('./config');

const pool = new Pool(config.db);

module.exports = {
  getWines: async () => {
    const result = await pool.query('SELECT * FROM wines');
    return result.rows;
  },
  getWineById: async (id) => {
    const result = await pool.query('SELECT * FROM wines WHERE id = $1', [id]);
    return result.rows[0];
  },
  addWine: async (photo, rating, comment) => {
    const result = await pool.query(
      'INSERT INTO wines (photo, rating, comment) VALUES ($1, $2, $3) RETURNING *',
      [photo, rating, comment]
    );
    return result.rows[0];
  },
};
