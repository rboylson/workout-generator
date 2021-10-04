import { Box, TableCell, TableRow, TextInput, ThemeContext } from 'grommet';

function updateItem( event, props ) {
  let url = `http://localhost:3000/workouts/${ props.id }`;

  let body = {
    id: props.id,
    name: props.name,
    type: props.type,
    timing: event,
    target: props.target
  };

  fetch(url, {
    method: 'PUT',
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    body: JSON.stringify(body)
  });``
}

function Exercise( props ) {  

  function deleteItem(props) {
    let url = `http://localhost:3000/workouts/${ props.id }`;  
    fetch(url, { method: 'DELETE' });
    props.setUrlUpdated(url);
  }

  return (

      <TableRow key={props.id}>
        <TableCell plain="noPad">{ props.name }</TableCell>
        <TableCell plain="noPad">{ props.type }</TableCell>
        <TableCell plain="noPad">{ props.target }</TableCell>
        <ThemeContext.Extend
          value={{
            box: {
              extend: () => `
                max-height: 48px !important;
                height: 48px;
                overflow: hidden;
              `
            }
          }}>
          <TableCell plain="noPad">
            <Box width="100px">
            <TextInput 
                size="small"
                placeholder={props.timing}
                onChange={event => updateItem(event.target.value, props)}
              /> 
            </Box>
          </TableCell>
        </ThemeContext.Extend>
        <TableCell plain="noPad"><p onClick={() => deleteItem(props)}>×</p></TableCell>
      </TableRow>   
  );
}

export default Exercise;
