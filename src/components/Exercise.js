
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
    <tr id={props.id}>
      <td>{ props.name }</td>
      <td>{ props.type }</td>
      <td>{ props.target }</td>
      <td>
        <form id={`form${props.id}`} onSubmit={() => updateItem(props)} >
          <input type="text" id="timing" placeholder={props.timing} />
        </form> 
      </td>
      <td><a onClick={() => deleteItem(props)}>×</a></td>
    </tr>    
  );
}

export default Exercise;
