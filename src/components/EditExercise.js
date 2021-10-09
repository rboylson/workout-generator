import { useState } from 'react';
import { Box, Button as GrommetButton, Layer, Select, Text, TextInput, ThemeContext } from 'grommet';

function EditExercise(props) { 
  
  let [showLayer, setShowLayer] = useState(false);

  const typeExercises=["Exercise", "Stretch"];
  const targetExercises=["Posture", "Arms", "Core"];

  const [exerciseNameInput, setExerciseNameInput] = useState(props.name);
  const [exerciseTypeInput, setExerciseTypeInput] = useState(props.type);
  const [exerciseTargetInput, setExerciseTargetInput] = useState(props.target);
  const [exerciseTimingInput, setExerciseTimingInput] = useState(props.timing);
  const [nameRequired, setNameRequired] = useState(false);
  const [typeRequired, setTypeRequired] = useState(false);
  const [targetRequired, setTargetRequired] = useState(false);
  const [timingRequired, setTimingRequired] = useState(false);
  let deleteLabel = "Delete " + exerciseTypeInput;


  function updateItem(id, exerciseNameInput, exerciseTypeInput, exerciseTargetInput, exerciseTimingInput ) {
    let url = `http://localhost:3000/workouts/${ id }`;

    let body = {
      id: id,
      name: exerciseNameInput,
      type: exerciseTypeInput,
      target: exerciseTargetInput,
      timing: exerciseTimingInput
    };

    fetch(url, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body)
    });

    props.setUrlUpdated(id);
  }
  

  function deleteItem(id) {
    let url = `http://localhost:3000/workouts/${ id }`;  
    fetch(url, { method: 'DELETE' });
    props.setUrlUpdated(id);
  }

  function editItem() {
    setShowLayer(true);
  }

  return (
    <div>

      <ThemeContext.Extend
        value={{
          button: {
            extend: () => `
              font-size: 14px;
              color: purple;
              height: 30px;
            `
          }
        }}
      >
      <GrommetButton 
          label="✎"
          plain
          onClick={() => {
            editItem(props)
          }} 
        />
      </ThemeContext.Extend> 

      { showLayer && (

        <Layer
          position="center"
          onClickOutside={() => setShowLayer(false)}
        >
          <Box pad="medium" gap="small" width="medium">

            <TextInput 
              placeholder={props.name}
              value={exerciseNameInput}
              onChange={(event) => { 
                setExerciseNameInput(event.target.value);
                setNameRequired(false);
              }}
            /> 

            <Select
              placeholder="Type"
              options={typeExercises}
              value={exerciseTypeInput}
              defaultValue={exerciseTypeInput}
              onChange={(event) => {
                setExerciseTypeInput(event.value);
                setTypeRequired(false);
              }}
            />
            
            <Select
              placeholder="Target"
              multiple
              messages={{ multiple: "Multiple" }}
              closeOnChange={false}
              defaultValue={exerciseTargetInput.replace(/\s/g, '').split(',')}
              options={targetExercises}
              onChange={(event) => {
                setExerciseTargetInput((event.value).sort().join(', '));
                setTargetRequired(false);
              }}
            /> 

            <TextInput 
              placeholder="Timing" 
              value={exerciseTimingInput}
              onChange={(event) => {
                setExerciseTimingInput(event.target.value);
                setTimingRequired(false);
              }}
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
            }}>

              <GrommetButton 
                label="Update"
                onClick={() => {
                  updateItem(props.id, exerciseNameInput, exerciseTypeInput, exerciseTargetInput, exerciseTimingInput );
                  setShowLayer(false);
                }}
              />
            
            </ThemeContext.Extend> 

            <GrommetButton 
              label={<Text size="14px" color="purple">{ deleteLabel }</Text>}
              plain
              alignSelf="center"
              onClick={() => {
                deleteItem(props.id);
                setShowLayer(false);
              }} 
            />
           
          </Box>     
        </Layer>
      )}
    </div>
  );
}

export default EditExercise;
