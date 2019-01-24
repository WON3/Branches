import React, {Component} from 'react';

import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";


export default class ErrorModal extends Component {
    constructor(props){
        super(props)
        this.state={
            open: true,
            error:''
        }
    }
    componentDidMount(){
        let {error} = this.props;
        this.setState({
            error: error
        })
    }
    handleClose = () => {
        this.setState({ open: false });
      };
    render(){
        console.log(this.props)
        return(
            <Snackbar
                anchorOrigin={{
                vertical: "bottom",
                horizontal: "left"
                }}
                open={this.state.open}
                autoHideDuration={5000}
                onClose={this.handleClose}
                message={<p>Error:{this.state.error}</p>}
               

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