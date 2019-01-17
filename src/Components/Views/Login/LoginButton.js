import React from "react";
import Button from "@material-ui/core/Button";
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles,} from '@material-ui/core/styles';


const styles = {
  root: {
    background: '#EAFBF7',
    borderRadius: 5,
    border: 0,
    color: '#378674',
    fontSize:20,
    height: 48,
    padding: '0 30px',
    width: 300,
  },
};

function LoginButton(props) {
  const { classes, children, className, ...other } = props;
  return (
    <Button className={classNames(classes.root, className)} {...other}
    onClick={props.login}>
      Login
    </Button>
  );
}


LoginButton.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default withStyles(styles)(LoginButton);
