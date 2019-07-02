import React from 'react';
import './App.css';
import data from './data/giants.json';

function App() {
  const mainTeam = "Giants";

  // const currentFormattedDate = '06/30/19'; // home game
  // const currentFormattedDate = '03/11/19'; // away game
  // const currentFormattedDate = '06/50/19'; // no game

  const currentFormattedDate = formattedDate();

  let isGame = false;
  let gameData = {};
  if (currentFormattedDate in data) {
    gameData = data[currentFormattedDate];
    isGame = true;
  }
  const gameInfo = parseGameData(gameData, mainTeam);
  console.log(gameInfo);
  const props = {
    gameInfo,
    isGame
  };
  return (
    <div className="App">
      <header className="App-header">
        <div>Giants game today?</div>
        <Game {...props}/>
      </header>
    </div>
  );
}

function Game(props) {
    const {isGame, gameInfo } = props;
    if (isGame) {
      const homeOrAwayTitle = gameInfo.isHomeGame ? 'HOME' : 'away';
      let teamsTitle = '';
      if (gameInfo.isHomeGame) {
        teamsTitle = `${gameInfo.homeTeam} vs ${gameInfo.awayTeam}`;
      } else {
        teamsTitle = `${gameInfo.awayTeam} @ ${gameInfo.homeTeam}`;
      }
        return (
          <div>
            <hr />
            <div className="Game-yesno">YES</div>
            <div className="App-link">{homeOrAwayTitle}</div>
            <hr />
            <div className="game-info">{teamsTitle}</div>
            <div className="game-info">{gameInfo.startDate} {gameInfo.startTime}</div>
            <div className="game-info">{gameInfo.location}</div>
          </div>
        );
      }
    return <div>NO</div>;
}


function parseGameData(gameData, mainTeam) {
  if (Object.entries(gameData).length === 0 && gameData.constructor === Object) {
    return;
  }
  debugger
  const teamInfo = gameData.subject.split(' ');
  const isHomeGame = gameData.subject.split(' ')[2] === mainTeam;
  const location = gameData.location.split(' - ')[0];

  return {
    awayTeam: teamInfo[0],
    homeTeam: teamInfo[2],
    location,
    startDate: gameData.startDate,
    startTime: gameData.startTime,
    isHomeGame: isHomeGame,
  };
}

function formattedDate() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!

  var yyyy = today.getFullYear().toString().substr(-2);
  if (dd < 10) {
      dd = '0' + dd;
  }
  if (mm < 10) {
      mm = '0' + mm;
  }
  return mm + '/' + dd + '/' + yyyy;
};

export default App;
