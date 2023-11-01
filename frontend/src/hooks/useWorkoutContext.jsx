//custom hook
import { WorkoutContext } from "../context/WorkoutContext";

//built-in hook
import { useContext } from "react";
export const useWorkoutContext = () => {
  const context = useContext(WorkoutContext);

  if (!context) {
    throw Error(
      "useWorkoutContext  must be used inside an WorkoutsContextProvider"
    );
  }
  return context;
};
