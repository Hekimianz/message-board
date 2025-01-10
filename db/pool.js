const { Pool } = require("pg");
require("dotenv").config();

// Check for required environment variable
if (!process.env.DB_URL) {
console.error("Error: DB_URL environment variable is not set");
process.exit(1);
}

const pool = new Pool({
connectionString: process.env.DB_URL,
ssl: process.env.NODE_ENV === "production" 
    ? { rejectUnauthorized: false }
    : false,
// Connection pool configuration
max: 20,
idleTimeoutMillis: 30000,
connectionTimeoutMillis: 2000,
});

// Pool error handling
pool.on("error", (err) => {
console.error("Unexpected error on idle client", err);
process.exit(-1);
});

// Test the connection
pool.connect((err, client, release) => {
if (err) {
    console.error("Error connecting to the database:", err);
    process.exit(-1);
}
release();
console.log("Successfully connected to database");
});

module.exports = pool;
