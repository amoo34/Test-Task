const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

/* DECODING JWT */
const authenticateRequest = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(400).json({
        error: `Authentication failed. Please use correct credentials.`,
      });
    } else {
      /* FETCH FIRST PART OF THE TOKEN SENT IN HEADERS */
      const token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, "test");

      req.userData = decoded;
      console.log("req.user", req.userData);
      const userFound = await UserModel.findById(decoded._id);
      console.log(userFound);
      if (userFound) {
        next();
      } else {
        return res.status(401).json({
          message: "Auth failed !",
        });
      }
    }
  } catch (error) {
    console.log("check auth error ", error);
    return res.status(401).json({
      message: "Auth failed !",
      err: error,
    });
  }
};

module.exports = {
  authenticateRequest,
};
