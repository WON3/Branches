import React, { Component } from "react";
import "./App.css";
import NavBar from "./Components/Shared/NavBar/NavBar";
import { BrowserRouter } from "react-router-dom";
import routes from "./routes";
import Header from "./Components/Shared/Header/Header";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />

        <BrowserRouter>
          <div>
            <NavBar />

            {routes}
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;