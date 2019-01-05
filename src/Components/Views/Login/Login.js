import React, { Component } from "react";
import "./Login.css";
import axios from "axios";
import Register from "../Register/Register";
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { Link } from "react-router-dom";


/*format login code for username and password as well as css for Login view*/

import { connect } from "react-redux";
import { getUser } from "../../../ducks/reducer";
import Buttons from '../../Shared/Buttons/Buttons';

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
    debugger;
    axios
      .post(`/api/login`, {
        username: this.state.username,
        password: this.state.password
      })
      .then(res => {
        this.props.loginUser(res.data);
        this.props.history.push("/");
      });
  }
  render() {
    return (
      <div>
        <div className="LoginBox">
          <div className="header">Login</div>
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
          <Buttons/>
          <Button className="login" variant="contained" color="primary" onClick={this.login}>
            login
          </Button>
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left"
            }}
            open={this.state.open}
            autoHideDuration={5000}
            onClose={this.handleClose}
            message={<p>Welcome Story Teller</p>}
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
