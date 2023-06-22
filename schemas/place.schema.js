const Joi = require('joi');

const placeSchema = Joi.object({
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

module.exports = {
    placeSchema
};