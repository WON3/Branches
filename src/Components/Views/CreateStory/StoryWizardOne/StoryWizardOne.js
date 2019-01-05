import React, {Component} from 'react';
import '../../CreateStory/CreateStory.css';
import { addTitle } from '../../../../ducks/reducer';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";




class StoryWizardOne extends Component {
    constructor(props){
        super(props)

        this.state = {
            is_Complete: false, //defaults to false
            user_id: 1 , //from props,
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
    const {storyGuideTitle, addTitle} = this.props
    return (
        <div className="createStory">
            <div className="title-box">
                <h1>Create Story Wizard</h1>
                <p>We'll walk you through all of guidelines for creating your new story here</p>
            </div>
            <div className="wizard-box">
            <TextField 
            className="title" 
            name= "title" 
            label= "Title" 
            onChange={e => {addTitle(e.target.value)}} 
            margin="normal"
            variant="outlined"
            />
         
          <div className='button'> <Link to= '/create_two' style={{textDecoration: "none"}}>

          <Button variant="contained" color="primary" style={{backgroundColor: "#5d5147", textDecoration: "none"}}>
            NEXT
          </Button></Link></div>
        
            </div>
          

        </div>
        )
    }
}

function mapStateToProps(state){
    const {storyGuideTitle} = state;

    return {
        storyGuideTitle
    };
}

export default connect(mapStateToProps, {addTitle})(StoryWizardOne);