const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const mySchema = new Schema({
  name: String,
  objective: String,
  laborField : String,
  courses: {
    type: Array
  }
})

const model = mongoose.model("Message", mySchema)

module.exports = model;
