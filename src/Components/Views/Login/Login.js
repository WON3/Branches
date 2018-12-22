import React, { Component } from "react";
import "./Login.css";
import axios from 'axios';
import Register from "../Register/Register";
import TextField from "@material-ui/core/TextField";
import Buttons from "../../Shared/Buttons/Buttons";

/*format login code for username and password as well as css for Login view*/

import {connect} from 'react-redux';
import {getUser} from '../../../ducks/reducer';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.post = this.post.bind(this)
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  post() {
    axios
      .post(`/api/list`, {
        username: this.state.username,
        password: this.state.password
      })
      .then(res => {
        console.log(res);
        console.log(res.data);
      });
  }
  render() {
    return (
      <div>
        <div className="LoginBox">
        <header>Welcome Story Teller</header>
        <form className="LoginForm">
          <TextField
            id="outlined-name"
            label="Username"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
            margin="normal"
            variant="outlined"
          />
          <br />
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={this.state.password}
            name="password"
            onChange={this.handleChange}
            margin="normal"
            variant="outlined"
          />
          <br />
          <Buttons/>
          <br />
          <Register />
        </form>
      </div>
      </div>
    );
  }
}

export default connect(null, {getUser})(Login);








