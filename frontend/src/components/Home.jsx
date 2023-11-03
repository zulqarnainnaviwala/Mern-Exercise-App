import React, { useEffect, useState } from "react";
import WorkoutDetail from "./WorkoutDetail";
import WorkoutForm from "./WorkoutForm";
import { useAuthContext } from "../hooks/useAuthContext";

import { useWorkoutContext } from "../hooks/useWorkoutContext.jsx";

const Home = () => {
  // const [workouts, setWorkouts] = useState(null);

  const { workouts, dispatch } = useWorkoutContext();

  const { user } = useAuthContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const result = await fetch("http://localhost:3000/api/workouts", {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      });
      const json = await result.json();
      if (result.ok) {
        // setWorkouts(json);
        dispatch({ type: "SET_WORKOUT", payload: json });
      }
    };
    if (user) {
      fetchWorkouts();
    }
    // }, []);
  }, [dispatch, user]);

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
