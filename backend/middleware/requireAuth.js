import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const requireAuth = async (request, response, next) => {
  //get authentication from req headers
  const { authorization } = request.headers;

  if (!authorization) {
    return response
      .status(401)
      .json({ error: "hello authentication token required" });
  }

  //getting token from a pattern "zulqarnain abc.pqr.xyz"
  const token = authorization.split(" ")[1];

  try {
    //verify JWT token and getting _id from token
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);

    request.userId = await userModel.findOne({ _id }).select("_id");

    next();
  } catch (error) {
    return response
      .status(401)
      .json({ error: "authentication verification failed" });
  }
};
