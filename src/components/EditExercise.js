import { useState } from 'react';
import { Layer, Select, TextInput } from 'grommet';

function EditExercise(props) { 
  
  const [exerciseNameInput, setExerciseNameInput] = useState(props.name);
  const [exerciseTypeInput, setExerciseTypeInput] = useState(props.type);
  const [exerciseTargetInput, setExerciseTargetInput] = useState(props.target);
  const [exerciseTimingInput, setExerciseTimingInput] = useState(props.timing);
  let [showLayer, setShowLayer] = useState(false);
  let deleteLabel = "Delete " + exerciseTypeInput;

  function updateItem(id, exerciseNameInput, exerciseTypeInput, exerciseTargetInput, exerciseTimingInput ) {
    let url = `${ props.jsonUrl }${ id }`;

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
    let url = `${ props.jsonUrl }workouts/${ id }`;  
    fetch(url, { method: 'DELETE' });
    props.setUrlUpdated(id);
  }

  function editItem() {
    setShowLayer(true);
  }

  return (
    <div className="edit-exercise-wrapper">

      <button onClick={() => {
          editItem(props)
        }}>
        ✎
      </button>

      { showLayer && (

        <Layer
          position="center"
          onClickOutside={() => setShowLayer(false)}
        >
          <div className="edit-exercise-layer-wrapper">

            <TextInput 
              placeholder={props.name}
              value={exerciseNameInput}
              onChange={(event) => { 
                setExerciseNameInput(event.target.value);
              }}
            /> 

            <Select
              placeholder="Type"
              options={props.typeExercises}
              value={exerciseTypeInput}
              defaultValue={exerciseTypeInput}
              onChange={(event) => {
                setExerciseTypeInput(event.value);
              }}
            />
            
            <Select
              placeholder="Target"
              multiple
              messages={{ multiple: "Multiple" }}
              closeOnChange={false}
              defaultValue={exerciseTargetInput.replace(/\s/g, '').split(',')}
              options={props.targetExercises}
              onChange={(event) => {
                setExerciseTargetInput((event.value).sort().join(', '));
              }}
            /> 

            <TextInput 
              placeholder="Timing" 
              value={exerciseTimingInput}
              onChange={(event) => {
                setExerciseTimingInput(event.target.value);
              }}
            />

            <button className="styled-button" 
              onClick={() => {
                updateItem(props.id, exerciseNameInput, exerciseTypeInput, exerciseTargetInput, exerciseTimingInput );
                setShowLayer(false);
              }}>
              Update
            </button>

            <p
              className="delete-link"
              onClick={() => {
                deleteItem(props.id);
                setShowLayer(false);
            }}>
              { deleteLabel }
            </p>
           
          </div>     
        </Layer>
      )}
    </div>
  );
}

export default EditExercise;
