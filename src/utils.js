const utils = {
  // takes in gameData in json and formats it to key:values we care about
  parseGameData: (gameData, mainTeam) => {
    if (Object.entries(gameData).length === 0 && gameData.constructor === Object) {
      return;
    }
    const teamInfo = gameData.subject.split(' at ');
    const isHomeGame = gameData.subject.split(' ')[1].toLowerCase() === mainTeam;
    const location = gameData.location.split(' - ')[0];
    return {
      awayTeam: teamInfo[0],
      homeTeam: teamInfo[1],
      location,
      startDate: gameData.startDate,
      startTime: gameData.startTime,
      isHomeGame: isHomeGame,
    };
  },

  // Returns formatted today's date
  formattedTodayDate: () => {
    const today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!

    const yyyy = today.getFullYear().toString().substr(-2);
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    return mm + '/' + dd + '/' + yyyy;
  }
};

export default utils;
