import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

export const loginUser = async (request, response) => {
  const { email, password } = request.body;

  try {
    const existedUser = await userModel.login(email, password);

    //create token
    const token = createToken(existedUser._id);

    return response.status(200).json({ email, existedUser, token });
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
};

export const signupUser = async (request, response) => {
  // response.json({ message: "signup user" });
  const { email, password } = request.body;

  try {
    const user = await userModel.signup(email, password);

    //create token
    const token = createToken(user._id);

    return response.status(200).json({ email, user, token });
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
};
