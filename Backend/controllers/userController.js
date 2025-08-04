const { createUserSevice, deleteUserSevice, getAllUserSevice, updateUserSevice, getByIDUserSevice } = require('../models/userModel')

const createUser = async (req, res) => {
    const { name, email } = req.body;

    try {
        const newUser = await createUserSevice(name, email)
        res.send(newUser)
    }
    catch (err) {
        res.send(err)
    }
}


const getAllUser = async (req, res) => {
    try {
        const users = await getAllUserSevice()
        res.send(users)
    }
    catch (err) {
        res.send(err)
    }
}

const getByIdUser = async (req, res) => {
    try {
        const user = await getByIDUserSevice(req.params.id)
        if (!user) res.send('User not found!!')
        res.send(user)
    }
    catch (err) {
        res.send(err)
    }
}
const updateUser = async (req, res) => {
    const { name, email } = req.body;

    try {
        const rowCount = await updateUserSevice(req.params.id, name, email)

        if (rowCount < 1) {
            res.status(404).send("User Not Found")
        }
        res.send(user)
    }
    catch (err) {
        res.send(err)
    }
}

const deleteUser = async (req, res) => {
    try {
        const rowCount = await deleteUserSevice(req.params.id)
        if (rowCount < 1) {
            res.status(404).send("User Not Found")
        }
        res.send(user)
    }
    catch (err) {
        res.send(err)
    }
}

module.exports = { createUser, getAllUser, getByIdUser, updateUser, deleteUser }