import React, { useState } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext.jsx";
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutForm = () => {
  const { user } = useAuthContext();

  const formData = {
    title: "",
    load: "",
    reps: "",
  };
  const [form, setForm] = useState(formData);

  const [message, setMessage] = useState(null);

  const [emptyFields, setEmptyFields] = useState([]);

  const { dispatch } = useWorkoutContext();

  const handleChange = (event) => {
    setForm((form) => ({ ...form, [event.target.name]: event.target.value }));
  };

  const hanldleSubmit = async (event) => {
    event.preventDefault();

    if (!user) {
      setMessage("You must be logged in");
      return;
    }

    const result = await fetch("http://localhost:3000/api/workouts", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${user.token}`,
      },
    });
    const json = await result.json();
    if (result.ok) {
      setForm(formData);
      setMessage(json.message);
      setEmptyFields([]);
      // dispatch({ type: "CREATE_WORKOUT", payload: json });
      dispatch({ type: "CREATE_WORKOUT", payload: json.data });
    } else {
      setMessage(json.error); // Set the error state
      setEmptyFields(json.emptyFields);
    }
  };

  return (
    <form className="create" onSubmit={hanldleSubmit}>
      <label>Exercise Title:</label>
      <input
        type="text"
        name="title"
        value={form.title}
        onChange={(event) => handleChange(event)}
        className={emptyFields.includes("title") ? "error" : ""}
      />

      <label>Load (in kg):</label>
      <input
        type="number"
        name="load"
        value={form.load}
        onChange={(event) => handleChange(event)}
        className={emptyFields.includes("load") ? "error" : ""}
      />

      <label>Reps:</label>
      <input
        type="number"
        name="reps"
        value={form.reps}
        onChange={(event) => handleChange(event)}
        className={emptyFields.includes("reps") ? "error" : ""}
      />

      <button>Add Workout</button>
      {message && (
        <div className={message === "successfully added" ? "success" : "error"}>
          {message}
        </div>
      )}
    </form>
  );
};

export default WorkoutForm;
