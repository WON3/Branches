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

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            stories: [],
            open: true
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
    }

    render(){
       
        const stories = this.state.stories.map((story)=>{
            return(
                <Card className="storybox">
                <CardContent>
                <Typography variant="h6" className= "storyname" key={story.story_id}>{story.title}</Typography>
                <Typography variant="body2" className = "description" key={story.story_id}>{story.description}</Typography>
                <Link to ={`/view_story/${story.story_id}`}><button className="view">View story</button></Link>
                </CardContent>
                </Card>
            )
        })
        return(

            <div className ="dashboard" >
            <h1>Story Dashboard</h1>
             {stories}
             <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left"
            }}
            open={this.state.open}
            autoHideDuration={6000}
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
 
        )
    }
 }
 export default Dashboard;
