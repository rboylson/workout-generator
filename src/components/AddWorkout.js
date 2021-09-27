import { useEffect, useState } from 'react';

function AddWorkout( props ) {  
  function refreshPage() {
    window.location.reload(false);
  }

  const [type, setType] = useState([]);
  useEffect(()=>{
    fetch('http://localhost:3000/types')
      .then(response => response.json())
      .then(setType);
  }, []);

  const [targets, setTarget] = useState([]);
  useEffect(()=>{
    fetch('http://localhost:3000/target')
      .then(response => response.json())
      .then(setTarget);
  }, []);

  return (
    <div>
      <h2>Add Exercise</h2>
      <iframe name="formframe" id="formframe" title="formframe"></iframe>
      <form id="input" autoComplete="off" action="http://localhost:3000/workouts" method="POST" target="formframe" onSubmit={() => refreshPage()}>
        <input type="text" id="name" name="name" placeholder="Name" />
        <select id="type" name="type">
          {type.map(item =>
            <option key={item.id} value={item.name}>{item.name}</option>
          )}
        </select>
        <input type="text" id="timing" name="timing" placeholder="Timing" />
        <select id="target" name="target">
          {targets.map(item =>
            <option key={item.id} value={item.name}>{item.name}</option>
          )}
        </select>
        <input type="submit"/>
      </form> 
    </div>
  );
}

export default AddWorkout;
