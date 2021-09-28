import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

let workoutArray = ["object 1"];


function Workout( props ) {
  const {state} = useLocation();
  const {workoutType, workoutTarget, workoutReps } = state;
  const [query, setQuery] = useState([]);


  let url = `http://localhost:3000/workouts?type=${workoutType}&target=${workoutTarget}`;
  useEffect(()=>{
    fetch(url)
      .then(response => response.json())
      .then(setQuery);
  }, [url]);

  let workoutArray = ['1', '1', '1', '1', '1'];


  // for (var i = 0; i < workoutReps; i++) {
  //   let randomNumber = Math.floor(Math.random() * workoutArray.length + 1);
  //   // console.log(randomNumber);
  //   // workoutArray.push(query[randomNumber]);
  // } 

  function WorkoutList() { 

    return (
      <ul>
        {
          workoutArray.map((item) => {
              return <li>{item}</li>
          })
        }
      </ul>);
  }

  return (
    <div>
      <p>{ workoutReps }</p>
      <div>{ <WorkoutList /> }</div>
    </div>
  );
}

export default Workout;
