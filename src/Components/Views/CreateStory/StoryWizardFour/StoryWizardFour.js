import React, {Component} from 'react';
import axios from 'axios';
import '../../CreateStory/CreateStory.css';
import { addTitle, addDescripton, addPOV, addForkRestriction, addModerator } from '../../../../ducks/reducer';
import { connect } from 'react-redux';


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
                    // this.props.history.push('/')
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
            Please Review the Story Guidelines You've Selected
            {storyGuideTitle}
            {storyGuideDescripton}
            {storyGuidePOV}
            {storyGuideFork}
            {storyGuideMod}
                </div>
                <div>
            <button onClick= {() => {this.addNewStory()}}>Submit New Story</button>
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