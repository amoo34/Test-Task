// importing required packages and modules
const mongoose = require(`mongoose`);

// importing required config params
// const { ACTIVITY_LOG_ID_PREFIX } = require(`../../dependencies/config`);

// defining schema for activity log
const taskSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
  },
});

// exporting model as module
module.exports = mongoose.model(`Tasks`, taskSchema);
