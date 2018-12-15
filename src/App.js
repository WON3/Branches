import React, { Component } from 'react';
import './App.css';
import Button from './Components/Shared/Buttons/Buttons';
import Contribute from './Components/Views/Contribute/Contribute'


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        <h1>Branches</h1>
        </header>
          <Button/>
          HELLO FOO PEOPLE
          <Button/>
        <Contribute/>
      </div>
    );
  }
}

export default App;
