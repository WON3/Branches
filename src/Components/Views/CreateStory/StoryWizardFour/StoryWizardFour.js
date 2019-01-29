import React, {Component} from 'react';
import axios from 'axios';
import '../../CreateStory/CreateStory.css';
import { addTitle, addDescripton, addPOV, addForkRestriction, addModerator } from '../../../../ducks/reducer';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';


const styles = theme => ({
    root: {
      width: '90%',
    },
    button: {
      marginRight: theme.spacing.unit,
    },
    instructions: {
      marginTop: theme.spacing.unit,
      marginBottom: theme.spacing.unit,
    },
  });

  function getSteps() {
    return ['Add a Title', 'Write a Description', 'Story Rules', 'Review and Submit'];
  }
  
  function getStepContent(step) {
    switch (step) {
      case 0:
        return 'Add a Title';
      case 1:
        return 'What is this story about?';
      case 2:
        return 'How much control do you want?';
      case 3:
        return '';
      default:
        return 'Review and Submit';
    }
  }  


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
            moderator_accepts: true,
            serverErrorMessage:''
        }//user Input

            activeStep: 3,
            skipped: new Set(),
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
        isStepOptional = step => step === -1;

        handleNext = () => {
          const { activeStep } = this.state;
          let { skipped } = this.state;
          if (this.isStepSkipped(activeStep)) {
            skipped = new Set(skipped.values());
            skipped.delete(activeStep);
          }
          this.setState({
            activeStep: activeStep + 1,
            skipped,
          });
        };
      
        handleBack = () => {
          this.setState(state => ({
            activeStep: state.activeStep - 1,
          }));
        };
      
        handleSkip = () => {
          const { activeStep } = this.state;
          if (!this.isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
          }
          this.setState(state => {
            const skipped = new Set(state.skipped.values());
            skipped.add(activeStep);
            return {
              activeStep: state.activeStep + 1,
              skipped,
            };
          });
        };
      
        handleReset = () => {
          this.setState({
            activeStep: 0,
          });
        };
      
        isStepSkipped(step) {
          return this.state.skipped.has(step);
        }

    
render(props){
        let errorMessage = this.state.serverErrorMessage && <ErrorModal error = {this.state.serverErrorMessage}/>       
    const {classes, storyGuideTitle,
        storyGuideDescripton,
        storyGuidePOV,
        storyGuideFork,
        storyGuideMod} = this.props;
   const steps = getSteps();
   const { activeStep } = this.state;
    return (
        <div className="createStory">
            <div>
            <h2 style={{fontSize: "40px", paddingTop: "5%"}}>You're Almost Finished</h2>
            </div>
            <div>
            <h2>Please Review the Story Guidelines You've Selected </h2>
            </div>
            <Stepper activeStep={activeStep} id="stepper">
          {steps.map((label, index) => {
            const props = {};
            const labelProps = {};
            if (this.isStepOptional(index)) {
              labelProps.optional = <Typography variant="caption">Optional</Typography>;
            }
            if (this.isStepSkipped(index)) {
              props.completed = false;
            }
            return (
              <Step key={label} {...props}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
            <div>
              <Typography >
                All steps completed - you&apos;re finished
              </Typography>
              <Button onClick={this.handleReset} >
                Reset
              </Button>
            </div>
          ) : (
            <div>
              <Typography >{getStepContent(activeStep)}</Typography>
            
            </div>
          )}
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
                    { storyGuideFork ?
                      <div style= {{fontSize: "18pt", fontStyle: "normal"}}>Yes</div>
                      :<div style= {{fontSize: "18pt", fontStyle: "normal"}}>No</div>
                    }
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
                    { storyGuideMod ?
                      <div style= {{fontSize: "18pt", fontStyle: "normal"}}>Yes</div>
                      :<div style= {{fontSize: "18pt", fontStyle: "normal"}}>No</div>
                    }
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
                {activeStep === steps.length - 1 ? 'Submit New Story' : 'Next'} </Button>
                
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