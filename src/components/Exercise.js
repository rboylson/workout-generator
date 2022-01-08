import EditExercise from "./EditExercise.js";

function Exercise(props) {
  return (
    <tr key={props.id}>
      <td>{props.name}</td>
      <td>{props.type}</td>
      <td>{props.target}</td>
      <td>{props.timing}</td>
      <td>
        <EditExercise
          id={props.id}
          name={props.name}
          type={props.type}
          target={props.target}
          timing={props.timing}
          typeExercises={props.typeExercises}
          targetExercises={props.targetExercises}
          jsonUrl={props.jsonUrl}
          setExerciseCount={props.setExerciseCount}
          exerciseCount={props.exerciseCount}
        />
      </td>
    </tr>
  );
}

export default Exercise;
