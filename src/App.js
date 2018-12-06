import React, { Component } from 'react';
import './App.css';
import Button from './Components/Shared/Buttons/Buttons';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        <h1>Branches</h1>
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        
          <Buttons/>
          HELLO FOO PEOPLE
          <Button/>
      </div>
    );
  }
}

export default App;
