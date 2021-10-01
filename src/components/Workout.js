import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, CheckBox, Grid, Layer, List, Text } from 'grommet';
import { Route } from 'react-router-dom';

let checkedNum = 0;
let inspirationalQuotes = [
  "Bravo!",
  "You did it!",
  "You did it! Treat yo-self (but make sure it's healthy)",
  "Brava, Brava, Bravissima!"
]

function randomizeQuery(query, workoutArray, workoutReps) {
  for (var j = 0; j < query.length; j++) {
    workoutArray[j] = {...query[j], "count": "0", "checked": false };
  }

  for (var i = 0; i < workoutReps; i++) {
    let randomNumber = Math.floor(Math.random() * (workoutArray.length));
    if (workoutArray[randomNumber] != null) {
      workoutArray[randomNumber].count++;
    }
  } 
}

function Workout( props ) {

  const {state} = useLocation();
  const {workoutType, workoutTarget, workoutReps } = state;
  const [query, setQuery] = useState([]);
  let workoutArray = [];
  let url = `http://localhost:3000/workouts?type=${workoutType}&target=${workoutTarget}`;
  let [showLayer, setShowLayer] = useState(false);

  useEffect(()=>{
    fetch(url)
      .then(response => response.json())
      .then(setQuery);
  }, [url]);

  randomizeQuery(query, workoutArray, workoutReps);

  function setChecked(event, workoutArray) {
    if (event) { checkedNum++ } else { checkedNum-- }
    if (checkedNum === workoutArray.length ) {
      setShowLayer(!showLayer);
    }
  }

  return (
    <Box
      direction="row-responsive"
      justify="center"
      align="center"
      pad="xlarge"
      background="dark-2"
      gap="medium"
    >
      <Grid
          width= {{
            width: "600px",
            min: "600px",
            max: "600px",
          }}
      >
        <List
          data={ workoutArray }
          key="id"
          primaryKey="name"
          secondaryKey="count"
          action={(item) => (
            <CheckBox 
              key="id"
              onChange={(event) => setChecked(event.target.checked, workoutArray, showLayer)}
            />
          )}
        />
      </Grid>
      {showLayer && (
        <Layer full animation="fadeIn">
          <Box fill background="light-4" align="center" justify="center">
            <Text
              size="large"
            >
              { inspirationalQuotes[Math.floor(Math.random() * (inspirationalQuotes.length))] }
            </Text>
            <Route render={({ history }) => (
              <p onClick={() => { 
                setShowLayer(false)

                history.push( {
                  pathname: '/workout',
                  state: inspirationalQuotes
                });

                }} >
                ×
              </p>
            )} />
          </Box>
        </Layer>
      )}
    </Box>
  );
}

export default Workout;
