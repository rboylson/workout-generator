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
  const [nameRequired, setNameRequired] = useState(false);
  const [typeRequired, setTypeRequired] = useState(false);
  const [targetRequired, setTargetRequired] = useState(false);
  const [timingRequired, setTimingRequired] = useState(false);

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

    setExerciseNameInput("");
    setExerciseTypeInput("");
    setExerciseTargetInput("");
    setExerciseTimingInput("");
  }

  return (
    <div>
      <Box pad='medium'>

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
            columns={['medium', 'medium', 'medium', 'xsmall', 'xsmall']}
            gap="xsmall"
          >

            <Box>
              <TextInput 
                placeholder="Name" 
                value={exerciseNameInput}
                onChange={(event) => { 
                  setExerciseNameInput(event.target.value);
                  setNameRequired(false);
                }}
              /> 
              <Text size="xsmall" className="required">{nameRequired && "required" }&nbsp;</Text>
            </Box>

            <Box>
              <Select
                placeholder="Type"
                options={typeExercises}
                value={exerciseTypeInput}
                onChange={(event) => {
                  setExerciseTypeInput(event.value);
                  setTypeRequired(false);
                }}
              />
              <Text size="xsmall" className="required">{typeRequired && "required" }&nbsp;</Text>
            </Box>
            
            <Box>
              <Select
                placeholder="Target"
                multiple
                messages={{ multiple: "Multiple" }}
                closeOnChange={false}
                options={targetExercises}
                onChange={(event) => {
                  setExerciseTargetInput((event.value).sort().join(', '));
                  setTargetRequired(false);
                }}
              /> 
              <Text size="xsmall" className="required">{targetRequired && "required" }&nbsp;</Text>
            </Box>

            <Box>
              <TextInput 
                placeholder="Timing" 
                value={exerciseTimingInput}
                onChange={(event) => {
                  setExerciseTimingInput(event.target.value);
                  setTimingRequired(false);
                }}
              />
              <Text size="xsmall" className="required">{timingRequired && "required" }&nbsp;</Text>
            </Box>

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
            }}>

              <GrommetButton 
                label="Add" 
                onClick={() => {
                  if(exerciseNameInput !== "" && exerciseTypeInput !== "" && exerciseTargetInput !== "" && exerciseTimingInput !== "") {
                    addExerciseToList(exerciseNameInput, exerciseTypeInput, exerciseTargetInput, exerciseTimingInput )
                  } else {
                    if(exerciseNameInput === "") { setNameRequired(true); }
                    if(exerciseTypeInput === "") { setTypeRequired(true); }
                    if(exerciseTargetInput === "") { setTargetRequired(true); }
                    if(exerciseTimingInput === "") { setTimingRequired(true); }
                  }
                }} 
              />
            
            </ThemeContext.Extend>
            
          </Grid>
        </ThemeContext.Extend>
      </Box>
    </div>
  );
}

export default AddWorkout;
