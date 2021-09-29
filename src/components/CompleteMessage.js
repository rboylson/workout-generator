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
      <div className="exit" onClick={() => closeMessage()}>×</div>
      <p>{ inspirationalQuotes[Math.floor(Math.random() * (inspirationalQuotes.length))] }</p>
    </div>
  );
}

export default CompleteMessage;
