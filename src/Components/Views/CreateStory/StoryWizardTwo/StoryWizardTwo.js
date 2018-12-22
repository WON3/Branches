import React, {Component} from 'react';
import '../../CreateStory/CreateStory.css';
import { addDescripton } from '../../../../ducks/reducer';
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
    
render(props){
    const {storyGuideDescripton, addDescripton} = this.props
    return (
        <div className="createStory">
            <div className="wizard-box">
            <h2>Description</h2>
            <input className="descripton" name= "description" onChange={e => {addDescripton(e.target.value)}}></input>
            {console.log(storyGuideDescripton)}
            </div>
                <div>
           <Link to= '/create_three'><button>Next</button></Link>
          </div>

        </div>
    )
}

}

function mapStateToProps(state){
    const {storyGuideDescripton} = state;

    return {
        storyGuideDescripton
    };
}

export default connect(mapStateToProps, {addDescripton})(StoryWizardTwo);