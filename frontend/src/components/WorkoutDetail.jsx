import React, { useState } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
//date-fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import EditWorkout from "../components/EditWorkout";

const WorkoutDetail = ({ workout }) => {
  const { dispatch } = useWorkoutContext();

  const [isEditing, setIsEditing] = useState(false);

  const [editedWorkout, setEditedWorkout] = useState(workout);

  const [emptyFields, setEmptyFields] = useState([]);

  const [message, setMessage] = useState(null);

  const handleDelete = async () => {
    const result = await fetch(
      `http://localhost:3000/api/workouts/${workout._id}`,
      {
        method: "DELETE",
      }
    );
    const json = await result.json();

    if (result.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async (event) => {
    event.preventDefault();
    const result = await fetch(
      `http://localhost:3000/api/workouts/${workout._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedWorkout),
      }
    );
    const json = await result.json();
    if (result.ok) {
      setMessage(json.message);
      setEmptyFields([]);
      dispatch({ type: "UPDATE_WORKOUT", payload: json });
      setIsEditing(false);
    } else {
      setMessage(json.error);
      setEmptyFields(json.emptyFields);
    }
  };

  const handleCancel = () => {
    setEditedWorkout(workout);
    setIsEditing(false);
  };

  const handleChange = (event) => {
    setEditedWorkout((prevWorkout) => ({
      ...prevWorkout,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div className="workout-details">
      {isEditing ? (
        <EditWorkout
          workout={editedWorkout}
          handleSave={handleSave}
          handleCancel={handleCancel}
          handleChange={handleChange}
          emptyFields={emptyFields}
          message={message}
        />
      ) : (
        <>
          <h4>{workout.title}</h4>
          <p>
            <strong>Load (kg) : </strong> {workout.load}
          </p>
          <p>
            <strong>Reps : </strong> {workout.reps}
          </p>
          <small>
            <p>
              <strong>Created At : </strong>
              {formatDistanceToNow(new Date(workout.createdAt), {
                addSuffix: true,
              })}
            </p>
            <p>
              <strong>Updated At : </strong>
              {formatDistanceToNow(new Date(workout.updatedAt), {
                addSuffix: true,
              })}
            </p>
          </small>
          <span
            style={{ marginRight: "50px" }}
            className="material-symbols-outlined"
            onClick={handleEdit}
          >
            edit
          </span>
          <span className="material-symbols-outlined" onClick={handleDelete}>
            delete
          </span>
        </>
      )}
    </div>
  );
};

export default WorkoutDetail;
