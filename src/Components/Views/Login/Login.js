import React, { Component } from "react";
import "./Login.css";
import axios from "axios";
import Register from "../Register/Register";
import TextField from "@material-ui/core/TextField";
import Buttons from "../../Shared/Buttons/Buttons";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { Link } from "react-router-dom";

/*format login code for username and password as well as css for Login view*/

import { connect } from "react-redux";
import { getUser } from "../../../ducks/reducer";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      open: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  login() {
    axios.post(`/api/login`, {
        username: this.state.username,
        password: this.state.password
      })
      .then(res => {
        const {username, id} =res.data;
        this.props.getUser(id, username);
        this.props.history.push('/');       
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
   
            <br />
            <Register />
          </form>
          <button onClick={this.login}>
          login
        </button>
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left"
            }}
            open={this.state.open}
            autoHideDuration={6000}
            onClose={this.handleClose}
            message={<p>Welcome to Branches</p>}
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                onClick={this.handleClose}
              >
                <CloseIcon />
              </IconButton>
            ]}
          />
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { getUser }
)(Login);
