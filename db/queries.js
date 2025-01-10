const pool = require("./pool");

async function getMessages() {
  try {
    const { rows } = await pool.query(
      'SELECT id, message, "user", date FROM messages;',
    );
    return rows;
  } catch (err) {
    console.error("Error fetching messages:", err);
    return [];
  }
}

async function addMessage(user, msg, date) {
  try {
    const result = await pool.query(
      'INSERT INTO messages (message, "user", date) VALUES ($1, $2, $3);',
      [msg, user, date],
    );
  } catch (err) {
    console.error("Error adding message:", err);
    throw err;
  }
}

module.exports = {
  getMessages,
  addMessage,
};
