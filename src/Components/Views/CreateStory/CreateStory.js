import React, {Component} from 'react';
import axios from 'axios';


export default class CreateStory extends Component {
    constructor(props){
        super(props)

        this.state = {
            is_Complete: false, //defaults to false
            user_id: 2 , //from props,
            title: "", //user Input
            description: "",
            point_of_view: "third person",
            is_public: false, //defaults to false
            allows_fork: true, //user Input
            Moderator_accepts: true //user Input
        }
        this.handleChange = this.handleChange.bind(this)
    }

          //handleChange() for all input fields update state.. later will also update redux??
        handleChange(e){
            this.setState({
            [e.target.name]: e.target.value
            })

        //addNewStory() Bind method ... when user clicks on submit button 
            //working on endpoints
    }
render(){

    return (
        <div>
            <div>
                Title
                <input name= "title" onChange={e => {this.handleChange(e)}}></input>
                Description
                <input name= "description" onChange={e => {this.handleChange(e)}}></input>
                Point of View (select one)
                <button>First Person</button>
                <button>Second Person</button>
                <button>Thid Person</button>
                <button>Narrative</button>
                Would you like to allow approved contributors to create an alternate branch (story path)? (?) .. pop up.. if a large percentage of contributors are unhappy with the direction of the story, they may branch off and create an alternate story direction.)
                <button>Yes</button> (circle selection or toggle)
                <button>No</button> (circle selection)
                Do you want to approve all story snippet submissions or let contributors vote on each submission?
                <button>Yes</button> (circle selection or toggle)
                <button>No</button> (circle selection or toggle)
            </div>



        </div>
    )
}

}