import workoutModel from "../models/workoutModel.js";
import mongoose from "mongoose";

export const getAllWorkouts = async (request, response) => {
  try {
    const allWorkout = await workoutModel.find({}).sort({ createdAt: -1 }); //sort descending order wise (last entered at fiorst place)
    return response.status(200).json(allWorkout);
  } catch (error) {
    return response.status(404).json({ error: error.message });
  }
};

export const getSingleWorkout = async (request, response) => {
  const workoutId = request.params.id;

  //check if it's not mongo db valid ID
  if (!mongoose.Types.ObjectId.isValid(workoutId)) {
    return response.status(404).json({ error: "Not a valid workout id" });
  }
  try {
    const singleWorkout = await workoutModel.findById(workoutId);
    //check if such id exists in workout db
    if (!singleWorkout) {
      return response.status(404).json({ error: "No such workout found" });
    }
    return response.status(200).json(singleWorkout);
  } catch (error) {
    return response.status(404).json({ error: error.message });
  }
};

export const createNewWorkout = async (request, response) => {
  const { title, reps, load } = request.body;

  let emptyFields = [];
  if (!title) {
    emptyFields.push("title");
  }
  if (!reps) {
    emptyFields.push("reps");
  }
  if (!load) {
    emptyFields.push("load");
  }
  if (emptyFields.length > 0) {
    return response
      .status(400)
      .json({ error: "Please fill in all fields", emptyFields });
  }

  try {
    const createWorkout = await workoutModel.create({ title, reps, load });
    response
      .status(200)
      .json({ message: "successfully added", data: createWorkout });
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

export const deleteSingleWorkout = async (request, response) => {
  const workoutId = request.params.id;
  //check if it's not mongo db valid ID
  if (!mongoose.Types.ObjectId.isValid(workoutId)) {
    return response.status(404).json({ error: "Not a valid workout id" });
  }

  try {
    const deleteWorkout = await workoutModel.findByIdAndDelete(workoutId);
    //check if such id exists in workout db
    if (!deleteWorkout) {
      return response
        .status(404)
        .json({ error: "No such workout found to delete" });
    }
    return response.status(200).json(deleteWorkout);
  } catch (error) {
    return response.status(404).json({ error: error.message });
  }
};

export const updateSingleWorkout = async (request, response) => {
  const workoutId = request.params.id;

  //check if it's not mongo db valid ID
  if (!mongoose.Types.ObjectId.isValid(workoutId)) {
    return response.status(404).json({ error: "Not a valid workout id" });
  }

  const { title, reps, load } = request.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!reps) {
    emptyFields.push("reps");
  }
  if (!load) {
    emptyFields.push("load");
  }

  if (emptyFields.length > 0) {
    return response
      .status(400)
      .json({ error: "Please fill in all fields", emptyFields });
  }

  try {
    const updateWorkout = await workoutModel.findByIdAndUpdate(
      workoutId,
      {
        title,
        reps,
        load,
      },
      { new: true } //ye thirsd parameter updated workout return krega response me  wrna db me update to hojaye response me old hi reflect hoga.
    );

    //check if such id exists in workout db
    if (!updateWorkout) {
      return response
        .status(404)
        .json({ error: "No such workout found to update" });
    }

    return response.status(200).json(updateWorkout);
  } catch (error) {
    return response.status(404).json({ error: error.message });
  }
};
