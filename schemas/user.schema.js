const Joi = require('joi');

const registerSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    bio: Joi.string().allow('')
});

const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(6).required()
});

module.exports = {
    registerSchema,
    loginSchema
};