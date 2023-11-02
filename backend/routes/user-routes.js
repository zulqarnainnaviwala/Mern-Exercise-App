import express from "express";
import { loginUser, signupUser } from "../controllers/user-controller.js";

const userRoutes = express.Router();

userRoutes.post("/login", loginUser);
userRoutes.post("/signup", signupUser);

export default userRoutes;
