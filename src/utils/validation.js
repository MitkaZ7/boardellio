import Joi from 'joi'

export const loginSchema = Joi.object({
    email: Joi.string().domain({ tlds: { allow: ['ru', 'com'] } }),
    password: Joi.string().min(6).max(12).required(),

});

export const registrationSchema = Joi.object({
    email: Joi.string().domain({ tlds: { allow: ['ru', 'com'] } }),
    password: Joi.string().min(6).max(12).regex(/^[a-zA-Z0-9]{3,30}$/),
    confirmedPassword: Joi.string().valid(Joi.ref('password')).required().messages({
        'any.only': 'Passwords do not match',
        'any.required': 'Confirm password is required',
    }),
});