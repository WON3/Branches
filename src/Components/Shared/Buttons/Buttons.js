import React from "react";
import "./Buttons.css";
import Button from "@material-ui/core/Button";
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles,} from '@material-ui/core/styles';


const styles = {
  root: {
    background: '#378674',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
};

function Buttons(props) {
  const { classes, children, className, ...other } = props;
  return (
    <Button className={classNames(classes.root, className)} {...other}>
      Login
    </Button>
  );
}


Buttons.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default withStyles(styles)(Buttons);
