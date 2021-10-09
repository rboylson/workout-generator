import { Route, Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { Box, Button, Grid, Select, Text, TextInput, ThemeContext } from 'grommet';


function WorkoutGenerator() {
  
  const [workoutTypeInput, setWorkoutTypeInput] = useState('');
  const [workoutTargetInput, setWorkoutTargetInput] = useState('');
  const [workoutRepsInput, setWorkoutRepsInput] = useState('');
  const [type, setType] = useState([]);
  const [targets, setTarget] = useState([]);
  const [typeRequired, setTypeRequired] = useState(false);
  const [targetRequired, setTargetRequired] = useState(false);
  const [repsRequired, setRepsRequired] = useState(false);
  let typeExercises = [];
  let targetExercises = [];

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

      <Box align='end' margin={{ top: "18px",right: "20px" }}>
        <Link to="/list"><Text size="xlarge">⚙</Text></Link>
      </Box> 

      <Box pad= {{ left: 'small', right: 'small', top: 'xlarge', bottom: 'none' }} >
        
        <Text 
          size="xlarge"
          textAlign="center"
          margin="medium" >
          Generate Workout
        </Text>
      </Box>

      
      <Box pad= {{ left: 'small', right: 'small', top: 'none', bottom: 'medium' }} >
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
                `,
              }
            }}
          >

          <Grid
            columns={['medium', 'medium', 'xsmall']}
            justifyContent="center"
            gap="small" >

              <Box>
                <Select
                  placeholder="Type"
                  multiple
                  messages={{ multiple: "Multiple" }}
                  closeOnChange={false}
                  options={typeExercises}
                  onChange={(event) => {
                     setWorkoutTypeInput(event.value);
                     setTypeRequired(false);
                  }}
                />
                <Text size="xsmall" className="required">{typeRequired && "required" }&nbsp;</Text>
              </Box>

              <Box>
                <Select
                  placeholder="Target"
                  options={targetExercises}
                  onChange={(event) => { 
                    setWorkoutTargetInput(event.value);
                    setTargetRequired(false);
                  }}
                />
                <Text size="xsmall" className="required">{targetRequired && "required" }&nbsp;</Text>
              </Box>
              
              <Box>
                <TextInput 
                  placeholder="Reps" 
                  value={workoutRepsInput}
                  onChange={(event) => {  
                    setWorkoutRepsInput(event.target.value);
                    setRepsRequired(false);
                  }}
                  type="number"
                />
                <Text size="xsmall" className="required">{repsRequired && "required" }&nbsp;</Text>
              </Box>
          </Grid>

        </ThemeContext.Extend>
      </Box>

      <Box>
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
          <Route render={({ history }) => (
            <Button
              label="Start Workout" 
              onClick={() => { 
                  if(workoutTypeInput !== "" && workoutTargetInput !== "" && workoutRepsInput !== "") {
                    history.push( {
                    pathname: "/start",
                    state: { 
                      workoutType: workoutTypeInput, 
                      workoutTarget: workoutTargetInput, 
                      workoutReps: workoutRepsInput }
                    });
                  } else {
                    if(workoutTypeInput === "") { setTypeRequired(true); }
                    if(workoutTargetInput === "") { setTargetRequired(true); }
                    if(workoutRepsInput === "") { setRepsRequired(true); }
                  }
                }} >
              </Button>
            )} 
          />
        </ThemeContext.Extend>
      </Box>
    </div>
  );
}

export default WorkoutGenerator;