const express = require('express')
const app = express();
const dotenv = require('dotenv')
const pool = require('./config/db.js')
const userRouter = require('./Routes/userRoutes.js')
const createUserTable = require('./data/createUserTable.js')

dotenv.config()

const PORT = process.env.port || 5001

app.use(express.json())

//!create table before starting server
createUserTable()

app.use('/api', userRouter)

// !Multer
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage })

app.post('/upload', upload.single('file'), (req, res) => {
    try {
        res.send('Successfully Uploade!!')
    }
    catch (err) {
        res.send(err)
    }
})

//! User Schema with Joi
const { validatorUser } = require('./utilites/validator');

app.post('/user', (req, res) => {
    const { error, value } = validatorUser(req.body)
    if (error) {
        console.log(error.details);
        return res.send(error.details)
    }
    res.send('Successfully!!')
})


//! PostgreSQL CRUD
app.get("/", async (req, res) => {
    const result = await pool.query("SELECT current_database()");
    res.send(`database name is:${result.rows[0].current_database}`)
})

app.listen(PORT, () => {
    console.log(`Listening On Port ${PORT}`);
})