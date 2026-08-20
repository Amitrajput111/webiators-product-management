const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required(),

  description: Joi.string().trim().min(5).max(1000).required(),

  price: Joi.number().positive().required(),

  category: Joi.string().trim().min(2).max(50).required(),

  image: Joi.string().uri().allow('').optional(),

  stock: Joi.number().integer().min(0).required(),
});

module.exports = {
  productSchema,
};