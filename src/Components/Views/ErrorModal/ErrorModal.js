import React, {Component} from 'react';

import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";


export default class ErrorModal extends Component {
    constructor(props){
        super(props)
        this.state={
            open: false,
            error:''
        }
    }
    componentDidMount(){
        if(this.props.error){
            let {error} = this.props;
        this.setState({
            error: error, open:true
        })
    }
        }
        
    handleClose = () => {
        this.setState({ open: false });
      };
    render(){
        return(
            <Snackbar
                anchorOrigin={{
                vertical: "bottom",
                horizontal: "left"
                }}
                open={this.state.open}
                autoHideDuration={5000}
                onClose={this.handleClose}
                message={<p>Error:{this.props.error}</p>}
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
        )
    }
}