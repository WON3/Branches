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
  });

class StoryWizardThree extends Component{
    constructor(props){
        super(props);

        this.state = {
            storyGuidePOV: '',
            storyGuideFork: '',
            storyGuideMod: '',
            labelWidth: 0
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.setState({
          labelWidth: '40px'
        });
      }
      
      handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
      };

    render(props) {
    const {storyGuidePOV, addPOV, storyGuideFork, addForkRestriction, storyGuideMod, addModerator, classes } = this.props;
    return (
        <div className="createStory" >
         <div className="title-box">
                <h2 className= "wizard-title">Create Story Wizard</h2>
            </div>

            <div id="POV-Fork-Mod">
            <form className={styles.root} autoComplete="off">
        <FormControl className={styles.formControl}>
          <InputLabel id="questions" htmlFor="age-simple" style={{color: "#eafbf7"}}>Point of View </InputLabel>

          <Select
            value={storyGuidePOV}
            onChange={e => {
                this.props.addPOV(e.target.value)
            }
        }
            inputProps={{
              name: 'point_of_view',
              id: 'age-simple',
            }}
          >
            <MenuItem value="">
              <em>(Select One)</em>
            </MenuItem>
            <MenuItem value="First Person">First Person</MenuItem>
            <MenuItem value="Second Person">Second Person</MenuItem>
            <MenuItem value="Third Person">Third Person</MenuItem>
            <MenuItem value="Narrative">Narrative</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={styles.formControl}>
          <InputLabel id="questions" htmlFor="age-helper" style={{color: "#eafbf7"}}>Allows New Story Branch?</InputLabel>
          <Select
            value={storyGuideFork}
            onChange={e => 
                {this.props.addForkRestriction(e.target.value)}
            }
            inputProps={{
                name:"allows_fork", 
                id:"age-helper",
            }}
            
          >
            <MenuItem value="">
              <em>(Select One)</em>
            </MenuItem>
            <MenuItem value={true}>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
          </Select>
          <FormHelperText>This feature allows contributors to create a new branch and go in new direction with the story.</FormHelperText>
        </FormControl>
        <FormControl className={styles.formControl}>
          <InputLabel id="questions" htmlFor="age-helper" style={{color: "#eafbf7"}}>Do you want to approve all story snippet submissions or let contributors vote on each submission?</InputLabel>
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
            <MenuItem value="">
              <em>(Select One)</em>
            </MenuItem>
            <MenuItem value={true}>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
          </Select>
          <FormHelperText>By Selecting "Yes" you agree to either approve or reject all contributer story submissions. Otherwise, all submissions will be voted on by approved contributers.</FormHelperText>
        </FormControl>
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
              <Button variant="contained" color="primary" 
                 style={{color:"#378674ff", backgroundColor: "#EAFBF7", textDecoration: "none", width: "40%", height: "100%"}}>
              BACK
              </Button>
            </Link>
        
            <Link to= '/create_four' style={{textDecoration: "none"}}>
                <Button variant="contained" color="primary" style={{color:"#378674ff", backgroundColor: "#EAFBF7", width: "40%", height: "100%"}}>
                NEXT
                </Button>
        </Link></div>
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