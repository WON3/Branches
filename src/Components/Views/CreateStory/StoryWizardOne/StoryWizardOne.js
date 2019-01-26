
import React, {Component} from 'react';
import '../../CreateStory/CreateStory.css';
import { addTitle } from '../../../../ducks/reducer';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
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
  return ['Add a Title', 'Write a Description', 'Story Rules'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return 'Add a Title...';
    case 1:
      return 'What is this story about?';
    case 2:
      return 'How much control do you want?';
    default:
      return 'Unknown step';
  }
}

class StoryWizardOne extends Component {
  constructor(props) {
    super(props);

    this.state = {
      is_Complete: false, //defaults to false
      user_id: this.props.userId, //from props,
      title: "", //user Input
      description: "",
      point_of_view: "First Person",
      is_public: false, //defaults to false
      allows_fork: true, //user Input
      moderator_accepts: true, //user Input
      open: true,
      activeStep: 0,
      skipped: new Set(),
    };
    this.handleChange = this.handleChange.bind(this);
    // this.addNewStory = this.addNewStory.bind(this);
  }

  //handleChange() for all input fields update state.. later will also update redux??
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleClose = () => {
    this.setState({ open: false });
  };

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

  render(props) {
    const { classes, storyGuideTitle, addTitle } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;
    return (

        <div className= "createStory">
            <div className= "title-box">
                   
              <div>
                <h2 className= "wizard-title">Create Story Wizard</h2>
                {/* <img src={'./src/images/pen-desktop.png'} alt= "pen"/> */}
              </div>
                <p>We'll walk you through all of guidelines for creating your new story here</p>
            </div>
            <Stepper activeStep={activeStep}>
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
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={this.handleBack}
                  
                >
                  Back
                </Button>
                {this.isStepOptional(activeStep) && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleSkip}
                    
                  >
                    Skip
                  </Button>
                )}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handleNext}
                  
                >
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </div>
            </div>
          )}
        </div>
            <div className="wizard-box">
            <TextField 
            className="title" 
            name= "title" 
            label= "Title (maximum: 100 characters)" 
            style = {{backgroundColor: "#EAFBF7", width: "90%"}}
            inputProps={{
              maxLength: "100"
            }}
            onChange={e => {addTitle(e.target.value)}} 
            margin="normal"
            variant="outlined"
            />
         
          <div className='button'> 
            <Link to= '/create_two' style={{textDecoration: "none"}}>
              <Button variant="contained" color="#378674ff" style={{color:"#378674ff", backgroundColor: "#EAFBF7", textDecoration: "none", width: "40%", height: "100%"}}>
              NEXT
              </Button>
            </Link>
          </div>
          </div>
        </div>
      
    );
  }
}

function mapStateToProps(state) {
  const { storyGuideTitle } = state;

  return {
    storyGuideTitle
  };
}

// StoryWizardOne.propTypes = {
//   classes: PropTypes.object,
// };

export default connect(
  mapStateToProps,
  { addTitle }
)(StoryWizardOne);
