import React from 'react';
import './App.css';
import GameInfoView from './GameInfoView.js';

function App() {
  const props = {
    mainTeam: "Giants"
  };
  return (
    <div>
    <div className="App">
      <div>Giants game today?</div>
      <GameInfoView {...props}/>
    </div>
     <footer className="footer">Made with love by caro5</footer>
    </div>
  );
}

export default App;
