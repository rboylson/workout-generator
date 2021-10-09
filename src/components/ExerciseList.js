import { useEffect, useState } from 'react';
import Exercise from './Exercise.js';
import AddWorkout from './AddWorkout.js';
import { Link } from 'react-router-dom';
import { Box, Table, TableBody, TableCell, TableHeader, TableRow, Text } from 'grommet';

function ExerciseList() {
  let typeExercises = [];
  let targetExercises = [];
  let [urlUpdated, setUrlUpdated] = useState('');
  const [type, setType] = useState([]);
  const [targets, setTarget] = useState([]);
  const [list, setList] = useState([]);

  useEffect(()=>{
    fetch('http://localhost:3000/types')
      .then(response => response.json())
      .then(setType);
  }, []);

  useEffect(()=>{
    fetch('http://localhost:3000/target')
      .then(response => response.json())
      .then(setTarget);
  }, []);

  useEffect(()=>{
    fetch('http://localhost:3000/workouts')
      .then(response => response.json())
      .then(setList);
  }, [urlUpdated]);

  type.map((element, index) => {
    return typeExercises[index] = element.name;
  });  
  
  targets.map((element, index) => {
    return targetExercises[index] = element.name;
  });

  return (
    <div>
      <Box align='end' margin={{ top: "18px",right: "20px" }}>
        <Link to='/'><Text size="xlarge">⌂</Text></Link>
      </Box> 
    
      <Box pad={{horizontal: 'medium', bottom: 'small'}}>
        <Text size="large">Exercise List</Text>
      </Box>

      <Box pad={{horizontal: 'medium', bottom: 'small'}}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell><Text size="medium">Name</Text></TableCell>
              <TableCell><Text size="medium">Type</Text></TableCell>
              <TableCell><Text size="medium">Target</Text></TableCell>
              <TableCell><Text size="medium">Timing</Text></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {list.map(item =>
              <Exercise 
                key={item.id}
                id={item.id} 
                name={item.name} 
                type={item.type} 
                timing={item.timing} 
                target={item.target} 
                setUrlUpdated={setUrlUpdated}
              />
            )}
          </TableBody>
        </Table>
      </Box>
        
      <AddWorkout setUrlUpdated={setUrlUpdated} />

    </div>
  );
}

export default ExerciseList;
