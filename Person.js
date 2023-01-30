const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
name: { type: String, required: true },
age: Number,
favoritFoods: [String],
});

module.exports = mongoose.model("Person", userSchema);