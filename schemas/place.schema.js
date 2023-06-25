const Joi = require('joi');

const placeCreateSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    history: Joi.string().required(),
    town: Joi.string().required(),
    category: Joi.string().optional(),
    accessibility: Joi.string().valid('easy', 'medium', 'hard'),
    images: Joi.array().items(Joi.object({
        url: Joi.string().required()
    })),
});

const placeUpdateSchema = Joi.object({
    title: Joi.string().optional(),
    description: Joi.string().optional(),
    history: Joi.string().optional(),
    town: Joi.string().optional(),
    category: Joi.string().optional(),
    accessibility: Joi.string().valid('easy', 'medium', 'hard').optional(),
    images: Joi.array().items(Joi.object({
        url: Joi.string().required()
    })).optional(),
    removeImages: Joi.array().items(Joi.string()).optional()
});

module.exports = {
    placeCreateSchema,
    placeUpdateSchema
};