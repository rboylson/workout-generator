import { Link } from 'react-router-dom';
import Exercise from './Exercise.js';
import AddWorkout from './AddWorkout.js';

function ExerciseList(props) {

  return (
    <div className="exercise-list-wrapper">
      <Link to="/" className="navButton">⌂</Link>
      <div className="exercise-list">
        <h1>Exercise List</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Target</th>
              <th>Timing</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {props.list.map(item =>
              <Exercise 
                key={item.id}
                id={item.id} 
                name={item.name} 
                type={item.type} 
                timing={item.timing} 
                target={item.target} 
                setUrlUpdated={props.setUrlUpdated}
                typeExercises={props.typeExercises}
                targetExercises={props.targetExercises}
              />
            )}
          </tbody>
        </table>
        <AddWorkout 
          typeExercises={props.typeExercises}
          targetExercises={props.targetExercises}
          setUrlUpdated={props.setUrlUpdated} />
      </div>
    </div>
  );
}

export default ExerciseList;
