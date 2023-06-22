const Joi = require('joi');

const registerSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/).required()
        .messages({
            'string.pattern.base': 'Password must contain at least 8 characters, 1 letter and 1 number'
        }),
    bio: Joi.string().allow('')
});

const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/).required()
    .messages({
        'string.pattern.base': 'Password must contain at least 8 characters, 1 letter and 1 number'
    }),
});

module.exports = {
    registerSchema,
    loginSchema
};