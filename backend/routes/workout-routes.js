import express from "express";

const workoutRoutes = express.Router();

//Get Workouts
workoutRoutes.get("/", (request, response) => {
  response.json({ message: "get all workout" });
});

// Get Single Workout
workoutRoutes.get("/:id", (request, response) => {
  response.json({ message: "get single workout" });
});

// Post Workout
workoutRoutes.post("/", (request, response) => {
  response.json({ message: "post a new workout" });
});

// Delete Workout
workoutRoutes.delete("/:id", (request, response) => {
  response.json({ message: "delete workout" });
});

// Update Workout
workoutRoutes.patch("/:id", (request, response) => {
  response.json({ message: "update workout" });
});

export default workoutRoutes;
