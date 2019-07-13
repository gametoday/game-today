from bs4 import BeautifulSoup
import requests
import re
import pandas as pd
import time

teamNames = ["diamondbacks", "braves", "orioles", "red sox", "cubs", "white sox", "reds", "indians", "rockies", "tigers", "astros", "royals", "angels", "dodgers", "marlins", "brewers", "twins", "mets", "yankees", "athletics", "phillies", "pirates", "padres", "giants", "mariners", "cardinals", "rays", "rangers", "blue jays", "nationals"];

teamMap = {
    "diamondbacks": "dbacks",
    "red sox": "redsox",
    "white sox": "whitesox",
    "blue jays": "bluejays",
};


def scraper():
    for team in teamNames:
        print("Getting schedule for {}".format(team))
        formattedTeamName = teamMap.get(team, team);
        url = 'https://www.mlb.com/{}/fans/downloadable-schedule'.format(formattedTeamName);

        print("URL: {}".format(url))
        response = requests.get(url, timeout=5)
        content = BeautifulSoup(response.content, "html.parser")
        links = content.findAll('a', attrs={'href': re.compile("ticketing-client")})

        if not links:
            print("Error getting links for {}".format(url))
            continue

        fullScheduleLink = links[0].get('href')
        file_name = '../src/data/{}.csv'.format(team);
        fixedUrl = fullScheduleLink.replace("mlb.mlb", "www.ticketing-client")

        print("Downloading {} to {}...".format(fixedUrl, file_name))

        try:
            df = pd.read_csv(fixedUrl)
            df.to_csv(file_name)
            print("Successfully saved to {}".format(file_name))
        except:
            print("Error saving to {}".format(file_name))

        print('---------------------')

scraper()
