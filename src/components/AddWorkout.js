import { useEffect, useState } from 'react';
import { Grid, Button as GrommetButton, TextInput } from 'grommet';
import './AddWorkout.scss';


function addExerciseToList(exerciseNameInput, exerciseTypeInput, exerciseTargetInput, exerciseTimingInput, list) {
  let url = `http://localhost:3000/workouts/`;

  let body = {
    name: exerciseNameInput,
    type: exerciseTypeInput,
    timing: exerciseTargetInput,
    target: exerciseTimingInput
  };

  fetch(url, {
    method: 'POST',
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    body: JSON.stringify(body)
  });

}

function AddWorkout( props ) {  
  
  let typeExercises = [];
  let targetExercises = [];
  const [type, setType] = useState([]);
  const [targets, setTarget] = useState([]);
  const [exerciseNameInput, setExerciseNameInput] = useState('');
  const [exerciseTypeInput, setExerciseTypeInput] = useState('');
  const [exerciseTargetInput, setExerciseTargetInput] = useState('');
  const [exerciseTimingInput, setExerciseTimingInput] = useState('');

  useEffect(()=>{
    fetch('http://localhost:3000/types')
      .then(response => response.json())
      .then(setType);
  }, []);

  useEffect(()=>{
    fetch('http://localhost:3000/target')
      .then(response => response.json())
      .then(setTarget);
  }, []);
  
  type.map((element, index) => {
    return typeExercises[index] = element.name;
  });  
  
  targets.map((element, index) => {
    return targetExercises[index] = element.name;
  });

  return (
    <div>
      <h2>Add Exercise</h2>
      <Grid
        fill
        columns={['small', 'xsmall', 'small', 'xsmall', 'xsmall']}
        rows={['flex']}
        gap="small"
      >
          <TextInput 
            placeholder="Exercise Name" 
            value={exerciseNameInput}
            onChange={event => setExerciseNameInput(event.target.value)}
            className="add-workout-cell"
          />
          <TextInput
            placeholder="Exercise Type"
            value={exerciseTypeInput}
            onSelect={event => setExerciseTypeInput(event.suggestion)}
            suggestions={typeExercises}
            className="add-workout-cell"
          />        
          <TextInput
            placeholder="Exercise Target"
            value={exerciseTargetInput}
            onSelect={event => setExerciseTargetInput(event.suggestion)}
            suggestions={targetExercises}
            className="add-workout-cell"
          />
          <TextInput 
            placeholder="Timing" 
            value={exerciseTimingInput}
            onChange={event => setExerciseTimingInput(event.target.value)}
            className="add-workout-cell" 
          />
          <GrommetButton 
            label="Add" 
            onClick={() => addExerciseToList(exerciseNameInput, exerciseTypeInput, exerciseTargetInput, exerciseTimingInput)} 
          />
        </Grid>
    </div>
  );
}

export default AddWorkout;
