import React, { Component } from "react";

import "./Register.css";
import axios from "axios";
import classNames from "classnames";

import Modal from "@material-ui/core/Modal";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import RegisterButton from "../../Views/Register/RegisterButton";
import ErrorModal from "../ErrorModal/ErrorModal";

const styles = theme => ({
  paper: {
    width: 600,
    backgroundColor: "#378674",
    padding: 20,
    margin: "150px auto",
    textAlign: "center",
    borderRadius: 5,
    outline: "none"
  }
});

class Register extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      username: "",
      email: "",
      password: "",
      showPassword: false,
      serverErrorMessage: "",
      formValidationCheck: ""
    };
    this.cancel = this.cancel.bind(this);
    this.registerUser = this.registerUser.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  handleName = username => event => {
    this.setState({
      [username]: event.target.value
    });
  };

  handleEmail = email => event => {
    this.setState({
      [email]: event.target.value
    });
  };

  handlePassword = password => event => {
    this.setState({ [password]: event.target.value });
  };

  handleKeyPress = event => {
    if (event.key === "Enter") {
      this.login();
    }
  };

  registerUser() {
    let { username, email, password } = this.state;
    if (password.length<8){
      this.setState({formValidationCheck:<ErrorModal error=" Password too short." />})
    } else if( !email.includes('@')){
      this.setState({formValidationCheck:<ErrorModal error=" Invalid email address." />})
    } else {
      this.props.history.push("/");
      axios.post("/api/register", { username, email, password })
      .then(res => {
        if (res.data) {
          alert("Registered. Now, login.");
          this.setState({ open: false });
        } else {
          alert("Email already exists in database.");
          this.setState({ password: "" });
          this.setState({errorMessage:''})
        }
      })
      .catch(err =>{
        this.setState({formValidationCheck:<ErrorModal error=' Server error'/>})
        
      });
    }
  }

  cancel() {
    this.setState({
      username: "",
      email: "",
      password: "",
      open: false
    });
  }

  render() {
    const { classes } = this.props;
    let errorMessage = this.state.serverErrorMessage && (
      <ErrorModal error={this.state.serverErrorMessage} />
    );
    return (
      <div>
        <RegisterButton buttonName="REGISTER" onClick={this.handleOpen} />
        <Modal
          className="modal"
          zIndex="1"
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div className={classes.paper}>
            <Typography
              variant="h5"
              id="modal-title"
              style={{
                color: "#EAFBF7",
                fontFamily: "sans-serif",
                fontSize: 50,
                fontWeight: 700
              }}
            >
              Register
            </Typography>
            <Typography variant="subtitle1" id="simple-modal-description">
              <form className={classes.container} noValidate autoComplete="off">
                <TextField
                  classname="inputBox"
                  id="outlined-name"
                  label="Username"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleName("username")}
                  margin="normal"
                  autoComplete="none"
                  variant="outlined"
                  style={{
                    backgroundColor: "#EAFBF7",
                    color: "#378674",
                    borderRadius: 5,
                    fontFamily: "sans-serif",
                    fontSize: 50,
                    fontWeight: 700
                  }}
                />
                <br />
                <TextField
                  id="outlined-email-input"
                  label="Email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  margin="normal"
                  variant="outlined"
                  value={this.state.email}
                  onChange={this.handleEmail("email")}
                  style={{
                    backgroundColor: "#EAFBF7",
                    color: "#378674",
                    borderRadius: 5,
                    fontFamily: "sans-serif",
                    fontSize: 50,
                    fontWeight: 700
                  }}
                />
                <br />
                <FormControl
                  className={classNames(classes.margin, classes.textField)}
                >
                  <TextField
                    className="inputBox"
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    value={this.state.password}
                    name="password"
                    onChange={this.handlePassword("password")}
                    required
                    minlength="8"
                    margin="normal"
                    variant="outlined"
                    border=""
                    style={{
                      backgroundColor: "#EAFBF7",
                      color: "#378674",
                      borderRadius: 5,
                      fontFamily: "sans-serif",
                      fontSize: 50,
                      fontWeight: 700
                    }}
                  />
                </FormControl>
              </form>
            </Typography>
            <br />
            <div className="buttonBox">
              <Button
                variant="contained"
                color="primary"
                style={{
                  background: "#EAFBF7",
                  borderRadius: 5,
                  color: "#378674",
                  fontSize: 20,
                  height: 48,
                  padding: "0 30px",
                  width: 300
                }}
                onClick={this.registerUser}
              >
                Register
              </Button>
              <br />
              <br />
              <Button
                style={{
                  background: "#EAFBF7",
                  borderRadius: 5,
                  border: 0,
                  color: "#378674",
                  fontSize: 20,
                  height: 48,
                  padding: "0 30px",
                  width: 300
                }}
                onClick={this.cancel}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Modal>
        {errorMessage}
        {this.state.formValidationCheck}
      </div>
    );
  }
}

Register.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Register);
