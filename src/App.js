import React from 'react';
import './App.css';
import GameInfoView from './GameInfoView.js';
import AutocompleteWidget from './AutocompleteWidget.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.teamChanged = this.teamChanged.bind(this)
    this.state = {
      mainTeam: "San Francisco Giants"
    };
  }

  teamChanged(dataFromChild) {
    const teamName = dataFromChild ? dataFromChild.name : "";
    this.setState({
      mainTeam: teamName
    });
  };

  render() {
    return (
      <div>
      <div className="App">
      <AutocompleteWidget func={this.teamChanged} currentTeam={this.state.mainTeam} />
      <GameInfoView currentTeam={this.state.mainTeam}/>
      </div>
      <footer className="footer">made by caro5</footer>
      </div>
    );
  }
}

export default App;
