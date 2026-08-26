const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
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
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

UserSchema.statics.login = async function (email, password) {
  const isValidUser = await this.findOne({ email });
  if (!isValidUser) {
    console.log("here")
    throw new Error("User does't exist");
  }
  const isValidPassword = await bcrypt.compare(password, isValidUser.password);
  if (isValidPassword) {
    return isValidUser;
  } else {
    throw new Error("Wrong Password");
  }
};
UserSchema.statics.register = async function (name, email, password) {
  const isUserExist = await this.findOne({ email });
  if (isUserExist) {
    throw new Error("User already exist");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  let user = await this.create({
    name,
    email,
    password: hashedPassword,
  });

  return user;
};

module.exports = mongoose.model("User", UserSchema);
