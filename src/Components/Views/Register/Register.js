import React, { Component } from "react";

import "./Register.css";
import axios from "axios";
import classNames from "classnames";

import Modal from "@material-ui/core/Modal";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import RegisterButton from "../../Views/Register/RegisterButton";

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
      showPassword: false
    };
    this.cancel = this.cancel.bind(this);
    this.registerUser = this.registerUser.bind(this);
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

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  registerUser() {
    let { username, email, password } = this.state;
    this.props.history.push("/login");
    debugger;
    axios.post("/api/register", { username, email, password }).then(res => {
      debugger;
      if (res.data) {
        alert("Registered. Now, login.");
        this.setState({ open: false });
      } else {
        alert("Email already exists in database.");
        this.setState({ password: "" });
      }
    });
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
    return (
      <div>
        <RegisterButton onClick={this.handleOpen} />
        <Modal
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
                  required
                  id="standard-name"
                  label="username"
                  style={{color:"#378674"}}
                  className={classes.textField}
                  value={this.state.username}
                  onChange={this.handleName("username")}
                  margin="normal"
                />
                <br />
                <TextField
                  required
                  id="standard-email"
                  label="email"
                  style={{color:"#378674"}}
                  value={this.state.email}
                  className={classes.textField}
                  onChange={this.handleEmail("email")}
                  margin="normal"
                />
                <br />
                <FormControl
                  className={classNames(classes.margin, classes.textField)}
                >
                  <InputLabel htmlFor="adornment-password">password</InputLabel>
                  <Input
                    required
                    id="adornment-password"
                    label="password"
                    type={this.state.showPassword ? "text" : "password"}
                    value={this.state.password}
                    className={classes.textField}
                    onChange={this.handlePassword("password")}
                    margin="normal"
                    style={{color:"#378674"}}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Toggle password visibility"
                          onClick={this.handleClickShowPassword}
                        >
                          {this.state.showPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </form>
            </Typography>
            <br/>
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
                  width: 250
                }}
                onClick={this.registerUser}
              >
                Register
              </Button>
              <br/>
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
                  width: 250
                }}
                onClick={this.cancel}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

Register.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Register);
