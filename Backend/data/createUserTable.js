const pool = require('../config/db')

const createUserTable = async () => {
    const queryText = `
    CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        create_at TIMESTAMP DEFAULT NOW()
    )
    `

    try {
        await pool.query(queryText);
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = createUserTable
