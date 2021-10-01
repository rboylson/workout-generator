import { Route } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { Button as GrommetButton, Grid, TextInput } from 'grommet';

function WorkoutGenerator() {

  let typeExercises = [];
  let targetExercises = [];
  const [workoutTypeInput, setWorkoutTypeInput] = useState('');
  const [workoutTargetInput, setWorkoutTargetInput] = useState('');
  const [workoutRepsInput, setWorkoutRepsInput] = useState('');
  const [type, setType] = useState([]);
  const [targets, setTarget] = useState([]);

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
    <div className="workout-generator">
      <h2>Generate Workout</h2>
      <Grid
        fill
        columns={['small', 'small', 'xsmall', 'small']}
        rows={['flex']}
        gap="small"
      >
        <TextInput
          placeholder="Exercise Type"
          value={workoutTypeInput}
          onSelect={event => setWorkoutTypeInput(event.suggestion)}
          suggestions={typeExercises}
          className="add-workout-cell"
        />        
        <TextInput
          placeholder="Exercise Target"
          value={workoutTargetInput}
          onSelect={event => setWorkoutTargetInput(event.suggestion)}
          suggestions={targetExercises}
          className="add-workout-cell"
        />
        <TextInput 
          placeholder="Reps" 
          value={workoutRepsInput}
          onChange={event => setWorkoutRepsInput(event.target.value)}
          className="add-workout-cell" 
          type="number"
        />
        <Route render={({ history }) => (
          <GrommetButton
            label="Start Workout" 
            onClick={() => { 
                history.push( {
                  pathname: '/start',
                  state: { 
                    workoutType: workoutTypeInput, 
                    workoutTarget: workoutTargetInput, 
                    workoutReps: workoutRepsInput }
                });
              }} >
            </GrommetButton>
          )} 
        />
      </Grid>
    </div>
  );
}

export default WorkoutGenerator;