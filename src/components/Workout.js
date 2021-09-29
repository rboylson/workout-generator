import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Workout.scss';
import CompleteMessage from './CompleteMessage.js';


function Workout( props ) {

  const {state} = useLocation();
  const {workoutType, workoutTarget, workoutReps } = state;
  const [query, setQuery] = useState([]);
  const [workoutArray, setWorkoutArray] = useState([]);
  
  let url = `http://localhost:3000/workouts?type=${workoutType}&target=${workoutTarget}`;
  useEffect(()=>{
    fetch(url)
      .then(response => response.json())
      .then(setQuery);
  }, [url]);

  for (var j = 0; j < query.length; j++) {
    workoutArray[j] = {...query[j], "count": "0"};
  }

  for (var i = 0; i < workoutReps; i++) {
    let randomNumber = Math.floor(Math.random() * (workoutArray.length));
    if (workoutArray[randomNumber] != null) {
      workoutArray[randomNumber].count++;
    }
  } 

  let checkedArray = [];
  let checkboxArray = document.getElementsByClassName("checkbox-item");

  function workoutChecked(workoutId) {

    if(checkedArray.indexOf(workoutId) === -1 ) {
      checkedArray.push(workoutId);
    } else {
      checkedArray.splice((checkedArray.indexOf(workoutId), 1));
    }
    console.log("! " + checkboxArray.length + " " + checkedArray.length + " " + checkedArray);

    if (checkedArray.length === checkboxArray.length) {
      console.log("complete!");
      let completeMessage = document.getElementById("complete-message");
      completeMessage.style.left = "0";
    }
  }


  let WorkoutList = () => { 
    setWorkoutArray(workoutArray);
    return (
      <div>
        {
          workoutArray.map((item) => {
            if (item && item.count > 0) {
              return (
                <div className="workout-list-item">
                  <label>{item.name}: {item.timing}</label>
                  <div className="workout-list-item">
                    <label>{item.count}&nbsp;{item.id}&nbsp;&nbsp;</label>
                    <input type="checkbox" className="checkboxWorkout checkbox-item" id={item.id} name={item.id} value={item.id} 
                    onClick={() => workoutChecked(item.id)}/>
                  </div>
                </div>
              )
            }
          })
        }
      </div>
    )
  }

  return (
    <div>
      <div>{ <WorkoutList /> }</div>
      <div>{ <CompleteMessage /> }</div>
    </div>
  );
}

export default Workout;
