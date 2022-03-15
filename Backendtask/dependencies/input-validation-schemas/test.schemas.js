// importing required packages and modules
const Joi = require(`joi`);

// defining valdiation schema to add a coordinates
const createTaskSchema = Joi.object({
  name: Joi.string().required(),
}).required();

const createUserSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
}).required();

module.exports = {
  createTaskSchema,
  createUserSchema,
};
