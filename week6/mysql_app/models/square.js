const db = require('../db');

const Square = {
  // Find all squares
  findAll: async () => {
    const [rows] = await db.query('SELECT * FROM squares');
    return rows;
  },

  findById: async (id) => {
    const [rows] = await db.query('SELECT * FROM squares WHERE id = ?', [id]);
    return rows[0]; // Return just the single user object
  },

  saveToDatabase: async (sideLength, perimeter, area) => {
    const [result] = await db.query(
      'INSERT INTO squares (sideLength, perimeter, area) VALUES (?, ?, ?)', 
      [sideLength, perimeter, area]
    );
    return { id: result.insertId, sideLength, perimeter, area };
  }
};

module.exports = Square;
