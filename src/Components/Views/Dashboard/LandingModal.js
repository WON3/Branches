import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class LandingModal extends React.Component {
    state = {
        open: false,
    };


    componentDidMount() {
        if (!localStorage.getItem("hasUserVisitedSite")) {
            localStorage.setItem("hasUserVisitedSite", "uh, duh. everybody's been to our site")
            this.setState({
                open: true
            })
        } else {
            this.setState({
                open: false
            })
        }
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };
    //   localStorage.setItem(key, value);

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        return (
            <div>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        <div className="dialogTitle">
                            Branches
                        </div>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText style={{ color: "#EAFBF7" }} id="alert-dialog-description">
                            Welcome to Branches! Your story starts here and continues with the help of the community around you. This website is designed to let loose the creative mind by allowing individuals to collaborate with narrative. Please feel free to read and enjoy these stories! Create an account to make your own and contribute to others! Enjoy!
            </DialogContentText>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}

export default LandingModal;