import { celebrate, Joi, Segments } from 'celebrate';

const validateOrderBody = celebrate({
  [Segments.BODY]: Joi.object().keys({
    payment: Joi.string()
      .valid('card', 'online')
      .required()
      .messages({
        'any.required': 'Payment method is required',
        'any.only': 'Payment method must be either `card` or `online`',
      }),
    email: Joi.string()
      .email()
      .required()
      .messages({
        'string.email': 'Email must be a valid email address',
        'any.required': 'Email is required',
      }),
    phone: Joi.string()
      .trim()
      .required()
      .messages({
        'any.required': 'Phone number is required',
        'string.empty': 'Phone number cannot be empty',
      }),
    address: Joi.string()
      .trim()
      .required()
      .messages({
        'any.required': 'Address is required',
        'string.empty': 'Address cannot be empty',
      }),
    total: Joi.number()
      .positive()
      .required()
      .messages({
        'any.required': 'Total price is required',
        'number.base': 'Total must be a number',
        'number.positive': 'Total must be a positive number',
      }),
    items: Joi.array()
      .items(Joi.string().required())
      .min(1)
      .required()
      .messages({
        'any.required': 'Items are required',
        'array.base': 'Items must be an array',
        'array.min': 'Items must contain at least one item',
      }),
  }),
});

export default validateOrderBody;
