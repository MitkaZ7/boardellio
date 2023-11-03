import Joi from 'joi'
const formFieldsOption = () => {
    return {
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'ru'] } }).min(6).max(20),
        password: Joi.string().min(6).max(30).required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
            'any.only': 'Passwords do not match',
            'any.required': 'Confirm password is required',
        }),
    }
}

export const loginSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'ru'] } }).min(6).max(20),
    password: Joi.string().min(6).max(30).required(),

});

export const registrationSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'ru'] } }).min(6).max(20),
    password: Joi.string().min(6).max(30).regex(/^[a-zA-Z0-9]{3,30}$/),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
            'any.only': 'Passwords do not match',
            'any.required': 'Confirm password is required',
        }),
});

// export const schema = Joi.object({
//     email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'ru'] } }).min(6).max(20),
//     password: Joi.string().min(6).max(30),
//     // confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
//     //     'any.only': 'Passwords do not match',
//     //     'any.required': 'Confirm password is required',
//     // }),
// })