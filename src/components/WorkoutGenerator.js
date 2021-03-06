import { Select, TextInput } from "grommet";
import { useState } from "react";
import { Link, Route } from "react-router-dom";
import Settings from "../vectors/Settings";

function WorkoutGenerator(props) {
  const [workoutTypeInput, setWorkoutTypeInput] = useState("");
  const [workoutTargetInput, setWorkoutTargetInput] = useState("");
  const [workoutRepsInput, setWorkoutRepsInput] = useState("");
  const [typeRequired, setTypeRequired] = useState(false);
  const [targetRequired, setTargetRequired] = useState(false);
  const [repsRequired, setRepsRequired] = useState(false);

  return (
    <div className="workout-generator-wrapper">
      <div className="nav-button-wrapper">
        <Link to="/list" className="nav-button">
          <Settings />
        </Link>
      </div>
      <h1>Generate Workout</h1>
      <div className="workout-generator-form">
        <div className="select-input-wrapper">
          <Select
            placeholder="Type"
            multiple
            messages={{ multiple: "Multiple" }}
            closeOnChange={false}
            options={props.typeExercises}
            onChange={(event) => {
              setWorkoutTypeInput(event.value);
              setTypeRequired(false);
            }}
          />
          <p className="required">
            {typeRequired && "required: "} select 1 or more
          </p>
        </div>
        <div className="select-input-wrapper">
          <Select
            placeholder="Target"
            options={props.targetExercises}
            onChange={(event) => {
              setWorkoutTargetInput(event.value);
              setTargetRequired(false);
            }}
          />
          <p className="required">{targetRequired && "required"}&nbsp;</p>
        </div>
        <div className="text-input-wrapper">
          <TextInput
            placeholder="Sets"
            size="xsmall"
            className="reps-input"
            value={workoutRepsInput}
            onChange={(event) => {
              setWorkoutRepsInput(event.target.value);
              setRepsRequired(false);
            }}
            type="number"
            min="1"
            step="1"
          />
          <p className="required">{repsRequired && "required"}&nbsp;</p>
        </div>
      </div>
      <div className="button-wrapper">
        <Route
          render={({ history }) => (
            <button
              className="styled-button"
              onClick={() => {
                if (
                  workoutTypeInput !== "" &&
                  workoutTargetInput !== "" &&
                  workoutRepsInput !== ""
                ) {
                  history.push({
                    pathname: "/start",
                    state: {
                      workoutType: workoutTypeInput,
                      workoutTarget: workoutTargetInput,
                      workoutReps: workoutRepsInput,
                    },
                  });
                } else {
                  if (workoutTypeInput === "") {
                    setTypeRequired(true);
                  }
                  if (workoutTargetInput === "") {
                    setTargetRequired(true);
                  }
                  if (workoutRepsInput === "") {
                    setRepsRequired(true);
                  }
                }
              }}
            >
              Start Workout
            </button>
          )}
        />
      </div>
    </div>
  );
}

export default WorkoutGenerator;
