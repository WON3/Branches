import React, {Component} from 'react';
import axios from 'axios';
import './CreateStory.css';



export default class CreateStory extends Component {
    constructor(props){
        super(props)

        this.state = {
            is_Complete: false, //defaults to false
            user_id: 2 , //from props,
            title: "", //user Input
            description: "",
            point_of_view: "",
            is_public: false, //defaults to false
            allows_fork: true, //user Input
            moderator_accepts: true //user Input
        }
        this.handleChange = this.handleChange.bind(this);
        this.addNewStory = this.addNewStory.bind(this);
    }

          //handleChange() for all input fields update state.. later will also update redux??
        handleChange(e){
            this.setState({
            [e.target.name]: e.target.value
            })
        }

        //addNewStory() Bind method ... when user clicks on submit button 
            //working on endpoints
        addNewStory(){
            const newStory= {
                is_complete: false,
                user_id: this.state.user_id,
                title: this.state.title,
                description: this.state.description,
                point_of_view: this.state.point_of_view,
                is_public: false,
                allows_fork: this.state.allows_fork,
                moderator_accepts: this.state.moderator_accepts
            }

            axios.post(`/api/newStory`, newStory)
                .then( res => {
                    console.log("new story added");
                    // this.props.history.push('/')
                })
        }
    
render(){

    return (
        <div className="createStory">
            <div>
                Title
                <input name= "title" onChange={e => {this.handleChange(e)}}></input>
                Description
                <input name= "description" onChange={e => {this.handleChange(e)}}></input>
                Point of View (select one)
                    <select value={this.state.point_of_view} onChange={e => this.handleChange(e)}>
                        <option name="point_of_view" value="First Person">First Person</option>
                        <option name="point_of_view" value="Second Person">Second Person</option>
                        <option name="point_of_view" value="Third Person">Third Person</option>
                        <option name="point_of_view" value="Narrative">Narrative</option>
                    </select>
                Would you like to allow approved contributors to create an alternate branch (story path)? (?) .. pop up.. if a large percentage of contributors are unhappy with the direction of the story, they may branch off and create an alternate story direction.)
                <button>Yes</button> (circle selection or toggle)
                <button>No</button> (circle selection)
                Do you want to approve all story snippet submissions or let contributors vote on each submission?
                <button>Yes</button> (circle selection or toggle)
                <button>No</button> (circle selection or toggle)
                <button onClick= {() => {this.addNewStory()}}>Submit New Story</button>
            </div>



        </div>
    )
}

}