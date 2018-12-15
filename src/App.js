import React, { Component } from 'react';
import './App.css';
import CreateStory from './Components/Views/CreateStory/CreateStory';


class App extends Component {
  render() {
    //just inserted CreateStory temporarily until routes are completed
    return (
      <div className="App">
        <header className="App-header">
        <h1>Branches</h1>
        </header>
        <CreateStory />
      </div>
    );
  }
}

export default App;
