const pool = require('../config/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const getAllUserSevice = async () => {
    const result = await pool.query("SELECT * FROM users")
    return result.rows;
}

const getByIDUserSevice = async (id) => {
    const result = await pool.query("SELECT * FROM users Where id = $1", [id])
    return result.rows[0];
}

const createUserSevice = async (name, email, password) => {
    try {

        const result = await pool.query("INSERT INTO users (name,email,password) VALUES ($1,$2,$3) RETURNING *", [name, email, password])
        console.log(result);
        return result.rows[0];
    }
    catch (err) {
        console.log(err);
    }
}

const loginUserSerrvice = async (email, password) => {
    try {
        const result = await pool.query("SELECT * FROM users WHERE email = $1", [email])


        console.log(result.rows[0]);
        const isPassMatch = await bcrypt.compare(password, result.rows[0].password)

        if (result.rows[0] == undefined) {
            console.log("Invalid Email");
            return { message: "Invalid Email" }
        }
        if (!isPassMatch) {
            console.log("Invalid Email");
            return { message: "Invalid Email" }
        }
        const token = jwt.sign({ userID: result.id }, process.env.SECRET_KEY)
        return { jwtToken: token }
    }
    catch (err) {
        return err
    }

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
    createUserSevice, updateUserSevice, deleteUserSevice, getAllUserSevice, getByIDUserSevice, loginUserSerrvice
}
