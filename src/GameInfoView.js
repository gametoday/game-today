import React from 'react';
import './GameInfoView.css';
import data from './data/giants.json';
import utils from './utils.js';

function GameInfoView(props) {
  const mainTeam = props.mainTeam;

  // const currentFormattedDate = '06/30/19'; // home game
  // const currentFormattedDate = '03/11/19'; // away game
  // const currentFormattedDate = '06/50/19'; // no game

  const currentFormattedDate = utils.formattedTodayDate();

  let isGame = false;
  let gameData = {};
  if (currentFormattedDate in data) {
    gameData = data[currentFormattedDate];
    isGame = true;
  }
  const gameInfo = utils.parseGameData(gameData, mainTeam);

  if (isGame) {
    const homeOrAwayTitle = gameInfo.isHomeGame ? 'home' : 'away';
    let teamsTitle = '';
    if (gameInfo.isHomeGame) {
      teamsTitle = `${gameInfo.homeTeam} vs ${gameInfo.awayTeam}`;
    } else {
      teamsTitle = `${gameInfo.awayTeam} @ ${gameInfo.homeTeam}`;
    }
    return (
      <div>
        <hr />
        <div className="yes">YES</div>
        <div className="homeaway">{homeOrAwayTitle}</div>
        <hr />
        <div className="info">{teamsTitle}</div>
        <div className="info">{gameInfo.startDate} {gameInfo.startTime}</div>
        <div className="info">{gameInfo.location}</div>
      </div>
    );
  }
  return (
    <div>
      <hr/>
      <div className="no">NO</div>
      <hr/>
    </div>
  );
}

export default GameInfoView;
