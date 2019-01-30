import React, {Component} from 'react';
import '../../CreateStory/CreateStory.css';
import {addPOV, addForkRestriction, addModerator } from '../../../../ducks/reducer';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from "@material-ui/core/Button";
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import AddIcon from '@material-ui/icons/Add';
import HelpRounded from '@material-ui/icons/HelpRounded';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';




const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing.unit * 2,
    },
    fab: {
      margin: theme.spacing.unit * 2,
    },
    absolute: {
      position: 'absolute',
      bottom: theme.spacing.unit * 2,
      right: theme.spacing.unit * 3,
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
        return 'Story Guidelines';
      case 3:
        return 'Almost Finished..';
      default:
        return 'Review and Submit';
    }
  }

class StoryWizardThree extends Component{
    constructor(props){
        super(props);

        this.state = {
            storyGuidePOV: '',
            storyGuideFork: '',
            storyGuideMod: true,
            labelWidth: 0,
            activeStep: 2,
            skipped: new Set(),
            required: true,
            error: false
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(props) {
        this.setState({
          labelWidth: '40px'
        });
        this.props.addModerator(this.state.storyGuideMod)
      }
      
      handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
      };
      isStepOptional = step => step === -1;

      handleNext = (props) => {
        const { activeStep } = this.state;
        let { skipped } = this.state;
        if(!this.props.storyGuidePOV || this.props.storyGuideFork === ''){
          this.setState({
            error: true
          })
          alert("Please complete all fields to continue")
        } else{
          this.props.history.push('/create_four')
          if (this.isStepSkipped(activeStep)) {
            skipped = new Set(skipped.values());
            skipped.delete(activeStep);
          }
          this.setState({
            activeStep: activeStep + 1,
            skipped,
          });
        }
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
    const {storyGuidePOV, addPOV, storyGuideFork, addForkRestriction, storyGuideMod, addModerator, classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;
    return (
        <div className="createStory" id="storyGuidelines">
         <div className="title-box">
                <h2 className= "wizard-title">Create Story Wizard</h2>
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
            <div id="POV-Fork-Mod" style = {{justifyContent: "space-between", maxWidth: "250px"}}>
            <form className={styles.root} style = {{justifyContent: "space-between", width: "100%", padding: "0px"}} autoComplete="off">
        <FormControl className={styles.formControl} required = {this.state.required}
            error = {this.state.error} style={{display: "flex", flexDirection: "column", justifyContent: "space-between", textAlign: "left"}}>
          <InputLabel id="questions" htmlFor="age-simple" style={{color: "#EAFBF7"}}>Point of View </InputLabel>

          <Select
            value={storyGuidePOV}
            onChange={e => {
                addPOV(e.target.value)
            }
        }
            inputProps={{
              name: 'point_of_view',
              id: 'age-simple',
            }}
          >
            <MenuItem value="" style={{backgroundColor: "#EAFBF7"}}>
              <em>(Select One)</em>
            </MenuItem>
            <MenuItem value="First Person" style={{backgroundColor: "#EAFBF7"}}>First Person</MenuItem>
            <MenuItem value="Second Person" style={{backgroundColor: "#EAFBF7"}}>Second Person</MenuItem>
            <MenuItem value="Third Person" style={{backgroundColor: "#EAFBF7"}}>Third Person</MenuItem>
            <MenuItem value="Narrative" style={{backgroundColor: "#EAFBF7"}}>Narrative</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={styles.formControl} required = {this.state.required}
            error = {this.state.error}>
       
          <InputLabel id="questions" htmlFor="age-helper" style={{color: "#eafbf7", display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "center"}}>Allows New Story Branch   <Tooltip title="This feature allows contributors to create a new branch and go in new direction with the story." aria-label="HelpRounded">
            <IconButton style={{backgroundColor: "transparent"}} >
              <HelpRounded style={{height: "20%"}}/>
            </IconButton>
          </Tooltip></InputLabel>
        
          <Select
            value={storyGuideFork}
            onChange={e => 
                {addForkRestriction(e.target.value)}
            }
            inputProps={{
                name:"allows_fork", 
                id:"age-helper",
            }}
            
          >
            <MenuItem value="" style={{backgroundColor: "#EAFBF7"}}>
              <em>(Select One)</em>
            </MenuItem>
            <MenuItem value={true} style={{backgroundColor: "#EAFBF7"}}>Yes</MenuItem>
            <MenuItem value={false} style={{backgroundColor: "#EAFBF7"}}>No</MenuItem>
          </Select>
        </FormControl>
        
        <div></div>

        {/* <FormControl className={styles.formControl}>
          <InputLabel id="questions" htmlFor="age-helper" style={{color: "#eafbf7"}}>Approve all story snippet submissions or let contributors vote on each submission?</InputLabel>
          <Select
            value={storyGuideMod}
            onChange={e => {
                addModerator(e.target.value)
             
                }
            }
            inputProps={{
            name:"moderator_accepts", 
            id:"age-helper",
            }}
          >
            <MenuItem value="" style={{backgroundColor: "#EAFBF7"}}>
              <em>(Select One)</em>
            </MenuItem>
            <MenuItem value={true} style={{backgroundColor: "#EAFBF7"}}>Yes</MenuItem>
            <MenuItem value={false} style={{backgroundColor: "#EAFBF7"}}>No</MenuItem>
          </Select>
       
          <FormHelperText>By Selecting "Yes" you agree to either approve or reject all contributer story submissions. Otherwise, all submissions will be voted on by approved contributers.</FormHelperText>
        </FormControl> */}
      </form>
          {/* </div>  
            <div className="create-three-div">
            <div id="POV-Fork-Mod">
        <h2 id="questions"> Point of View </h2>
            <select name="point_of_view" value={storyGuidePOV} onChange={e => addPOV(e.target.value)}>
                <option value="First Person">First Person</option>
                <option value="Second Person">Second Person</option>
                <option value="Third Person">Third Person</option>
                <option value="Narrative">Narrative</option>
            </select>
            </div>
            <div id="POV-Fork-Mod">
            <h2 id="questions">Would you like to allow approved contributors to create an alternate story branch? </h2> 
           
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
                </div> */}
        <div id="wizard-buttons">
            <Link to= '/create_two' style={{textDecoration: "none"}}>
              <Button variant="contained" disabled={activeStep === 0}
                  onClick={this.handleBack} 
                 style={{color:"#378674ff", backgroundColor: "#EAFBF7", textDecoration: "none", width: "40%", height: "100%"}}
                 >
              BACK
              </Button>
            </Link>
        
            {/* <Link to= '/create_four' style={{textDecoration: "none"}}> */}
                <Button variant="contained" 
                style={{color:"#378674ff", backgroundColor: "#EAFBF7", width: "40%", height: "100%"}}
                onClick={this.handleNext}
  
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'} 
                
                </Button>
        {/* </Link> */}
            </div>
          </div>
        </div>
        )
    }
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