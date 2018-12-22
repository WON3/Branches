import React, {Component} from 'react';
import axios from 'axios';
import '../../CreateStory/CreateStory.css';
import { addTitle, addDescripton, addPOV, addForkRestriction, addModerator } from '../../../../ducks/reducer';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class StoryWizardTwo extends Component {
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
        // this.addNewStory = this.addNewStory.bind(this);
    }

          //handleChange() for all input fields update state.. later will also update redux??
        handleChange(e){
            this.setState({
            [e.target.name]: e.target.value
            })
        }

        // addNewStory(){
        //     const newStory= {
        //         is_complete: false,
        //         user_id: this.state.user_id,
        //         title: this.state.title,
        //         description: this.state.description,
        //         point_of_view: this.state.point_of_view,
        //         is_public: false,
        //         allows_fork: this.state.allows_fork,
        //         moderator_accepts: this.state.moderator_accepts
        //     }

        //     axios.post(`/api/newStory`, newStory)
        //         .then( res => {
        //             console.log("new story added");
        //             // this.props.history.push('/')
        //             addTitle(this.state.title);
        //             addDescripton(this.state.description); 
        //             addPOV(this.state.point_of_view); 
        //             addForkRestriction(this.state.allows_fork); 
        //             addModerator(this.state.moderator_accepts);
        //             console.log(this.props)
        //         })
        // }
    
render(props){
    const {storyGuideDescripton, addDescripton} = this.props
    return (
        <div className="createStory">
            <div>
            Description
            <input className="descripton" name= "description" onChange={e => {addDescripton(e.target.value)}}></input>
            {console.log(storyGuideDescripton)}
            </div>
                <div>
           <Link to= '/create_three'>Next</Link>
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

export default connect(mapStateToProps, {addTitle, addDescripton, addPOV, addForkRestriction, addModerator })(StoryWizardTwo);