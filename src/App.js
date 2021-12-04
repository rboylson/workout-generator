import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ExerciseList from './components/ExerciseList.js';
import WorkoutGenerator from './components/WorkoutGenerator.js';
import Workout from './components/Workout.js';
import { defaultProps } from 'grommet';

const jsonUrl = 'https://randomizer-workout-json.herokuapp.com/';
// const jsonUrl = 'http://localhost:3000/';

function App() {

  const [type, setType] = useState([]);
  const [target, setTarget] = useState([]);
  const [list, setList] = useState([]);
  let [urlUpdated, setUrlUpdated] = useState('');
  let typeExercises = [];
  let targetExercises = [];

  useEffect(()=>{
    fetch(`${ jsonUrl }workouts`)
      .then(response => response.json())
      .then(setList);
  }, [urlUpdated]);

  useEffect(()=>{
    fetch(`${ jsonUrl }types`)
      .then(response => response.json())
      .then(setType);
  }, []);

  useEffect(()=>{
    fetch(`${ jsonUrl }target`)
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
          jsonUrl={jsonUrl}
        />
      </Route>                  
      <Route path="/start">
        <Workout 
          jsonUrl={jsonUrl}
        />
      </Route>
    </Router>
  );
}

export default App;
