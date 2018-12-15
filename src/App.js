import React, { Component } from "react";
import "./App.css";
import Login from "./Components/Views/Login/Login";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          <Login />
        </div>
      </div>
    );
  }
}

export default App;
