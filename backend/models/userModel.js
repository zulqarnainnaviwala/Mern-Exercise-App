import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      Unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// this. don't work inside arrow function (need to search)

//own static methods in mongoDB like if we create user by own function e.g User.signup() insteqad of User.create()
userSchema.statics.signup = async function (email, password) {
  //validations
  if (!email || !password) {
    throw Error("All fields are required");
  }
  if (!validator.isEmail(email)) {
    throw Error("enter a valid email address");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("use a strong password");
  }

  //check if email alreadt in db
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("email already exists");
  }

  //by using bcrypt generating salt
  const salt = await bcrypt.genSalt(10);
  //hashing the password before saving into database
  const hash = await bcrypt.hash(password, salt);
  //create user
  const user = await this.create({ email, password: hash });

  return user;
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields are required");
  }

  const userExists = await this.findOne({ email });

  if (!userExists) {
    throw Error("wrong email address");
  }

  //campare password comes in parameter with the pass exists in database by bcrypt
  const match = await bcrypt.compare(password, userExists.password); //userExists.password is hashed password which exits in db
  if (!match) {
    throw Error("wrong password");
  }

  return userExists;
};

const userModel = mongoose.model("User", userSchema);
export default userModel;
