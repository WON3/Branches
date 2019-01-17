import React, {Component} from 'react';

import './Register.css';
import axios from 'axios';
import classNames from 'classnames';

import Modal from '@material-ui/core/Modal';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import {Link} from "react-router-dom";
import RegisterButton from "../../Views/Register/RegisterButton";


const styles = theme => ({
    paper: {
      position: 'absolute',
      top:'35%',
      left:'35%',
      width: theme.spacing.unit * 50,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing.unit * 4,
    },
});

class Register extends Component{
    constructor(){
        super();
        this.state = {
            open: false,
            username:'',
            email:'',
            password:'',
            showPassword:false
        }
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
            [username]: event.target.value,
        });
    };

    handleEmail = email => event => {
        this.setState({ 
            [email]: event.target.value
        });
    };

    handlePassword = password => event => {
        this.setState( { [password]:event.target.value})
    };
    
    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };

    registerUser(){
        let {username, email,  password} = this.state;
        debugger
        axios.post('/api/register',{username, email, password}).then((res) => {
            debugger
            if(res.data){
                alert('Registered. Now, login.')
                this.setState({open:false})
            } else{
                alert('Email already exists in database.');
                this.setState({password:''});
            }
        });
    }

    cancel(){
        this.setState({
            username:'',
            email:'',
            password:'',
            open:false
        })
    }

    render() {
        const { classes } = this.props;
        return (
            /* <RegisterButton/> can be used in place of button below for styling purposes*/
            <div>
               
                <RegisterButton
                    onClick={this.handleOpen}
                    />
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}
                    >
                    <div className={classes.paper}>
                        <Typography id="modal-title">
                            Register
                        </Typography>
                        <Typography  id="simple-modal-description">
                            <form className={classes.container} noValidate autoComplete="off">
                                <TextField
                                    required
                                    id="standard-name"
                                    label="username"
                                    className={classes.textField}
                                    value={this.state.username}
                                    onChange={this.handleName('username')}
                                    margin="normal"
                                />
                                <TextField
                                    required
                                    id="standard-email"
                                    label="email"
                                    value={this.state.email}
                                    className={classes.textField}
                                    onChange={this.handleEmail('email')}
                                    margin="normal"
                                />
                                
                                <FormControl className={classNames(classes.margin, classes.textField)}>
                                    <InputLabel htmlFor="adornment-password">password</InputLabel>
                                    <Input
                                        required
                                        id="adornment-password"
                                        label='password'
                                        type={this.state.showPassword ? 'text' : 'password'}
                                        value={this.state.password}
                                        className={classes.textField}
                                        onChange={this.handlePassword('password')}
                                        margin='normal'
                                        endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                            aria-label="Toggle password visibility"
                                            onClick={this.handleClickShowPassword}
                                            >
                                            {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                        }
                                    />
                                </FormControl>
                                
                            </form>
                        </Typography> 
                        <div className='buttonBox'>
                        <Link to="/">
                            <Button 
                                variant="contained"
                                color="primary"
                                style={{backgroundColor: "#5d5147", textDecoration: "none"}}
                                onClick={this.registerUser}
                            >
                                Register
                            </Button>
                            </Link>
                            <Button 
                                variant="contained"
                                color="secondary"
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

Register.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Register);
