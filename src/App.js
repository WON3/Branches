import React, { Component } from "react";
import "./App.css";
import Login from "./Components/Views/Login/Login";
/*import Register from './Components/Views/Register/Register';*/

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
        <h1>Branches</h1>
        <div>
          <Login />
        </div>
        
        </header>
        
      </div>
    );
  }
}

export default App;
