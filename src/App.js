import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ExerciseList from './components/ExerciseList.js';
import WorkoutGenerator from './components/WorkoutGenerator.js';
import Navigation from './components/Navigation.js';
import Workout from './components/Workout.js';
import { Grommet } from 'grommet';


const theme = {
  global: {
    colors: {
      brand: '#4D4CDB',
      'accent-1': '#6FFFB0',
      'accent-2': '#7FFFB0',
      'accent-3': '#8FFFB0',
      'accent-4': '#9FFFB0',
      'neutral-1': '#10873D',
      'neutral-2': '#20873D',
      'neutral-3': '#30873D',
      'neutral-4': '#40873D',
      focus: 'accent-1',
      blue: '#00C8FF',
      green: '#17EBA0',
      teal: '#82FFF2',
      purple: '#F740FF',
      red: '#FC6161',
      orange: '#FFBC44',
      yellow: '#FFEB59',
      brightGreen: 'accent-1',
      deepGreen: 'neutral-2',
      text: {
        dark: 'teal',
        light: 'purple',
      },
    },
  },
  button: {
    primary: {
      color: 'brand',
    },
    border: {
      color: 'green',
      width: '4px',
    },
  },
};

function App() {

  return (
    <Grommet theme={theme}>
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
    </Grommet>
  );
}

export default App;
