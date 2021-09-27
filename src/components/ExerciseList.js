import { useEffect, useState } from 'react';
import Exercise from './Exercise.js';
import AddWorkout from './AddWorkout.js';
import WorkoutGenerator from './WorkoutGenerator.js';
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

      <div className="exercise-header">
        <div className="heading">Name</div>
        <div className="heading">Type</div>
        <div className="heading">Timing</div>
        <div className="heading">Target</div>
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

        <WorkoutGenerator />

    </div>
  );
}

export default ExerciseList;
