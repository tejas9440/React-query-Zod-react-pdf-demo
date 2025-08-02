const express = require('express');
const { createUser, getAllUser, getByIdUser, updateUser, deleteUser } = require('../controllers/userController');

const router = express.Router();

router.post('/user', createUser)
router.get('/user', getAllUser)
router.get('/user/:id', getByIdUser)
router.patch('/user/:id', updateUser)
router.delete('/user/:id', deleteUser)

module.exports = router