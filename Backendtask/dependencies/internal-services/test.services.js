const mongoose = require(`mongoose`);
// importing required schema models
const Task = require(`../../api/models/task.model`);
const User = require(`../../api/models/user.model`);

const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

const getUserService = async () => {
  try {
    const user = await User.find();
    console.log("user", user);
    return {
      status: 200,
      data: user,
    };
  } catch (error) {
    return {
      status: 500,
      error: "Get User Failed",
    };
  }
};
const userLoginService = async (bodyData, id) => {
  try {
    const user = await User.findOne({ email: bodyData.email });

    if (!user) {
      return {
        status: 401,
        error: "Auth Failed",
      };
    }

    // comparing password
    const isMatch = await bcrypt.compare(bodyData.password, user.password);
    if (isMatch) {
      let payload = {
        _id: user._id,
        email: bodyData.email,
        password: bodyData.password,
      };
      console.log(payload);
      const signToken = await JWT.sign(payload, "test");
      console.log(signToken);
      return {
        status: 200,
        data: signToken,
      };
    } else {
      return {
        status: 401,
        error: "Auth Failed",
      };
    }
  } catch (error) {
    return {
      status: 500,
      error: "User Login Failed",
    };
  }
};

const userRegisterService = async (bodyData, id) => {
  try {
    const userFound = await User.findOne({ email: bodyData.email });
    if (!userFound) {
      //generate salt to hash password
      const salt = await bcrypt.genSalt(10);

      // Generate a password hash (salt + hash)
      let passwordHash = await bcrypt.hash(bodyData.password, salt);

      const newUser = new User({
        email: bodyData.email,
        password: passwordHash,
      });
      const data = await newUser.save();
      return {
        status: 200,
        data,
      };
    } else {
      return {
        status: 409,
        error: "User already exist",
      };
    }
  } catch (error) {
    return {
      status: 500,
      error: "User registration Failed",
    };
  }
};

const createTaskService = async (bodyData) => {
  try {
    const newTask = new Task({ name: bodyData.name, id: Date.now() });
    const data = await newTask.save();
    return {
      status: 200,
      data,
    };
  } catch (error) {
    return {
      status: 500,
      error: "Task Save Failed`",
    };
  }
};

const viewAllTaskService = async () => {
  try {
    const tasks = await Task.find();
    return {
      status: 200,
      data: tasks,
    };
  } catch (error) {
    return {
      status: 500,
      error: "View Task  Failed",
    };
  }
};

const deleteTaskService = async (bodyData) => {
  try {
    const tasks = await Task.deleteMany({ id: { $in: bodyData.ids } });
    return {
      status: 200,
      data: tasks,
    };
  } catch (error) {
    return {
      status: 500,
      error: "Delete Task Failed",
    };
  }
};
//  exporting data services as modules
module.exports = {
  createTaskService,
  viewAllTaskService,
  deleteTaskService,
  getUserService,
  userLoginService,
  userRegisterService,
};
