import Joi from 'joi'

const options = {
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'ru'] } }).min(6).max(20),
    password: Joi.string().min(6).max(30).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
        'any.only': 'Passwords do not match',
        'any.required': 'Confirm password is required',
    }),
}


export const loginSchema = Joi.object({
    email: options.email,
    password: options.password,

});

export const registrationSchema = Joi.object({
    email: options.email,
    password: options.password,
    confirmPassword:  options.confirmPassword,
});

// export const schema = Joi.object({
//     email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'ru'] } }).min(6).max(20),
//     password: Joi.string().min(6).max(30),
//     // confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
//     //     'any.only': 'Passwords do not match',
//     //     'any.required': 'Confirm password is required',
//     // }),
// })