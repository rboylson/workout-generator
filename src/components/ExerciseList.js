import { useEffect, useState } from 'react';
import Exercise from './Exercise.js';
import AddWorkout from './AddWorkout.js';
import { Box, Table, TableBody, TableCell, TableHeader, TableRow } from 'grommet';

function ExerciseList() {

  const [list, setList] = useState([]);
  useEffect(()=>{
    fetch('http://localhost:3000/workouts')
      .then(response => response.json())
      .then(setList);
  }, []);

  return (
    <div className="exercise-list">
      <h2>Exercise List</h2>
      <Box align="center">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Exercise Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Target</TableCell>
              <TableCell>Timing</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {list.map(item =>
              <Exercise 
                key={ item.id }
                id={ item.id } 
                name={ item.name } 
                type={ item.type } 
                timing={ item.timing } 
                target={ item.target } 
              />
            )}
          </TableBody>
        </Table>
      </Box>
      <Box>
        <AddWorkout list={ list } />
      </Box>

      
      
    </div>
  );
}

export default ExerciseList;
