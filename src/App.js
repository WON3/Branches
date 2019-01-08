import React, { Component } from "react";
import "./App.css";
import NavBar from "./Components/Shared/NavBar/NavBar";
import { BrowserRouter } from "react-router-dom";
import routes from "./routes";
import Header from "./Components/Shared/Header/Header";
import { MuiThemeProvider } from "@material-ui/core";
import theme from "./theme";

class App extends Component {
  render() {
    return (
      
      <div className="App">
      <MuiThemeProvider theme={theme}>
        <Header />

        <BrowserRouter>
          <div>
            <NavBar />

            {routes}
          </div>
        </BrowserRouter>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
