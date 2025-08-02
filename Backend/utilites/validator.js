const Joi = require('joi')

const validator = (schema) => (payload) => schema.validate(payload, { abortEarly: false })

const userSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).required(),
    comfirmpassword: Joi.ref('password'),
    address: {
        state: Joi.string().required()
    },
    dob: Joi.date().greater(new Date("2012-01-01")).required()
})


exports.validatorUser = validator(userSchema)