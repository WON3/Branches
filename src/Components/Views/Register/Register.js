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
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

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

  registerUser() {
    let { username, email, password } = this.state;
  
    
    axios.post("/api/register", { username, email, password }).then(res => {
      debugger;
      function ValidateEmail(email) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.emailAddr.value))
  {
    return (true)
  }
   else{
     alert("Invalid email.")

    return (false)
    }
}
        alert("Registered. Now, login.");
        this.setState({ open: false });
        this.props.history.push("/");
      })
       .catch(err=>{
      alert("Email already exists in database.");
      this.setState({ password: "" });
    }
    );
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
                  classname="inputBox"
                  id="outlined-name"
                  label="Username"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleName("username")}
                  margin="normal"
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
                  required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
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
                    required minlength ="8"
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
      </div>
    );
  }
}

Register.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Register);
