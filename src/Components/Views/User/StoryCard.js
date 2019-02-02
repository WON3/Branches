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
            storyTitle:'',
            isAccepted: false,
            contributions:null
        }
    }

    componentDidMount(){
        let {storyId} = this.props;
        let contributionUpdate;
        axios.get(`/contributions/${storyId}`)
        .then(res => {
            if(res.data.contributions.length < 1){
                contributionUpdate = 'None to speak of'
            } else{
                contributionUpdate = res.data.contributions.map(contribution=>contribution)
            }
            this.setState({
                title:res.data.story.title, 
                contributions: contributionUpdate,
                description:res.data.story.description
                })
        })
        .catch(err=>{
            this.setState({serverErrorMessage:' Server error'})
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
    console.log(this.props)
//     let contributes = this.state.contributions.map((cont, key)=>{} )
//     0:
// contribution: "Sometimes not blarg too."
// email: "r"
// id: 145
// is_accepted: false
// prior_contribution_id: 0
// story_id: 32
// user_id: 13
// username: "r"
    return(
        <div>
        <RegisterButton 
            buttonName="CONTRIBUTIONS"
            onClick={this.handleOpen} />
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
                    }}>
                    {this.state.title}
                </Typography>
                <p>{this.state.description}</p>
                <br/>
                <p>Contribution status: {}</p>
                <br/>
                <br/>
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
                        }}>Approve
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
                        >Deny
                    </Button>
                </div>
            </div>
        </Modal>
    </div>
    )}
}
StoryCard.propTypes = {
    classes: PropTypes.object.isRequired
  };
  
  export default withStyles(styles)(StoryCard);