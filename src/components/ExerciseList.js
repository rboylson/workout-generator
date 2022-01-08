import { Link } from "react-router-dom";
import Home from "../vectors/Home";
import AddWorkout from "./AddWorkout.js";
import Exercise from "./Exercise.js";

function ExerciseList(props) {
  return (
    <div className="exercise-list-wrapper">
      <div className="nav-button-wrapper">
        <Link to="/" className="nav-button">
          <Home />
        </Link>
      </div>
      <div className="exercise-list">
        <h1>Exercise List</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Target</th>
              <th>Reps per set</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {props.list.map((item) => (
              <Exercise
                key={item.id}
                id={item.id}
                name={item.name}
                type={item.type}
                timing={item.timing}
                target={item.target}
                typeExercises={props.typeExercises}
                targetExercises={props.targetExercises}
                jsonUrl={props.jsonUrl}
                setExerciseCount={props.setExerciseCount}
                exerciseCount={props.exerciseCount}
              />
            ))}
          </tbody>
        </table>
        <AddWorkout
          typeExercises={props.typeExercises}
          targetExercises={props.targetExercises}
          jsonUrl={props.jsonUrl}
          setExerciseCount={props.setExerciseCount}
          exerciseCount={props.exerciseCount}
        />
      </div>
    </div>
  );
}

export default ExerciseList;
