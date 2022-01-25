import * as Joi from 'joi';

export const schemaUser = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .required(),

  mail: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'], }, })
    .required(),

  password: Joi.string()
    .min(3)
    .max(30)
    .required(),

  phone: Joi.string()
    .required(),

  birth: Joi.date()
    .required(),

  sex: Joi.date()
    .required(),
});
