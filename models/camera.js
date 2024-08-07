const db = require("../db/connection");

class Camera {
  static findAll() {
    const query = `
      SELECT * FROM kameras
      WHERE
        status = 1
        AND streaming_url IS NOT NULL
    `;

    return new Promise((resolve, reject) => {
      db.query(query, (err, result) => {
        if (err) return reject(err.message);
        resolve(result);
      });
    });
  }
}

module.exports = Camera;
