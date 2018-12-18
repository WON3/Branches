import React, { Component } from 'react';
import './App.css';
import Contribute from './Components/Views/Contribute/Contribute'
import Register from './Components/Views/Register/Register';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        <h1>Branches</h1>
        
        </header>
        <Contribute/>
      </div>
    );
  }
}

export default App;
