import React, { useEffect, useState } from "react";
import WorkoutDetail from "./WorkoutDetail";
import WorkoutForm from "./WorkoutForm";

import { useWorkoutContext } from "../hooks/useWorkoutContext.jsx";

const Home = () => {
  // const [workouts, setWorkouts] = useState(null);

  const { workouts, dispatch } = useWorkoutContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const result = await fetch("http://localhost:3000/api/workouts/");
      const json = await result.json();
      if (result.ok) {
        // setWorkouts(json);
        dispatch({ type: "SET_WORKOUT", payload: json });
      }
    };
    fetchWorkouts();
    // }, []);
  }, [dispatch]);

  return (
    <div className="home">
      <div className="workouts">
        {/* {workouts && workouts.map((workout) => <p key={workout._id}>{workout._id}</p>)} */}
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetail key={workout._id} workout={workout} />
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
