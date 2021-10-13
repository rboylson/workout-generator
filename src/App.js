import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ExerciseList from './components/ExerciseList.js';
import WorkoutGenerator from './components/WorkoutGenerator.js';
import Workout from './components/Workout.js';

function App() {

  const [type, setType] = useState([]);
  const [target, setTarget] = useState([]);
  const [list, setList] = useState([]);
  let [urlUpdated, setUrlUpdated] = useState('');
  let typeExercises = [];
  let targetExercises = [];

  useEffect(()=>{
    fetch('http://localhost:3000/workouts')
      .then(response => response.json())
      .then(setList);
  }, [urlUpdated]);

  useEffect(()=>{
    fetch('http://localhost:3000/types')
      .then(response => response.json())
      .then(setType);
  }, []);

  useEffect(()=>{
    fetch('http://localhost:3000/target')
      .then(response => response.json())
      .then(setTarget);
  }, []);

  type.map((element, index) => {
    return typeExercises[index] = element.name;
  });  

  target.map((element, index) => {
    return targetExercises[index] = element.name;
  });

  return (
    <Router>
      <Route exact path="/">
        <WorkoutGenerator
          list={list}
          typeExercises={typeExercises}
          targetExercises={targetExercises}
          setUrlUpdated={setUrlUpdated}
        />
      </Route>  
      <Route path="/list">
        <ExerciseList
          list={list}
          setUrlUpdated={setUrlUpdated}
          typeExercises={typeExercises}
          targetExercises={targetExercises}
        />
      </Route>                  
      <Route path="/start" component={Workout}></Route>
    </Router>
  );
}

export default App;
