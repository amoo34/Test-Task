// importing required packages and modules
const mongoose = require("mongoose");
const connectDatabase = async () => {
  try {
    // setting config params in an object which will be passed
    // as a param to the connect function
    const connectionConfig = {
      useNewUrlParser: true,
    };

    // making connection to the database
    await mongoose.connect(`mongodb://localhost:27017/Task`, connectionConfig);

    // logging success messsage to the console
    console.log(`Database connection successful.`);
  } catch (error) {
    // this code runs in case of an error @ runtime

    // logging the error messages to the console
    console.log(`ERROR @ connectDatabase -> database.helpers.js`, error);

    // exiting the current node process
    process.exit(1);
  }
};

// this helper disconnects the instance of MongoDB Atlas
// database in the cloud
const disconnectDatabase = async () => {
  try {
    // closing the active mongoose connection to mongo db
    await mongoose.connection.close();

    // logging message to the console
    logInfo(`Connection to database closed.`);

    // killing the current process
    process.exit();
  } catch (error) {
    // this code runs in case of an error @ runtime

    // logging error messages to the console
    console.log(`ERROR @ disconnectDatabase -> database.helpers.js`, error);
  }
};

// exporting helpers as module
module.exports = {
  connectDatabase,
  disconnectDatabase,
};
