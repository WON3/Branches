import React, { Component } from "react";
import "./App.css";
import NavBar from "./Components/Views/NavBar/NavBar";
import { BrowserRouter } from "react-router-dom";
import routes from "./routes";
import Header from "./Components/Shared/Header/Header";

class App extends Component {
  render() {
<<<<<<< HEAD

    return (
      <div className="App">
        <Header />

        <BrowserRouter>
          {routes}

        </BrowserRouter>
=======
    //just inserted CreateStory temporarily until routes are completed
    return (
      <div className="App">
        <header className="App-header">
        <h1>Branches</h1>
        
        </header>
      
>>>>>>> 97e6358b5f6b7ea0995fb6258e66181155d9c6bd
      </div>
    );
  }
}

export default App;
