import { Route } from 'react-router-dom'
import { useEffect, useState } from 'react';
import './WorkoutGenerator.scss';


function WorkoutGenerator() {

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
    <div className="workout-generator">
      <h2>Generate Workout</h2>

      <div className="workout-generator-wrapper">
        <form autoComplete="off">
          <select id="workoutType" className="inputType"  name="workoutType">
            {type.map(item =>
              <option key={item.id} value={item.name}>{item.name}</option>
            )}
          </select>
          <select id="workoutTarget" className="inputTarget" name="workoutTarget">
            {targets.map(item =>
              <option key={item.id} value={item.name}>{item.name}</option>
            )}
          </select>
          <input type="reps" id="workoutTiming" className="inputTiming" name="workoutTiming" placeholder="Reps" />
          
        </form> 
        
        <Route render={({ history }) => (
          <button onClick={() => { 
              let workoutType = document.querySelector("#workoutType").value;
              let workoutTarget = document.querySelector("#workoutTarget").value;
              let workoutReps = document.querySelector("#workoutTiming").value;
              if (workoutReps === "" ) { workoutReps = "12" }

              history.push( {
                pathname: '/start',
                state: { workoutType: workoutType, workoutTarget: workoutTarget, workoutReps: workoutReps }
              });
            }} >
            Start Workout
          </button>
        )} />
      </div>
      
    </div>
  );
}

export default WorkoutGenerator;