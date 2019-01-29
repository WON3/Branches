import React, {Component} from 'react';
import axios from 'axios';
import '../../CreateStory/CreateStory.css';
import { addTitle, addDescripton, addPOV, addForkRestriction, addModerator } from '../../../../ducks/reducer';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import ErrorModal from '../../ErrorModal/ErrorModal';

class StoryWizardFour extends Component {
    constructor(props){
        super(props)

        this.state = {
            is_Complete: false, //defaults to false
            userId: '',
            title: "", //user Input
            description: "",
            point_of_view: "First Person",
            is_public: false, //defaults to false
            allows_fork: true, //user Input
            moderator_accepts: true, //user Input
            serverErrorMessage:''
        }
        this.addNewStory = this.addNewStory.bind(this);
    }
    componentDidMount(){
        console.log(this.props)
        let {userId} = this.props;
        this.setState({userId:userId})
    }
        addNewStory(props){
            console.log(this.state.userId)
            const {
                storyGuideTitle,
                storyGuideDescripton,
                storyGuidePOV,
                storyGuideFork,
                storyGuideMod
                } = this.props;

            const newStory= {
                is_complete: false,
                userId: this.state.userId,
                title: storyGuideTitle,
                description: storyGuideDescripton,
                point_of_view: storyGuidePOV,
                is_public: false,
                allows_fork: storyGuideFork,
                moderator_accepts: storyGuideMod
            }

            axios.post(`/newStory`, newStory)
                .then( res => {
                    console.log("new story added");
                    this.props.history.push('/')
                })
                .catch(err =>{
                    let er = err.respons.data.message;
                    this.setState({serverErrorMessage:er})
                  });
        }
    
render(props){
    let errorMessage = this.state.serverErrorMessage && <ErrorModal error = {this.state.serverErrorMessage}/>       
    const {storyGuideTitle,
        storyGuideDescripton,
        storyGuidePOV,
        storyGuideFork,
        storyGuideMod} = this.props;
    return (
        <div className="createStory">
            <div>
            <h2 style={{fontSize: "40px", paddingTop: "5%"}}>You're Almost Finished</h2>
            </div>
            <div>
            <h2>Please Review the Story Guidelines You've Selected </h2>
            </div>
            <div className="create-three-div" style={{justifyContent: "space-between"}}>
                <div id="POV-Fork-Mod">
                    <h2 id="questions">Title:</h2>
                    <div  style= {{fontSize: "18pt", fontStyle: "normal"}}>{storyGuideTitle}</div>
                    <Link to= '/create_one' style={{textDecoration: "none"}}>
                    <Button
                    variant="contained" 
                    color="primary" 
                    style={{color:"#378674ff", backgroundColor: "#EAFBF7", textDecoration: "none", width: "20%", height: "100%"}}
                    onClick= {() => {this.addNewStory()}}>
                    Edit
                    </Button>
                    </Link>
                </div>
                <div id="POV-Fork-Mod">
                    <h2 id="questions">Description:</h2>
                    <div style= {{fontSize: "18pt", fontStyle: "normal"}}>{storyGuideDescripton}</div>
                    <Link to= '/create_two' style={{textDecoration: "none"}}>
                    <Button
                    variant="contained" 
                    color="primary" 
                    style={{color:"#378674ff", backgroundColor: "#EAFBF7", textDecoration: "none", width: "20%", height: "100%"}}
                    onClick= {() => {this.addNewStory()}}>
                    Edit
                    </Button>
                    </Link>
                </div>
                <div id="POV-Fork-Mod">
                    <h2 id="questions">Point of View:</h2>
                    <div style= {{fontSize: "18pt", fontStyle: "normal"}}>{storyGuidePOV}</div>
                    <Link to= '/create_three' style={{textDecoration: "none"}}>
                    <Button
                    variant="contained" 
                    color="primary" 
                    style={{color:"#378674ff", backgroundColor: "#EAFBF7", textDecoration: "none", width: "20%", height: "100%"}}
                    onClick= {() => {this.addNewStory()}}>
                    Edit
                    </Button>
                    </Link>
                </div>
                <div id="POV-Fork-Mod">
                    <h2 id="questions">Allows Story to Fork:</h2>
                    <div style= {{fontSize: "18pt", fontStyle: "normal"}}>{storyGuideFork}</div>
                    <Link to= '/create_three' style={{textDecoration: "none"}}>
                    <Button
                    variant="contained" 
                    color="primary" 
                    style={{color:"#378674ff", backgroundColor: "#EAFBF7", textDecoration: "none", width: "20%", height: "100%"}}
                    onClick= {() => {this.addNewStory()}}>
                    Edit
                    </Button>
                    </Link>
                </div>
                <div id="POV-Fork-Mod">
                    <h2 id="questions">You are Controlling All Submissions:</h2>
                    <div style= {{fontSize: "18pt", fontStyle: "normal"}}>{storyGuideMod}</div>
                    <Link to= '/create_three' style={{textDecoration: "none"}}>
                    <Button
                    variant="contained" 
                    color="primary" 
                    style={{color:"#378674ff", backgroundColor: "#EAFBF7", textDecoration: "none", width: "20%", height: "100%"}}
                    onClick= {() => {this.addNewStory()}}>
                    Edit
                    </Button>
                    </Link>
                </div>
        
                <div className="button">
                <Button 
                variant="contained" 
                color="primary" 
                style={{color:"#378674ff", backgroundColor: "#EAFBF7", textDecoration: "none", width: "40%", height: "100%"}}
                onClick= {() => {this.addNewStory()}}>
                Submit New Story
                </Button>
                
                </div>
            </div>
            {errorMessage}
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
        storyGuideMod,
        userId
            } = state;

    return {
        storyGuideTitle,
        storyGuideDescripton,
        storyGuidePOV,
        storyGuideFork,
        storyGuideMod,
        userId
    };
}

export default connect(mapStateToProps, {addTitle, addDescripton, addPOV, addForkRestriction, addModerator })(StoryWizardFour);