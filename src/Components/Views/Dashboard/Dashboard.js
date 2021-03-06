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
import LandingModal from '../Dashboard/LandingModal';
import TextField from '@material-ui/core/TextField';

class Dashboard extends Component {

  constructor(props) {
      super(props);
      this.state = {
          filteredStories: [],
          stories: [],
          open: true
      }
     this.handleChange=this.handleChange.bind(this);

  }
  handleClose = () => {
      this.setState({ open: false });
    };

    componentDidMount(){
       axios.get(`/api/Dashboard`)
       .then(res=>{
           const stories =res.data;
           this.setState({stories,  filteredStories:stories});
       })
       .catch(err =>{
           this.setState({serverErrorMessage:' Server error'})
         });
   }
   handleChange(e){
       this.setState({
           filteredStories : this.state.stories.filter((story)=>{
              return story.title.toUpperCase().includes(e.target.value.toUpperCase())
           })
       })
   }



 handleChange(e){
this.setState({
    filteredStories : this.state.stories.filter((story)=>{
       return story.title.toUpperCase().includes(e.target.value.toUpperCase())
    })
})
}


  render(){

      const stories = this.state.filteredStories.map((story)=>{

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
          <TextField
          id="outlined-search"
          label="Search by Title"
          type="search"
          className="filter"
          margin="normal"
          variant="outlined"
          style={{backgroundColor: "#EAFBF7", color:"#378674", borderRadius:5, textAlign:"center",}}
        />

          
          <LandingModal/>
          <h3 className= "storydash">Stories Dashboard</h3>
</div>
      )
  }
}
export default Dashboard;
