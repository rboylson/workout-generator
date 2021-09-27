import { useEffect, useState } from 'react';

function WorkoutGenerator() {

  let inputType = "Stretch";
  const [query, setQuery] = useState([]);

  let url = `http://localhost:3000/workouts?type=${inputType}&target=Posture`;
  useEffect(()=>{
    fetch(url)
      .then(response => response.json())
      .then(setQuery);
  }, [url]);

  return (
    <div className="workout-generator">
      <h2>Generate Workout</h2>

      <form target="/workoutgenerator">
        <input className="cell" type="text" id="type" name="type" />
        <input className="cell" type="submit"/>
      </form> 
      
      {query.map(item =>
        <p key={ item.id }>{ item.name }: {item.timing }</p>
      )}

    </div>
  );
}

export default WorkoutGenerator;