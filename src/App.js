import React, { Component } from "react";
import "./App.css";
import NavBar from "./Components/Shared/NavBar/NavBar";
import { BrowserRouter } from "react-router-dom";
import routes from "./routes";
import Header from "./Components/Shared/Header/Header";
import axios from 'axios';
import { connect } from "react-redux";
import { getUser } from "./ducks/reducer";

class App extends Component {

  componentWillUpdate(){
    axios.get('/api/isLoggedIn').then(res => {
      
      if(Object.keys(res.data).length>0){
      const {id, username} = res.data;
      this.props.getUser(id, username);
      } 
    })
  }

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


export default connect(null, 
  { getUser })
  (App);