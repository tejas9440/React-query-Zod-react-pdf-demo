CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    passsword VARCHAR(100) NOT NULL,
    create_at TIMESTAMP DEFAULT NOW()
)

UPDATE users SET name=$1, email=$2 WHERE id=$3 

SELECT * FROM users WHERE email = $1