const mongoose = require("mongoose");
const Address = require("./Address");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    Address : {
      type : mongoose.Schema.Types.ObjectId,
      ref : Address,
      required : false
  }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
