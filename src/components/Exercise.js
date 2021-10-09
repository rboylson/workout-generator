import { TableCell, TableRow } from 'grommet';
import EditExercise from './EditExercise.js';

function Exercise(props) {  
  return (
    <TableRow key={props.id}>
      <TableCell>{props.name}</TableCell>
      <TableCell>{props.type}</TableCell>
      <TableCell>{props.target}</TableCell>
      <TableCell>{props.timing}</TableCell>
      <TableCell>
        <EditExercise 
          id={props.id} 
          name={props.name} 
          type={props.type} 
          target={props.target} 
          timing={props.timing}
          setUrlUpdated={props.setUrlUpdated}
        />
      </TableCell>
    </TableRow>   
  );
}

export default Exercise;