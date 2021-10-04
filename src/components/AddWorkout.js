import { useEffect, useState } from 'react';
import { Grid, Box, Button as GrommetButton, Select, Text, TextInput, ThemeContext } from 'grommet';


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

  function addExerciseToList(exerciseNameInput, exerciseTypeInput, exerciseTargetInput, exerciseTimingInput ) {
    let url = `http://localhost:3000/workouts/`;
  
    let body = {
      name: exerciseNameInput,
      type: exerciseTypeInput,
      target: exerciseTargetInput,
      timing: exerciseTimingInput
    };
  
    fetch(url, {
      method: 'POST',
      headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
      },
      body: JSON.stringify(body)
    });
  
    props.setUrlUpdated(url);
  
  }

  return (
    <div>

      <Box pad={{top: 'small', left: 'small', bottom: 'medium'}} >
        <Text size="large" >
            Add Workout
        </Text>
      </Box>

      <Box pad={{horizontal: 'small', bottom: 'medium'}} >

        <ThemeContext.Extend
          value={{
            grid: {
              extend: () => `
                @media screen and (max-width: 767px) {
                  flex-direction: column;
                  display: flex;
                  max-width: 300px;
                  margin: 0 auto;
                }
              `,
            },
            text: {
              extend: () => `
                font-size: 18px;
              `
            }
          }}
        >

          <Grid
            fill
            columns={['medium', 'medium', 'medium', 'xsmall', 'xsmall']}
            rows={['flex']}
            gap="small"
          >

            <TextInput 
              placeholder="Exercise Name" 
              value={exerciseNameInput}
              onChange={event => setExerciseNameInput(event.target.value)}
            /> 

            <Select
              placeholder="Exercise Type"
              options={typeExercises}
              onChange={event => setExerciseTypeInput(event.value)}
            /> 

            <Select
              placeholder="Exercise Target"
              multiple
              messages={{ multiple: "Multiple" }}
              closeOnChange={false}
              options={targetExercises}
              onChange={event => setExerciseTargetInput((event.value).join(', '))}
            />  

            <TextInput 
              placeholder="Timing" 
              value={exerciseTimingInput}
              onChange={event => setExerciseTimingInput(event.target.value)}
            />

            <ThemeContext.Extend
              value={{
                button: {
                  extend: () => `
                    font-size: 18px;
                    color: white;
                    background-color: purple;
                    border-radius: 50px;
                    height: 46px;
                    width: fit-content;
                    margin: 0 auto;
                  `,
                },
              }}
            >
              <GrommetButton 
                label="Add" 
                onClick={() => addExerciseToList(exerciseNameInput, exerciseTypeInput, exerciseTargetInput, exerciseTimingInput )} 
              />
            
            </ThemeContext.Extend>


          </Grid>
        </ThemeContext.Extend>
      </Box>
    </div>
  );
}

export default AddWorkout;
