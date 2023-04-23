const mongoose = require('mongoose');

// Define a schema for the user object
const { Schema } = mongoose;

const expenseSchema = new Schema({
  _id: { type: String, required: true },
  value: { type: Number, required: true },
  color: { type: String, required: true },
});

const monthSchema = new Schema({
  _id: { type: String, required: true },
  Shopping: expenseSchema,
  "Treat y'self": expenseSchema,
});

const yearSchema = new Schema({
  _id: { type: String, required: true },
  April: [monthSchema],
});

const cardSchema = new Schema({
  cardName: { type: String, required: true },
  balance: { type: Number, required: true },
});

const userSchema = new Schema({
  _id: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  data: {
    2023: yearSchema,
  },
  cards: [cardSchema],
});

// Create a model based on the user schema
const User = mongoose.model('User', userSchema, 'Users');

module.exports = User;
