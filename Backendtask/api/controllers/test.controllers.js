// importing required packages and modules
const mongoose = require(`mongoose`);
// const { logWarning, logError } = require(`../../dependencies/helpers/console.helpers`);

// importing required controllers
const {
  userLoginService,
  userRegisterService,
  createTaskService,
  viewAllTaskService,
  deleteTaskService,
  getUserService,
} = require(`../../dependencies/internal-services/test.services`);

const viewTasks = async (req, res, next) => {
  try {
    const { status, data, error } = await viewAllTaskService();

    // checking the result of the operation
    if (status === 500) {
      // this code runs in case data service failed due to unknown database
      // error

      // logging error message to the console
      console.log(`Requested operation failed. Unknown database error.`);

      // returning the response with an error message
      return res.status(500).json({
        hasError: true,
        message: `ERROR: Requested operation failed.`,
        error: {
          error,
        },
      });
    } else if (status === 409) {
      // this code runs in case data service failed due to duplicate value

      // logging error message to the console
      console.log(`Requested operation failed. duplicate field(s) exists.`);

      // returning the response with an error message
      return res.status(409).json({
        hasError: true,
        message: `ERROR: Requested operation failed.`,
        error: {
          error,
        },
      });
    }

    // returning the response with success message
    return res.status(200).json({
      tasks: data,
    });
  } catch (error) {
    return res.status(500).json({
      hasError: true,
      message: `ERROR: Requested operation failed.`,
      error: {
        error: `An unhandled exception occured on the server.`,
      },
    });
  }
};

const createTask = async (req, res, next) => {
  try {
    // calling data service to create new Task in the database
    const { status, data, error } = await createTaskService(req.body);

    // checking the result of the operation
    if (status === 500) {
      // this code runs in case data service failed due to unknown database
      // error

      // logging error message to the console
      console.log(`Requested operation failed. Unknown database error.`);

      // returning the response with an error message
      return res.status(500).json({
        hasError: true,
        message: `ERROR: Requested operation failed.`,
        error: {
          error,
        },
      });
    } else if (status === 409) {
      // this code runs in case data service failed due to duplicate value

      // returning the response with an error message
      return res.status(409).json({
        hasError: true,
        message: `ERROR: Requested operation failed.`,
        error: {
          error,
        },
      });
    }
    // returning the response with success message
    return res.status(201).json({
      task: data,
    });
  } catch (error) {
    return res.status(500).json({
      hasError: true,
      message: `ERROR: Requested operation failed.`,
      error: {
        error: `An unhandled exception occured on the server.`,
      },
    });
  }
};

const userRegister = async (req, res, next) => {
  try {
    const { status, data, error } = await userRegisterService(req.body);
    // checking the result of the operation
    if (status === 500) {
      // this code runs in case data service failed due to unknown database
      // error

      // logging error message to the console
      console.log(`Requested operation failed. Unknown database error.`);

      // returning the response with an error message
      return res.status(500).json({
        hasError: true,
        message: `ERROR: Requested operation failed.`,
        error: {
          error,
        },
      });
    } else if (status === 409) {
      // this code runs in case data service failed due to duplicate value

      // logging error message to the console
      console.log(`Requested operation failed. duplicate field(s) exists.`);

      // returning the response with an error message
      return res.status(409).json({
        hasError: true,
        message: `ERROR: Requested operation failed.`,
        error: {
          error,
        },
      });
    }

    // returning the response with success message
    return res.status(201).json({
      // hasError: false,
      // message: `SUCCESS: Requested operation successful.`,
      user: {
        id: data._id,
        email: data.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      hasError: true,
      message: `ERROR: Requested operation failed.`,
      error: {
        error: `An unhandled exception occured on the server.`,
      },
    });
  }
};

const getUsers = async (req, res, next) => {
  try {
    const { status, data, error } = await getUserService();
    // checking the result of the operation
    if (status === 500) {
      // this code runs in case data service failed due to unknown database
      // error

      // logging error message to the console
      console.log(`Requested operation failed. Unknown database error.`);

      // returning the response with an error message
      return res.status(500).json({
        hasError: true,
        message: `ERROR: Requested operation failed.`,
        error: {
          error,
        },
      });
    } else if (status === 409) {
      // this code runs in case data service failed due to duplicate value

      // logging error message to the console
      console.log(`Requested operation failed.  duplicate field(s) exists.`);

      // returning the response with an error message
      return res.status(409).json({
        hasError: true,
        message: `ERROR: Requested operation failed.`,
        error: {
          error,
        },
      });
    }

    // returning the response with success message
    return res.status(200).json({
      // hasError: false,
      // message: `SUCCESS: Requested operation successful.`,
      user: data,
    });
  } catch (error) {
    return res.status(500).json({
      hasError: true,
      message: `ERROR: Requested operation failed.`,
      error: {
        error: `An unhandled exception occured on the server.`,
      },
    });
  }
};

const userLogin = async (req, res, next) => {
  try {
    // fetching required data via incoming token data
    // const { _id } = req.tokenData;

    const { status, data, error } = await userLoginService(
      req.body,
      (_id = new mongoose.Types.ObjectId())
    );

    // checking the result of the operation
    if (status === 500) {
      // this code runs in case data service failed due to unknown database
      // error

      // logging error message to the console
      console.log(`Requested operation failed. Unknown database error.`);

      // returning the response with an error message
      return res.status(500).json({
        hasError: true,
        message: `ERROR: Requested operation failed.`,
        error: {
          error,
        },
      });
    } else if (status === 401) {
      // this code runs in case data service failed due to duplicate value

      // logging error message to the console
      console.log(`User Auth Failed.`);

      // returning the response with an error message
      return res.status(401).json({
        hasError: true,
        message: `ERROR: Requested operation failed.`,
        error: {
          error,
        },
      });
    }

    // returning the response with success message
    return res.status(200).json({
      jwt: data,
    });
  } catch (error) {
    return res.status(500).json({
      hasError: true,
      message: `ERROR: Requested operation failed.`,
      error: {
        error: `An unhandled exception occured on the server.`,
      },
    });
  }
};

// exporting contrllers as modules
module.exports = {
  userLogin,
  userRegister,
  viewTasks,
  createTask,
  getUsers,
};
