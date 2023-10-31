import Joi from 'joi'

export const loginSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['ru', 'com', 'net'] } }).required(),
    password: Joi.string().min(6).max(12).required(),

});

export const registrationSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(12).regex(/^[a-zA-Z0-9]{3,30}$/),
    confirmPassword: Joi.ref('password'),
});