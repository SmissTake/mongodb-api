const Joi = require('joi');

const commentCreateSchema = Joi.object({
  comment: Joi.string().required(),
  images: Joi.array().items(Joi.object({
    url: Joi.string().required()
  })),
});

const commentUpdateSchema = Joi.object({
  placeId: Joi.string().required(),
  comment: Joi.string(),
  images: Joi.array().items(Joi.object({
    url: Joi.string().required()
  })),
});

module.exports = {
  commentCreateSchema,
  commentUpdateSchema
};