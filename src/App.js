import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ExerciseList from './components/ExerciseList.js';
import WorkoutGenerator from './components/WorkoutGenerator.js';
import Workout from './components/Workout.js';
import { Box } from 'grommet';






function App() {


  return (
    <Router>
      <Switch>
        <Route path="/list">
          <Box  
            margin={{
              top: "18px",
              left: "20px",
              right: "20px",
            }}
          >
            <ExerciseList />
          </Box>
        </Route>          
        <Route path="/workout">
          <Box  
            margin={{
              top: "18px",
              left: "20px",
              right: "20px",
            }}>
            <WorkoutGenerator />
          </Box>
        </Route>          
        <Route path="/start">
          <Box   
            margin={{
              top: "18px",
              left: "20px",
              right: "20px",
            }}>
            <Workout />
          </Box>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
