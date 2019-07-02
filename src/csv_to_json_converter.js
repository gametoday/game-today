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

function csvToJson() {
  const csvFilePath='../data/giants.csv';

  csv()
    .fromFile(csvFilePath)
    .then(array => {
      return arrayToObjectDateKey(array);
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
  fs.writeFile("giants.json", JSON.stringify(obj), 'utf8', function (err) {
    console.log('in here');
        if (err) {
                  console.log("An error occured while writing JSON Object to File.");
                  return console.log(err);
              }

        console.log("JSON file has been saved.");
  });

  return obj;
}

 csvToJson();
// export default csvToJson;

