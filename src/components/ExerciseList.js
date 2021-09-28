import { useEffect, useState } from 'react';
import Exercise from './Exercise.js';
import AddWorkout from './AddWorkout.js';
import './ExerciseList.scss';

function ExerciseList() {

  const [list, setList] = useState([]);
  useEffect(()=>{
    fetch('http://localhost:3000/workouts')
      .then(response => response.json())
      .then(setList);
  }, []);

  return (
    <div className="exercise-list">

      <h2>Exercise List</h2>

      <div className="exercise-header exercise-columns">
        <div className="heading cell name">Name</div>
        <div className="heading cell type">Type</div>
        <div className="heading cell timing">Timing</div>
        <div className="heading cell target">Target</div>
      </div>

      {list.map(item =>
        <Exercise 
          key={ item.id }
          id={ item.id } 
          name={ item.name } 
          type={ item.type } 
          timing={ item.timing } 
          target={ item.target } 
        />)}

        <AddWorkout />

    </div>
  );
}

export default ExerciseList;
