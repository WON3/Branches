import React, { Component } from 'react';
import axios from 'axios';
import './Dashboard.css';
import RenderCont from '../View_Story/RenderCont'
import { Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            stories: [],
            
        }
    }
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
                <Card className="title">
                <CardContent>
                <Typography className= "storyname" key={story.story_id}>{story.title}</Typography>
                <Typography className = "description" key={story.story_id}>{story.description}</Typography>
                </CardContent>
                </Card>
            )
        })
        return(
            <div className ="dashboard" >
                {stories}
            </div>
 
        )
    }
 }
 export default Dashboard;

