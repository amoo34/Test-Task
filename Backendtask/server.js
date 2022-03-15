const express = require("express");
const app = express();

const cors = require("cors");
const morgan = require(`morgan`);
const {
  connectDatabase,
  disconnectDatabase,
} = require(`./dependencies/helpers/database.helpers.js`);

const { testRouter } = require(`./api/routers/test.router`);

// app.use(morgan("dev"));
app.use(express.json());

(async () => {
  try {
    app.use(function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization, franchiseId"
      );
      if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "GET,PUT,POST,PATCH,DELETE");
        return res.status(200).json({ res: "Successful" });
      }
      next();
    });

    app.use(
      express.json({
        limit: "50mb",
      })
    );
    app.use(express.urlencoded());

    app.use("/", testRouter);

    // making connection to database
    await connectDatabase();
    console.log("Connet");
    app.listen(3000, () => {
      console.log("Listening at Port 3000");
    });
  } catch (error) {}
})();
