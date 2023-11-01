import React from "react";

const EditWorkout = ({
  workout,
  handleSave,
  handleCancel,
  handleChange,
  emptyFields,
  message,
}) => {
  return (
    <div className="edit-card">
      <h4>Edit Exercise</h4>

      <form onSubmit={handleSave}>
        <label>Exercise Title:</label>
        <input
          type="text"
          name="title"
          value={workout.title}
          onChange={handleChange}
          className={emptyFields.includes("title") ? "error" : ""}
        />
        <label>Load (in kg):</label>
        <input
          type="number"
          name="load"
          value={workout.load}
          onChange={handleChange}
          className={emptyFields.includes("load") ? "error" : ""}
        />
        <label>Reps:</label>
        <input
          type="number"
          name="reps"
          value={workout.reps}
          onChange={handleChange}
          className={emptyFields.includes("reps") ? "error" : ""}
        />
        <button>Save</button>
        <button
          style={{ marginLeft: "5px" }}
          type="button"
          onClick={handleCancel}
        >
          Cancel
        </button>
        {message && (
          <div
            className={message === "successfully added" ? "success" : "error"}
          >
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default EditWorkout;
