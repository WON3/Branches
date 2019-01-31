import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import axios from 'axios';
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
  })

class StoryCard extends Component{
    constructor(props){
        super(props)
        this.state ={
            contributions:[]
        }
    }

    componentDidMount(){
        let {storyId} = this.props;
        axios.get(`/contributions/${storyId}`)
        .then(res => {
            console.log(res)
        })
        .catch(err=>{
            let er = err.response.data.message;
            this.setState({serverErrorMessage: er})
        }); 
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

render(){
    const { classes } = this.props;
    return(
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
                  Contributions
                </Typography>
                <Typography variant="subtitle1" id="simple-modal-description">
                  <form className={classes.container} noValidate autoComplete="off">
                    <TextField
                      classname="inputBox"
                      id="outlined-name"
                      label="Username"
                      name="username"
                    //   value={this.state.username}
                    //   onChange={this.handleName("username")}
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
                      margin="normal"
                      variant="outlined"
                    //   value={this.state.email}
                    //   onChange={this.handleEmail("email")}
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
                        // onChange={this.handlePassword("password")}
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
                    // onClick={this.registerUser}
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
    )
    }
}
StoryCard.propTypes = {
    classes: PropTypes.object.isRequired
  };
  
  export default withStyles(styles)(StoryCard);