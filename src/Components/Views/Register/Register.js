import React, {Component} from 'react';
import Modal from '@material-ui/core/Modal';
//import Buttons from '../../Shared/Buttons/Buttons';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
import './Register.css';
import axios from 'axios';


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
            name:'',
            email:'',
            password:''
        }
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

    handleName = name => event => {
        this.setState({
          [name]: event.target.value,
        });
    };

    handleEmail = email => event => {
        this.setState({ 
            [email]: event.target.email
        });
    };

    handlePassword = password => event => {
        this.setState( { [password]:event.target.value})
    };

    registerUser(){
        axios.put('/api/register',(username,email,password)).then((res) => {
            if(res.data){
                alert('Registered. Now, login.')
            } else{
                //Need something to catch errors, or if username already exists, or email already exists
            }
        });
    }
    

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Button 
                    className='openMode'
                    variant="contained"
                    color="primary"
                    onClick={this.handleOpen}
                    >
                    Register
                </Button>
                <Modal
                    
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}
                    >
                    <div className={classes.paper}>
                        <Typography variant="h5" id="modal-title">
                            Register
                        </Typography>
                        <Typography variant="subtitle1" id="simple-modal-description">
                            <form className={classes.container} noValidate autoComplete="off">
                                <TextField
                                    required
                                    id="standard-name"
                                    label="username"
                                    className={classes.textField}
                                    value={this.state.name}
                                    onChange={this.handleName('name')}
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
                                <TextField
                                    required
                                    id="standard-required"
                                    label="password"
                                    vale={this.state.password}
                                    className={classes.textField}
                                    onChange={this.handlePassword('password')}
                                    margin="normal"
                                />
                            </form>
                        </Typography>
                        <RegisterWrapped/>
                        <div className='buttonBox'>
                            <Button 
                                variant="contained"
                                color="primary"
                            >
                                Register
                            </Button>
                            <Button 
                                variant="contained"
                                color="secondary"
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
const RegisterWrapped = withStyles(styles)(Register);
export default RegisterWrapped;