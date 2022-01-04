import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CheckBox, Layer, List, Text } from "grommet";
import { Route } from "react-router-dom";

let checkedNum = 0;
let inspirationalQuotes = [
  "Bravo!",
  "You did it!",
  "You did it! Treat yo-self (but make sure it's healthy)",
  "Brava, Brava, Bravissima!",
];

function randomizeQuery(query, workoutArray, workoutReps, workoutTarget) {
  for (var j = 0; j < query.length; j++) {
    workoutArray[j] = { ...query[j], count: 0, checked: false };

    if (workoutArray[j].target.indexOf(workoutTarget) === -1) {
      workoutArray.splice(j, 1);
    }
  }

  workoutArray = workoutArray.filter((i) => i);

  for (var i = 0; i < workoutReps; i++) {
    let randomNumber = Math.floor(Math.random() * workoutArray.length);
    if (workoutArray[randomNumber] != null) {
      workoutArray[randomNumber].count++;
    }
  }

  return workoutArray;
}

function Workout(props) {
  const { state } = useLocation();
  const [query, setQuery] = useState([]);
  const { workoutType, workoutTarget, workoutReps } = state;
  let workoutTypeJson = "";

  if (state.workoutType) {
    for (var m = 0; m < state.workoutType.length; m++) {
      workoutTypeJson += "type=" + workoutType[m] + "&";
    }
  }

  let workoutArray = [];
  let url = `${props.jsonUrl}workouts?${workoutTypeJson}`;
  let [showLayer, setShowLayer] = useState(false);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then(setQuery);
  }, [url]);

  randomizeQuery(query, workoutArray, workoutReps, workoutTarget);
  workoutArray = workoutArray.filter((i) => i);

  function setChecked(event, workoutArray) {
    if (event) {
      checkedNum++;
    } else {
      checkedNum--;
    }
    if (checkedNum === workoutArray.filter(checkCount).length) {
      setShowLayer(!showLayer);
    }
  }

  function checkCount(item) {
    return item.count > 0;
  }

  return (
    <div className="workout-wrapper">
      <List
        pad="medium"
        data={workoutArray.filter(checkCount)}
        primaryKey={(item) => (
          <Text size="large">
            {item.name}: {item.timing}
          </Text>
        )}
        secondaryKey={(item) => <Text size="medium">Sets: {item.count}</Text>}
        action={(item) => (
          <CheckBox
            pad="medium"
            onChange={(event) =>
              setChecked(event.target.checked, workoutArray, showLayer)
            }
          />
        )}
      />

      {showLayer && (
        <Layer className="congrats-message-container" full background="purple">
          <div className="congrats-message">
            <h1>
              {
                inspirationalQuotes[
                  Math.floor(Math.random() * inspirationalQuotes.length)
                ]
              }{" "}
            </h1>
            <Route
              render={({ history }) => (
                <button
                  className="styled-button white-button"
                  onClick={() => {
                    setShowLayer(false);
                    history.push({
                      pathname: "/",
                      state: inspirationalQuotes,
                    });
                  }}
                >
                  Finish Workout
                </button>
              )}
            />
          </div>
        </Layer>
      )}
    </div>
  );
}

export default Workout;
