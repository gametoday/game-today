import React from 'react';
import './GameInfoView.css';
import * as constants from './teamNames.js';
import data from './gameData.json';
import utils from './utils.js';

class GameInfoView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTeam: constants.TEAMNAMES_OBJ[props.currentTeam]
    };
    this.data = data;
  }

  componentWillReceiveProps(nextProps) {
    const teamName = constants.TEAMNAMES_OBJ[nextProps.currentTeam];
    this.setState({ currentTeam: teamName});
  }

  findNextGameData(currentDate) {
  // starting day + 1, if in rawTeamData, return.
  }

  render() {
    // const currentFormattedDate = '06/30/19'; // home game
    // const currentFormattedDate = '03/11/19'; // away game
    // const currentFormattedDate = '06/50/19'; // no game

    const currentFormattedDate = utils.formattedTodayDate();

    let isGame = false;
    let gameData = {};
    let gameInfo;
    const rawTeamData = this.data[this.state.currentTeam];
    if (rawTeamData && currentFormattedDate in rawTeamData) {
      gameData = rawTeamData[currentFormattedDate];
      isGame = true;
      gameInfo = utils.parseGameData(gameData, this.state.currentTeam);
    }

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
    } else if (!isGame && this.state.currentTeam) {
      return (
        <div>
        <hr />
        <div className="no">NO</div>
        <hr />
        </div>
      );
    } else {
      return (
        <div>
        <hr />
        </div>
      );
    }
  }
};

export default GameInfoView;
