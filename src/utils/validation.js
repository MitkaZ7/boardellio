import Joi from 'joi'

const options = {
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'ru', 'net'] } }),
    password: Joi.string().min(6).max(30).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
        'any.only': 'Passwords do not match',
        'any.required': 'Confirm password is required',
    }),
    taskTitle: Joi.string().min(5).max(200).required(),
    taskStatus: Joi.string().required(),
    taskProject: Joi.string().required(),
    taskText: Joi.string().min(0),
    projectName: Joi.string().required(),
    projectDescription: Joi.string().min(0),
    projectTag: Joi.string().required(),
    taskPriority: Joi.string(),
    taskAuthor: Joi.string(),
    userName: Joi.string(),
}


export const loginSchema = Joi.object({
    email: options.email,
    password: options.password,

});

export const registrationSchema = Joi.object({
    email: options.email,
    password: options.password,
    confirmPassword: options.confirmPassword,
});

export const createTaskSchema = Joi.object({
    title: options.taskTitle,
    projectId: options.taskProject,
    description: options.taskText,
    priority: options.taskPriority,
    author: options.taskAuthor,

}).required();

export const editTaskSchema = Joi.object({
    title: options.taskTitle,
    status: options.taskStatus,
    projectTitle: options.projectName,
    priority: options.taskPriority,
    description: options.taskText,
}).required();

export const createProjectSchema = Joi.object({
    title: options.projectName,
    description: options.projectDescription,
    tag: options.projectTag,
}).required();

export const userProfileSchema = Joi.object({
    name: options.userName,
    // email: options.email, 

});