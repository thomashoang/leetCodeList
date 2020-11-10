const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const problemSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
  });

  module.exports = Problem = mongoose.model('Problem', problemSchema);