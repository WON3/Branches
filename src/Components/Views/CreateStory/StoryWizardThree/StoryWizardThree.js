import React from 'react';
import '../../CreateStory/CreateStory.css';
import {addPOV, addForkRestriction, addModerator } from '../../../../ducks/reducer';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function StoryWizardThree(props){
    const {storyGuidePOV, addPOV, storyGuideFork, addForkRestriction, storyGuideMod, addModerator } = props;
    return (
        <div className="createStory" >
         <div className="title-box">
                <h1>Create Story Wizard</h1>
            </div>
            <div id="POV-Fork-Mod">
            <div>
        <h2>Point of View</h2>
            <select name="point_of_view" value={storyGuidePOV} onChange={e => addPOV(e.target.value)}>
                <option value="First Person">First Person</option>
                <option value="Second Person">Second Person</option>
                <option value="Third Person">Third Person</option>
                <option value="Narrative">Narrative</option>
            </select>
            {console.log(storyGuidePOV)}
            </div>
            <div>
            <h2>Would you like to allow approved contributors to create an alternate branch (story path)? (?) .. pop up.. if a large percentage of contributors are unhappy with the direction of the story, they may branch off and create an alternate story direction.)</h2>
                <select name="allows_fork" value={storyGuideFork} onChange={e => addForkRestriction(e.target.value)}>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                </select>
                </div>
                {console.log(storyGuideFork)}
                <div>
            <h2>Do you want to approve all story snippet submissions or let contributors vote on each submission?</h2>
                <select name="moderator_accepts" value={storyGuideMod} onChange={e => addModerator(e.target.value)}>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                </select>
                </div>
                {console.log(storyGuideMod)}
        <div><Link to= '/create_four'><button>Next</button></Link></div>
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