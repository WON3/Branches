import React, {Component} from 'react';
import axios from 'axios';
import '../../CreateStory/CreateStory.css';
import { addTitle, addDescripton, addPOV, addForkRestriction, addModerator } from '../../../../ducks/reducer';
import { connect } from 'react-redux';
import Button from "@material-ui/core/Button";


class StoryWizardFour extends Component {
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
        this.addNewStory = this.addNewStory.bind(this);
    }

        addNewStory(props){
            const {
                storyGuideTitle,
                storyGuideDescripton,
                storyGuidePOV,
                storyGuideFork,
                storyGuideMod
                } = this.props;

            const newStory= {
                is_complete: false,
                user_id: this.state.user_id,
                title: storyGuideTitle,
                description: storyGuideDescripton,
                point_of_view: storyGuidePOV,
                is_public: false,
                allows_fork: storyGuideFork,
                moderator_accepts: storyGuideMod
            }

            axios.post(`/api/newStory`, newStory)
                .then( res => {
                    console.log("new story added");
                    this.props.history.push('/')
                })
        }
    
render(props){
    const {storyGuideTitle,
        storyGuideDescripton,
        storyGuidePOV,
        storyGuideFork,
        storyGuideMod} = this.props;
    return (
        <div className="createStory">
            <div>
            <h2 style={{fontSize: "40px", paddingTop: "15%"}}>You're Almost Finished</h2>
            </div>
            <div>
            <h2>Please Review the Story Guidelines You've Selected </h2>
            </div>
            <div className="create-three-div">
                <div id="POV-Fork-Mod">
                    <h2 id="questions">Title:</h2>
                    <div  style= {{fontSize: "18pt", fontStyle: "normal"}}>{storyGuideTitle}</div>
                </div>
                <div id="POV-Fork-Mod">
                    <h2 id="questions">Description:</h2>
                    <div style= {{fontSize: "18pt", fontStyle: "normal"}}>{storyGuideDescripton}</div>
                </div>
                <div id="POV-Fork-Mod">
                    <h2 id="questions">Point of View:</h2>
                    <div style= {{fontSize: "18pt", fontStyle: "normal"}}>{storyGuidePOV}</div>
                </div>
                <div id="POV-Fork-Mod">
                    <h2 id="questions">Allows Story to Fork:</h2>
                    <div style= {{fontSize: "18pt", fontStyle: "normal"}}>{storyGuideFork}</div>
                    
                </div>
                <div id="POV-Fork-Mod">
                    <h2 id="questions">You are Controlling All Submissions:</h2>
                    <div style= {{fontSize: "18pt", fontStyle: "normal"}}>{storyGuideMod}</div>
                </div>
        
                <div className="button">
                <Button 
                variant="contained" 
                color="primary" 
                style={{backgroundColor: "#5d5147", textDecoration: "none", width: "40%", height: "100%"}}
                onClick= {() => {this.addNewStory()}}>
                Submit New Story
                </Button>
                
                </div>
            </div>

        </div>
    )
}

}

function mapStateToProps(state){
    const {
        storyGuideTitle,
        storyGuideDescripton,
        storyGuidePOV,
        storyGuideFork,
        storyGuideMod
            } = state;

    return {
        storyGuideTitle,
        storyGuideDescripton,
        storyGuidePOV,
        storyGuideFork,
        storyGuideMod
    };
}

export default connect(mapStateToProps, {addTitle, addDescripton, addPOV, addForkRestriction, addModerator })(StoryWizardFour);