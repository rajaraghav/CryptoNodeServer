const mongoose = require("mongoose");
const User = mongoose.model("Users");
module.exports = () => new User({}).save();
