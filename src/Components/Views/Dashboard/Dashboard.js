import React, { Component } from 'react';
import axios from 'axios';
import './Dashboard.css';
import RenderCont from '../View_Story/RenderCont'
import { Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {Link} from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import ErrorModal from '../ErrorModal/ErrorModal';

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            stories: [],
            open: true,
            serverErrorMessage:''
        }
    }
    handleClose = () => {
        this.setState({ open: false });
      };
    
    componentDidMount(){
        axios.get(`/api/Dashboard`)
        .then(res=>{
            const stories =res.data;
            this.setState({stories});
        })
        .catch(err =>{
            this.setState({serverErrorMessage:' Server error'})
          });
    }

    render(){
        let errorMessage = this.state.serverErrorMessage && <ErrorModal error = {this.state.serverErrorMessage}/>       
        const stories = this.state.stories.map((story)=>{
           
            return(
                <Card className="storybox" key={story.story_id}>
                <CardContent>
                <div  className= "storyname">{story.title}</div>
                <div  className = "description">{story.description}</div>

                <Link to ={`/view_story/${story.story_id}`}><button className="view">View story</button></Link>
                </CardContent>
                </Card>
            )
        })
        return(
            <div className="idk">
            <div className="dashboard">
             {stories}
             <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left"
            }}
            open={this.state.open}
            autoHideDuration={3250}
            onClose={this.handleClose}
            message={<p>This is your dashboard. Choose your actions wisely!</p>}
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
            </div>
            <h3 className= "storydash">Stories Dashboard</h3>
            {errorMessage}
 </div>
        )
    }
 }
 export default Dashboard;
