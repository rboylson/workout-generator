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
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Target</th>
            <th>Timing</th>
            <th></th>
          </tr>
          {list.map(item =>
            <Exercise 
              key={ item.id }
              id={ item.id } 
              name={ item.name } 
              type={ item.type } 
              timing={ item.timing } 
              target={ item.target } 
            />)}
          </tbody>
        </table>
        <AddWorkout />
    </div>
  );
}

export default ExerciseList;
