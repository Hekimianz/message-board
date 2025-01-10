require("dotenv").config();
const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    message TEXT NOT NULL,
    "user" TEXT NOT NULL,
    date TIMESTAMP NOT NULL
);

INSERT INTO messages (message, "user", date)
VALUES
    ('Hi!!', 'Flat-pancake342', '2025-01-08 14:30:00');
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}.oregon-postgres.render.com/${process.env.DB_DATABASE}`,
    ssl: {
      rejectUnauthorized: false,
    },
  });
  try {
    await client.connect();
    await client.query(SQL);
    console.log("done");
  } catch (err) {
    console.error("Error seeding database:", err);
  } finally {
    await client.end();
  }
}
main();
