import React, {Component} from 'react';
import axios from 'axios';
import '../../CreateStory/CreateStory.css';

export default class StoryWizardThree extends Component {
    constructor(props){
        super(props)

        this.state = {
            is_Complete: false, //defaults to false
            user_id: 2 , //from props,
            title: "", //user Input
            description: "",
            point_of_view: "First Person",
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
            </div>
            <div>
            Description
            <input className="descripton" name= "description" onChange={e => {this.handleChange(e)}}></input>
            </div>
            <div>
            Point of View (select one)
                <select name="point_of_view" value={this.state.point_of_view} onChange={e => this.handleChange(e)}>
                    <option value="First Person">First Person</option>
                    <option value="Second Person">Second Person</option>
                    <option value="Third Person">Third Person</option>
                    <option value="Narrative">Narrative</option>
                </select>
                </div>
                <div>
            Would you like to allow approved contributors to create an alternate branch (story path)? (?) .. pop up.. if a large percentage of contributors are unhappy with the direction of the story, they may branch off and create an alternate story direction.)
                <select name="allows_fork" value={this.state.allows_fork} onChange={e => this.handleChange(e)}>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                </select>
                </div>
                <div>
            Do you want to approve all story snippet submissions or let contributors vote on each submission?
                <select name="moderator_accepts" value={this.state.moderator_accepts} onChange={e => this.handleChange(e)}>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                </select>
                </div>
                <div>
            <button onClick= {() => {this.addNewStory()}}>Submit New Story</button>
          </div>

        </div>
    )
}

}