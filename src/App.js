import React, { Component } from "react";
import "./App.css";
import NavBar from "./Components/Shared/NavBar/NavBar";
import routes from "./routes";
import Header from "./Components/Shared/Header/Header";
import { MuiThemeProvider } from "@material-ui/core";
import theme from "./theme";
import axios from "axios";
import { connect } from "react-redux";
import * as Actions from "./ducks/reducer";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { withRouter } from "react-router-dom";
library.add(faPencilAlt);

class App extends Component {
  componentDidMount() {
    axios.get("/api/isLoggedIn").then(res => {
      if (Object.keys(res.data).length > 0) {
        const { id, username } = res.data;
        this.props.getUser(id, username);
      }
    });
  }
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.props.toggleReadview(true);
    }
  }

  render() {
    return (
      <div className="App">
        <MuiThemeProvider theme={theme}>
          <div>
            <Header />
            <NavBar />

            {routes}
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}
export default withRouter(
  connect(
    null,
    Actions
  )(App)
);
