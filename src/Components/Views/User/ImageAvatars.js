import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import React  from 'react';

const styles = {
    avatar: {
      margin: 10,
    },
    bigAvatar: {
        margin: 10,
        width: 60,
        height: 60,
      },
  };
  function ImageAvatars(pass) {
    const { classes } = pass;
    
    return (
        <div>
            <h2>gu</h2>
      <Grid container justify="center" alignItems="center">
        <Avatar alt="Remy Sharp" src={pass.profilePic} className={classes.bigAvatar} />
      </Grid>
      </div>
    );
  }
  
  ImageAvatars.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(ImageAvatars);

  