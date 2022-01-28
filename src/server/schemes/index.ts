import * as Joi from 'joi';

export const schemaUser = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .required(),

  email: Joi.string()
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

  sex: Joi.string()
    .required(),
});

export const schemaAuth = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .required(),

  password: Joi.string()
    .min(3)
    .max(30)
    .required(),
});

export const schemaStudent = Joi.object({
  userId: Joi.string()
    .required(),

  faculty: Joi.string()
    .required(),

  university: Joi.string()
    .required(),

  group: Joi.number()
    .required(),
});

export const schemaTeacher = Joi.object({
  userId: Joi.string()
    .required(),

  faculty: Joi.string()
    .required(),

  university: Joi.string()
    .required(),
});
