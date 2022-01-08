import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ExerciseList from "./components/ExerciseList.js";
import Workout from "./components/Workout.js";
import WorkoutGenerator from "./components/WorkoutGenerator.js";

const jsonUrl = "https://randomizer-workout-json.herokuapp.com/";

function App() {
  const [type, setType] = useState([]);
  const [target, setTarget] = useState([]);
  const [list, setList] = useState([]);
  const [exerciseCount, setExerciseCount] = useState(0);
  let typeExercises = [];
  let targetExercises = [];

  function fetchWorkouts() {
    fetch(`${jsonUrl}workouts`)
      .then((response) => response.json())
      .then(setList);
  }

  useEffect(() => {
    fetchWorkouts();
  }, [exerciseCount]);

  useEffect(() => {
    fetch(`${jsonUrl}types`)
      .then((response) => response.json())
      .then(setType);
  }, []);

  useEffect(() => {
    fetch(`${jsonUrl}target`)
      .then((response) => response.json())
      .then(setTarget);
  }, []);

  type.map((element, index) => {
    return (typeExercises[index] = element.name);
  });

  target.map((element, index) => {
    return (targetExercises[index] = element.name);
  });

  return (
    <Router>
      <Route exact path="/">
        <WorkoutGenerator
          list={list}
          typeExercises={typeExercises}
          targetExercises={targetExercises}
        />
      </Route>
      <Route path="/list">
        <ExerciseList
          list={list}
          typeExercises={typeExercises}
          targetExercises={targetExercises}
          jsonUrl={jsonUrl}
          setExerciseCount={setExerciseCount}
          exerciseCount={exerciseCount}
        />
      </Route>
      <Route path="/start">
        <Workout jsonUrl={jsonUrl} />
      </Route>
    </Router>
  );
}

export default App;
