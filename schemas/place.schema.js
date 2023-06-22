const Joi = require('joi');

const placeCreateSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    history: Joi.string().required(),
    town: Joi.string().required(),
    category: Joi.string(),
    accessibility: Joi.string().valid('easy', 'medium', 'hard'),
    images: Joi.array().items(Joi.object({
        url: Joi.string().required()
    })),
});

const placeUpdateSchema = Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    history: Joi.string(),
    town: Joi.string(),
    category: Joi.string(),
    accessibility: Joi.string().valid('easy', 'medium', 'hard'),
    images: Joi.array().items(Joi.object({
        url: Joi.string().required()
    })),
});

module.exports = {
    placeCreateSchema,
    placeUpdateSchema
};