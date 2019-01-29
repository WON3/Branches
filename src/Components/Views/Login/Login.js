import React, { Component } from "react";
import "./Login.css";
import axios from "axios";
import Register from "../Register/Register";
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import ErrorModal from '../ErrorModal/ErrorModal';
import { connect } from "react-redux";
import { getUser } from "../../../ducks/reducer";
import LoginButton from "./LoginButton";


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      open: true,
      serverErrorMessage:'',
    };
    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
    this.handleClick =this.handleClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
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

  handleKeyPress = (event) => {
    if(event.key === 'Enter')
    {this.login()}
  }
  

  login() {
    axios.post(`/api/login`, {
        username: this.state.username,
        password: this.state.password
      })
      .then(res => {
        const {username, id} =res.data;
        this.props.getUser(id, username);
        this.props.history.push('/');       
      })
      .catch(err =>{
        let er = err.respons.data.message;
        this.setState({serverErrorMessage:er})
      });
  }

  render() {
    let errorMessage = this.state.serverErrorMessage && <ErrorModal error = {this.state.serverErrorMessage}/>
    return (
      <div>
        <div className="LoginBox">
          <div className="header">Login</div>
          <form className="LoginForm"
          onKeyPress={this.handleKeyPress}>

            <TextField classname = 'inputBox'
              id="outlined-name"
              label="Username"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}  
              margin="normal"
              variant="outlined"
              style={{backgroundColor: "#EAFBF7", color:"#378674", borderRadius:5}
              }
            />
            <br />
            <TextField className = 'inputBox'
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              value={this.state.password}
              name="password"
              onChange={this.handleChange}
              margin="normal"
              variant="outlined"
              border=""
              style={{backgroundColor: "#EAFBF7", color:"#378674", borderRadius:5}}
            />
            <br />
            <LoginButton login={this.login}/>
            <br/>
            <Register history={this.props.history}/>
          </form>
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
        {errorMessage}
      </div>
    );
  }
}


export default connect(
  null,
  { getUser }
)(Login);
