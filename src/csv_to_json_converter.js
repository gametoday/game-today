const csv=require('csvtojson')
const fs = require('fs');

const keyMap = {
  startDate: 'START DATE',
  startTime: 'START TIME',
  startTimeET: 'START TIME ET',
  subject: 'SUBJECT',
  location: 'LOCATION',
  endDate: 'END DATE',
  endTime: 'END TIME',
  endTimeET: 'END TIME ET',
};

function csvToJson(teamName) {
  const csvFilePath=`./data/${teamName}.csv`;
  console.log('csv path', csvFilePath);

  csv()
    .fromFile(csvFilePath)
    .then(array => {
      const obj = arrayToObjectDateKey(array);
      saveObj(obj, teamName);
      // saveToOwnFile(obj, teamName);
    })
}

/**
  Returns object with key:val like below
  '09/29/19': {
        startDate: '09/29/19',
        startTime: '12:05 PM',
        endDate: '09/29/19',
        location: 'Oracle Park - San Francisco',
        subject: 'Dodgers at Giants'
      }
 **/
function arrayToObjectDateKey(gameArray) {
  const obj = {};
  gameArray.forEach(game => {
    const gameData = {
      startDate: game[keyMap.startDate],
      startTime: game[keyMap.startTime],
      endDate: game[keyMap.endDate],
      location: game[keyMap.location],
      subject: game[keyMap.subject],
    };
    obj[gameData.startDate] = gameData;
  });
  return obj;
}

function saveToOwnFile(obj, teamName) {
  var json = JSON.stringify(obj);
  const jsonFileName=`./data/${teamName}.json`;
  fs.writeFile(jsonFileName, json, () => {});
};

function saveObj(obj, teamName) {
  fs.exists('gameData.json', function(exists) {
    if (exists) {
      console.log("yes file exists for", teamName);
      var data = fs.readFileSync('gameData.json');
      existingData = JSON.parse(data);
      console.log('can parse data');
      existingData[teamName] = obj;
      console.log('exist');
      var json = JSON.stringify(existingData);
      fs.writeFile('gameData.json', json, () => {});
      /**
      fs.readFileSync('gameData.json', readFileCallback(err, data) => {
        if (err) {
          console.log('ERR', err);
        } else {
          existingData = JSON.parse(data);
          console.log('can parse data');
          existingData[teamName] = obj;
          console.log('exist');
          var json = JSON.stringify(existingData);
          fs.writeFile('gameData.json', json, () => {});
        }
      });
    **/
    } else {
      console.log("file not exists")
      const newData = {
        [teamName]: obj
      };
      var json = JSON.stringify(newData);
      fs.writeFileSync('gameData.json', json);
    }
  });
};
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const MLB_TEAMS_LOWERCASE = ["diamondbacks", "braves", "orioles", "red sox", "cubs", "white sox", "reds", "indians", "rockies", "tigers", "astros", "royals", "angels", "dodgers", "marlins", "brewers", "twins", "mets", "yankees", "athletics", "phillies", "pirates", "padres", "giants", "mariners", "cardinals", "rays", "rangers", "blue jays", "nationals"];
// const MLB_TEAMS_LOWERCASE = ["diamondbacks", "braves"];

for (let i = 0; i < MLB_TEAMS_LOWERCASE.length; i++) {
    setTimeout(() => {
      let team = MLB_TEAMS_LOWERCASE[i];
      csvToJson(team);
      }, i*3000);
}

function updateGameData() {
  MLB_TEAMS_LOWERCASE.forEach(team => {
    sleep(2000).then(() => {
      csvToJson(team);
    });
  });
}

// updateGameData();

// export default csvToJson;

