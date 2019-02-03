/*possible text field style code*/
/*
import { withStyles,} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import TextField from "@material-ui/core/TextField";


const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    margin: {
      margin: theme.spacing.unit,
    },
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: "#5d5147",
    },
  
  }})

render(){
const { classes } = props;

return ()
  <TextField
  className={classes.margin}
              InputProps={{
                classes: {
                  root: classes.cssOutlinedInput,
                  focused: classes.cssFocused,
                  notchedOutline: classes.notchedOutline,
                },
              }}
              />


              connect.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedInputs) (connect(
  null,
  { getUser }
))(Login);?????






























              */