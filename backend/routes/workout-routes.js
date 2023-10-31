import express from "express";
import {
  getAllWorkouts,
  getSingleWorkout,
  createNewWorkout,
  deleteSingleWorkout,
  updateSingleWorkout,
} from "../controllers/workout-controllers.js";

const workoutRoutes = express.Router();

//Get Workouts
// workoutRoutes.get("/",
// (request, response) => {
//   response.json({ message: "get all workout" });
// });
workoutRoutes.get("/", getAllWorkouts);

// Get Single Workout
// workoutRoutes.get("/:id", (request, response) => {
//   response.json({ message: "get single workout" });
// });
workoutRoutes.get("/:id", getSingleWorkout);

// Post Workout
// workoutRoutes.post("/", (request, response) => {
//   response.json({ message: "post a new workout" });
// });
workoutRoutes.post("/", createNewWorkout);

// Delete Workout
// workoutRoutes.delete("/:id", (request, response) => {
//   response.json({ message: "delete workout" });
// });
workoutRoutes.delete("/:id", deleteSingleWorkout);

// Update Workout
// workoutRoutes.patch("/:id", (request, response) => {
//   response.json({ message: "update workout" });
// });
workoutRoutes.patch("/:id", updateSingleWorkout);

export default workoutRoutes;
