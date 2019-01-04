import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    
  },
});

function RenderCont(props) {
  const { classes, contribution } = props;
  return (
    <div>
      <Grid align="center" container spacing={16}>
        <Grid style={{margin: 'auto'}} item xs={12}>
          <Tooltip title={contribution.username} interactive>
            <Paper style={{backgroundColor: 'transparent'}} className={classes.root} elevation={1}>
              <Typography align="left" variant="h5" component="h3">
                {contribution.contribution}  
              </Typography>
            </Paper>
          </Tooltip>
        </Grid>
      </Grid>
    </div>
  );
}

RenderCont.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RenderCont);