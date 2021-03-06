import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './userStyles.css';

const styles = theme => ({
    rootD: {
        flexGrow:1,
        marginTop:75,
        height: '87vh',
        color: '#378674'
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '90%',
        height: theme.spacing.unit*14,
      },
         background: {
      background: '#EAFBF7',
    },
    but: {
        float: 'right',
        marginTop: '-35px',
        paddingRight: 5,
    },
    button: {
      background:'#378674',
      marginTop: 5,
      alignSelf: 'center' 
    },    
    paper: {
        width: 600,
        backgroundColor: "#378674",
        padding: 45,
        margin: "150px auto",
        textAlign: "center",
        borderRadius: 5,
        outline: "none",
      },
    });

class ButtonMode extends Component {
    constructor(props){
        super(props)
        this.state = {
            open:false,
            input:''
        }
        this.handleInput = this.handleInput.bind(this);
        this.handle = this.handle.bind(this);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }
    open(){
        this.setState({open:true});
    };

    close(){
        this.setState({open:false});
    };

    handleInput(val){
        this.setState({input:val});
    };

    handle() {
        this.props.change(this.state.input);
        this.setState({open:false})
    };
    handleKeyPress = (event) => {
        if(event.key === 'Enter')
        {this.handle()}
      }

    render(){
        const { classes } = this.props;
        return (
            <div className={classes.but}>
                <FontAwesomeIcon icon="pencil-alt"
                    className='fontA'
                    onClick={this.open}
                    />
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.close}
                >
                <div className={classes.paper}
                onKeyPress={this.handleKeyPress}  >
                    <TextField
                        id="filled-textarea"
                        label={this.props.label}
                        placeholder={this.props.placeHolder}
                        variant="outlined"
                        style={{
                            width:600,
                            backgroundColor: "#EAFBF7",
                            color: "#378674",
                            borderRadius: 5,
                            fontFamily: "sans-serif",
                            fontSize: 50,
                            fontWeight: 700
                          }}
                        onChange={(e)=>{this.handleInput(e.target.value)}}
                        rows= {this.props.rows}
                        />
                        <br/>
                    <Button 
                        onClick={this.handle}
                        className={classes.button} 
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
                }}>
                        Submit
                    </Button>                  
                </div>
                </Modal>
            </div>
        )
    }
}

ButtonMode.propTypes = {
    classes: PropTypes.object.isRequired,
    placeHolder: PropTypes.string.isRequired,
    change: PropTypes.func.isRequired,
    rows: PropTypes.string
  };

export default withStyles(styles)(ButtonMode)

