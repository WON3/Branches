import React, {Component} from 'react';
import Modal from '@material-ui/core/Modal';
//import Buttons from '../../Shared/Buttons/Buttons';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import './Register.css'


export default class Register extends Component{
    constructor(props){
        super(props);
        this.state = {
            open: false
        };
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {

        return (
            <div>
                <h1>HIIIII</h1>
                <Modal
                    className='modeButt'
                    open={this.state.open}
                    onClose={this.handleClose}
                    >
                    <div >
                        <Typography variant="h5" id="modal-title">
                        Register
                        </Typography>
                        <Typography variant="subtitle1" id="simple-modal-description">
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                        </Typography>
                        
                    </div>
                </Modal>
                <Button className='mode' onClick={this.handleOpen}>Modal</Button>
            </div>
        )
    }

}