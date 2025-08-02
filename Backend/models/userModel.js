const pool = require('../config/db')

const getAllUserSevice = async () => {
    const result = await pool.query("SELECT * FROM users")
    return result.rows;
}

const getByIDUserSevice = async (id) => {
    const result = await pool.query("SELECT * FROM users Where id = $1", [id])
    return result.rows[0];
}

const createUserSevice = async (name, email) => {
    const result = await pool.query("INSERT INTO users (name,email) VALUES ($1,$2) RETURNING *", [name, email])
    return result.rows[0];
}

const updateUserSevice = async (id, name, email) => {
    const result = await pool.query("UPDATE users SET name=$1, email=$2 WHERE id=$3 ", [name, email, id])
    return result.rowCount;
}

const deleteUserSevice = async (id) => {
    const result = await pool.query("DELETE FROM users Where id = $1", [id])
    return result.rowCount;
}

module.exports = {
    createUserSevice, updateUserSevice, deleteUserSevice, getAllUserSevice, getByIDUserSevice
}
