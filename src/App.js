import { BrowserRouter as Router, Route } from 'react-router-dom';
import ExerciseList from './components/ExerciseList.js';
import WorkoutGenerator from './components/WorkoutGenerator.js';
import Workout from './components/Workout.js';


function App() {
  return (
    <Router>
      <Route exact path="/" component={WorkoutGenerator}></Route>  
      <Route path="/list" component={ExerciseList}></Route>                  
      <Route path="/start" component={Workout}></Route>
    </Router>
  );
}

export default App;
