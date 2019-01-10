import React, { Component } from 'react';
import axios from 'axios';
import './Dashboard.css';
import RenderCont from '../View_Story/RenderCont'
import { Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {Link} from "react-router-dom";


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
                <Card className="storybox">
                <CardContent>
                <Typography className= "storyname" key={story.story_id}>{story.title}</Typography>
                <Typography className = "description" key={story.story_id}>{story.description}</Typography>
                <Link to ={`/view_story/${story.story_id}`}><button className="view">View story</button></Link>
                </CardContent>
                </Card>
            )
        })
        return(

            <div className ="dashboard" >
               <h1>Stories in the Works</h1>
             {stories}
            </div>
 
        )
    }
 }
 export default Dashboard;