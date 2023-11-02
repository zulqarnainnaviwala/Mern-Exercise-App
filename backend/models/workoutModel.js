import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    reps: {
      type: Number,
      required: true,
    },
    load: {
      type: Number,
      required: true,
    },
    //to track which user data needs to be shown on individual basis
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const workoutModel = mongoose.model("Workout", workoutSchema);
export default workoutModel;
