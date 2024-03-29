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

  universityId: Joi.string()
    .required(),

  group: Joi.number()
    .required(),
});

export const schemaTeacher = Joi.object({
  userId: Joi.string()
    .required(),

  faculty: Joi.string()
    .required(),

  universityId: Joi.string()
    .required(),
});

export const schemaUserChangeInfo = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30),

  password: Joi.string()
    .min(3)
    .max(30),

  phone: Joi.string(),

  birth: Joi.date(),

  sex: Joi.string(),
});

export const schemaProfileChangeInfo = Joi.object({
  faculty: Joi.string(),

  universityId: Joi.string(),

  group: Joi.number(),
});

export const shemaGrade = Joi.object({
  studentId: Joi.string()
    .required(),

  teacherId: Joi.string()
    .required(),

  grade: Joi.number()
    .required(),

  lesson: Joi.string()
    .required(),
});

export const schemaChangeGrade = Joi.object({
  teacherId: Joi.string()
    .required(),

  grade: Joi.string()
    .required(),
});
