import { TableCell, TableRow } from 'grommet';

function updateItem( props ) {
  let url = `http://localhost:3000/workouts/${ props.id }`;

  let section = document.getElementById(props.id);
  let timing = section.querySelector("#timing").value;
  if (timing === "" ) { timing = props.timing }

  let body = {
    id: props.id,
    name: props.name,
    type: props.type,
    timing: timing,
    target: props.target
  };

  fetch(url, {
    method: 'PUT',
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    body: JSON.stringify(body)
  });

  window.location.reload(false);
}

function Exercise( props ) {  

  function deleteItem(props) {
    let url = `http://localhost:3000/workouts/${ props.id }`;  
    fetch(url, { method: 'DELETE' });
    window.location.reload(false);
  }


  return (
    <TableRow key={props.id}>
      <TableCell>{ props.name }</TableCell>
      <TableCell>{ props.type }</TableCell>
      <TableCell>{ props.target }</TableCell>
      <TableCell><form id={`form${props.id}`} onSubmit={() => updateItem(props)} >
          <input type="text" id="timing" placeholder={props.timing} />
        </form>
      </TableCell>
      <TableCell><p onClick={() => deleteItem(props)}>×</p></TableCell>
    </TableRow>   
  );
}

export default Exercise;
