import React from 'react';
import '../../CreateStory/CreateStory.css';
import {addPOV, addForkRestriction, addModerator } from '../../../../ducks/reducer';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from "@material-ui/core/Button";

function StoryWizardThree(props){
    const {storyGuidePOV, addPOV, storyGuideFork, addForkRestriction, storyGuideMod, addModerator } = props;
    return (
        <div className="createStory" >
         <div className="title-box">
                <h1>Create Story Wizard</h1>
            </div>
            <div className="create-three-div">
            <div id="POV-Fork-Mod">
        <h2 id="questions">Point of View</h2>
            <select name="point_of_view" value={storyGuidePOV} onChange={e => addPOV(e.target.value)}>
                <option value="First Person">First Person</option>
                <option value="Second Person">Second Person</option>
                <option value="Third Person">Third Person</option>
                <option value="Narrative">Narrative</option>
            </select>
            </div>
            <div id="POV-Fork-Mod">
            <h2 id="questions">Would you like to allow approved contributors to create an alternate story branch? </h2> {/*(?) .. pop up.. if a large percentage of contributors are unhappy with the direction of the story, they may branch off and create an alternate story direction.)*/}
           
                <select name="allows_fork" value={storyGuideFork} onChange={e => addForkRestriction(e.target.value)}>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                </select>
                </div>
                <div id="POV-Fork-Mod">
            <h2 id="questions">Do you want to approve all story snippet submissions or let contributors vote on each submission?</h2>
                <select name="moderator_accepts" value={storyGuideMod} onChange={e => addModerator(e.target.value)}>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                </select>
                </div>
        <div><Link to= '/create_four' style={{textDecoration: "none"}}>
                <Button variant="contained" color="primary" style={{backgroundColor: "#5d5147", width: "40%", height: "100%"}}>
                NEXT
                </Button>
        </Link></div>
        </div>
        </div>
        )
    }



function mapStateToProps(state){
const {
storyGuidePOV,
storyGuideFork,
storyGuideMod
  } = state;

return {
storyGuidePOV,
storyGuideFork,
storyGuideMod
};
}

export default connect(mapStateToProps, {addPOV, addForkRestriction, addModerator })(StoryWizardThree);