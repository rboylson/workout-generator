import { useEffect, useState } from 'react';
import './Exercise.scss';

function deleteItem(props) {
  let url = `http://localhost:3000/workouts/${ props.id }`;

  fetch(url, { method: 'DELETE' });
  window.location.reload(false);
}

function editItem(props) {
  var editInput = document.getElementById("form" + props.id);
  var editRow = document.getElementById("row" + props.id);

  if (editInput.style.display === "block") {
    editInput.style.display = "none";
    editRow.style.display = "flex";
  } else {
    editInput.style.display = "block";
    editRow.style.display = "none";
  }
}

function updateItem( props ) {
  let url = `http://localhost:3000/workouts/${ props.id }`;

  let section = document.getElementById(props.id);

  let name = section.querySelector("#name").value;
  let type = section.querySelector("#type").value;
  let timing = section.querySelector("#timing").value;
  let target = section.querySelector("#target").value;

  if (name === "" ) { name = props.name }
  if (type === "" ) { type = props.type }
  if (timing === "" ) { timing = props.timing }
  if (target === "" ) { target = props.target }

  let body = {
    id: props.id,
    name: name,
    type: type,
    timing: timing,
    target: target
  };

  fetch(url, {
    method: 'PUT',
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    body: JSON.stringify(body)
  });

  window.location.reload(false);
}

function Exercise( props ) {  

  const [type, setType] = useState([]);
  useEffect(()=>{
    fetch('http://localhost:3000/types')
      .then(response => response.json())
      .then(setType);
  }, []);

  const [target, setTarget] = useState([]);
  useEffect(()=>{
    fetch('http://localhost:3000/target')
      .then(response => response.json())
      .then(setTarget);
  }, []);

  return (
    <div className="exercise-container">
      <div className="exercise-wrapper" id={props.id}>
        <div className="exercise exercise-columns" id={`row${props.id}`}>
            <div className="cell name" onClick={() => editItem(props)}>{ props.name }</div>
            <div className="cell type">{ props.type }</div>
            <div className="cell timing">{ props.timing }</div>
            <div className="cell target">{ props.target}</div>
        </div>

        <div className="exercise-form" id={`form${props.id}`}>
          <form id="inputExercise" target="formframe" onSubmit={() => updateItem(props)} >
            <input className="cell inputName" type="text" id="name" name="name" placeholder={props.name} />
            <select id="type"  className="inputType" name="type">
              <option value={props.type}>{props.type}</option>
              {
                type.map(item => 
                  props.type !== item.name ? <option key={item.id} value={item.name}>{item.name}</option> : ""
                )
              }
            </select>
            <input className="cell inputTiming" type="text" id="timing" name="timing" placeholder={props.timing} />
            <select id="target" className="inputTarget" name="target">
              <option value={props.target}>{props.target}</option>
              {
                target.map(item => 
                  props.target !== item.name ? <option key={item.id} value={item.name}>{item.name}</option> : ""
                )
              }
            </select>
            <input type="submit"/>
          </form> 
        </div>
      </div>

      <div className="delete-button">
        <button onClick={() => deleteItem(props)}>×</button>
        <button onClick={() => editItem(props)}>✎</button>
      </div>

    </div>
  );
}

export default Exercise;
