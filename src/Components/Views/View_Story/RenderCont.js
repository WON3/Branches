import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import { Link } from 'react-router-dom';

import './View_Story.css'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,

  },
});

function RenderCont(props) {
  const { classes, contribution } = props;
  console.log({contribution})
  return (
    <div className="contribution">
      <Tooltip title={contribution.username} placement="bottom-start" interactive>
        <Link  to={`/user/${contribution.user_id}`}>
          <Paper style={{ backgroundColor: 'transparent' }} className={classes.root} elevation={1}>
            <Typography align="left" component="h3">
              {contribution.contribution}
            </Typography>
          </Paper>
        </Link>
      </Tooltip>
    </div>
  );
}

RenderCont.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RenderCont);