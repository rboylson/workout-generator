import { Route } from 'react-router-dom';
import './CompleteMessage.scss';

let inspirationalQuotes = [
  "Bravo!",
  "You did it!",
  "You did it! Treat yo-self (but make sure it's healthy)",
  "Brava, Brava, Bravissima!"
]

function closeMessage() {
  let completeMessage = document.getElementById("complete-message");
  completeMessage.style.left = "-100vw";
}

function CompleteMessage( props ) {  

  return (
    <div id="complete-message">
      <Route render={({ history }) => (
        <p onClick={() => { 
          closeMessage()

          history.push( {
            pathname: '/workout',
            state: inspirationalQuotes
          });

          }} >
          ×
        </p>
      )} />

      <p>{ inspirationalQuotes[Math.floor(Math.random() * (inspirationalQuotes.length))] }</p>
    </div>
  );
}

export default CompleteMessage;
