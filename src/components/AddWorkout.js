import { Select, TextInput } from "grommet";
import { useEffect, useState } from "react";

function AddWorkout(props) {
  const [exerciseNameInput, setExerciseNameInput] = useState("");
  const [exerciseTypeInput, setExerciseTypeInput] = useState("");
  const [exerciseTargetInput, setExerciseTargetInput] = useState([]);
  const [exerciseTimingInput, setExerciseTimingInput] = useState("");
  const [nameRequired, setNameRequired] = useState(false);
  const [typeRequired, setTypeRequired] = useState(false);
  const [targetRequired, setTargetRequired] = useState(false);
  const [timingRequired, setTimingRequired] = useState(false);

  useEffect(() => {}, [exerciseTargetInput]);

  function addExerciseToList(
    exerciseNameInput,
    exerciseTypeInput,
    exerciseTargetInput,
    exerciseTimingInput
  ) {
    let url = `${props.jsonUrl}workouts/`;

    let body = {
      name: exerciseNameInput,
      type: exerciseTypeInput,
      target: exerciseTargetInput,
      timing: exerciseTimingInput,
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    }).then(() => {
      props.setExerciseCount(props.exerciseCount + 1);
    });

    setExerciseNameInput("");
    setExerciseTypeInput("");
    setExerciseTargetInput([]);
    setExerciseTimingInput("");
  }

  return (
    <div className="add-workout-wrapper">
      <div className="text-input-wrapper">
        <TextInput
          placeholder="Name"
          value={exerciseNameInput}
          onChange={(event) => {
            setExerciseNameInput(event.target.value);
            setNameRequired(false);
          }}
        />
        <p className="required">{nameRequired && "required"}&nbsp;</p>
      </div>

      <div className="select-input-wrapper">
        <Select
          placeholder="Type"
          options={props.typeExercises}
          value={exerciseTypeInput}
          onChange={(event) => {
            setExerciseTypeInput(event.value);
            setTypeRequired(false);
          }}
        />
        <p className="required">{typeRequired && "required"}&nbsp;</p>
      </div>

      <div className="select-input-wrapper">
        <Select
          placeholder="Target"
          value={exerciseTargetInput}
          multiple
          messages={{ multiple: "Multiple" }}
          closeOnChange={false}
          options={props.targetExercises}
          onChange={(event) => {
            setExerciseTargetInput(event.value);
            setTargetRequired(false);
          }}
        />
        <p className="required">
          {targetRequired && "required: "}select 1 or more
        </p>
      </div>

      <div className="text-input-wrapper timing">
        <TextInput
          placeholder="Reps per set"
          value={exerciseTimingInput}
          onChange={(event) => {
            setExerciseTimingInput(event.target.value);
            setTimingRequired(false);
          }}
        />
        <p className="required">{timingRequired && "required"}&nbsp;</p>
      </div>

      <div>
        <button
          className="styled-button"
          onClick={() => {
            if (
              exerciseNameInput !== "" &&
              exerciseTypeInput !== "" &&
              exerciseTargetInput !== "" &&
              exerciseTimingInput !== ""
            ) {
              addExerciseToList(
                exerciseNameInput,
                exerciseTypeInput,
                exerciseTargetInput.sort().join(", "),
                exerciseTimingInput
              );
            } else {
              if (exerciseNameInput === "") {
                setNameRequired(true);
              }
              if (exerciseTypeInput === "") {
                setTypeRequired(true);
              }
              if (exerciseTargetInput === "") {
                setTargetRequired(true);
              }
              if (exerciseTimingInput === "") {
                setTimingRequired(true);
              }
            }
          }}
        >
          Add Workout
        </button>
      </div>
    </div>
  );
}

export default AddWorkout;
