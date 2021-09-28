import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ExerciseList from './components/ExerciseList.js';
import WorkoutGenerator from './components/WorkoutGenerator.js';
import Navigation from './components/Navigation.js';
import Workout from './components/Workout.js';


function App() {

  return (
    <Router>
      <Navigation />
      <div className="content">
        <Switch>
          <Route path="/list">
            <ExerciseList />
          </Route>          
          <Route path="/workout">
            <WorkoutGenerator />
          </Route>          
          <Route path="/start">
            <Workout />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
