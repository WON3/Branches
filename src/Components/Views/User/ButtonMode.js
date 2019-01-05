import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
    rootD: {
        flexGrow:1,
        marginTop:75,
        height: '87vh'
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        height: 'fill',
      },
      textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '90%',
        height: theme.spacing.unit*14,
      },
      dense: {
        marginTop: 16,
      },
      menu: {
        width: 200,
      },
    background: {
      background: '#EAFBF7',
    },
    bio: {
      height: 140,
      boxSizing: 'border-box',
      textAlign:'jusitify'
    },
    button: {
      background:'#378674',
      marginTop: 5,
      alignSelf: 'center'     
    }, 
    itemFix: {
      height:'80vh',
    },
    itemFixT:{
      height:'80vh',
      width: '82vw'
    },
    media: {
        width: 'fill',
        paddingTop: '56.25%', // 16:9
      },
    paper: {
        position: 'absolute',
        top:'35%',
        left:'35%',
        width: theme.spacing.unit * 53,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 5,
        display: 'flex',
        flexDirection: 'column',
        justify: 'center',
      },
      titles: {
        textAlign: 'center',
        alignSelf: 'center',
        fontFamily: 'Slabo'
      }
  
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
    };

    render(){
        const { classes } = this.props;
        return (
            <div>
                <Button 
                    className={classes.button}
                    onClick={this.open}
                    >Update
                </Button>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.close}
                    >
                    <div className={classes.paper}>
                        <TextField
                            id="filled-textarea"
                            label={this.props.label}
                            placeholder={this.props.placeHolder}
                            multiline
                            className={classes.textField}
                            onChange={(e)=>{this.handleInput(e.target.value)}}
                            rows= {this.props.rows}
                            />
                        <Button 
                            onClick={this.handle}
                            className={classes.button} 
                            color="secondary">Submit</Button>                  
                  </div>
                </Modal>
            </div>
        )
    }
}

ButtonMode.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(ButtonMode)

