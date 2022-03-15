const express = require(`express`);

// importing required middlewares
const {
  authenticateRequest,
} = require(`../middlewares/authentication.middleware`);
const { validateInput } = require(`../middlewares/input-validation.middleware`);

// importing Controllers
const {
  userLogin,
  userRegister,
  viewTasks,
  createTask,
  getUsers,
} = require(`../controllers/test.controllers`);

const testRouter = express.Router();

// importing required valdiating schemas
const {
  createTaskSchema,
  createUserSchema,
  deleteTasksSchemas,
} = require(`../../dependencies/input-validation-schemas/test.schemas`);

// Create Task Route
testRouter.post(
  `/create-task`,
  authenticateRequest,
  validateInput(createTaskSchema, `BODY`),
  createTask
);
// Get Tasks Route
testRouter.get(`/list-tasks`, authenticateRequest, viewTasks);

// Register User Route
testRouter.post(
  `/register`,
  validateInput(createUserSchema, `BODY`),
  userRegister
);
// Login User Route
testRouter.post(`/login`, validateInput(createUserSchema, `BODY`), userLogin);

// get Users Route
testRouter.get(`/user`, authenticateRequest, getUsers);

// exporting router as a module
module.exports = {
  testRouter,
};
