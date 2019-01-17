import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

import './View_Story.css'

// const styles = theme => ({
//   root: {
//     ...theme.mixins.gutters(),
//     paddingTop: theme.spacing.unit * 2,
//     paddingBottom: theme.spacing.unit * 2,

//   },
// });

function Readview(props) {
  const { classes, contribution } = props;
  return (
    <div className="zzz">
      <p style={{ display: "inline" }}>
        {contribution.contribution}
      </p>
    </div>
  );
}

// Readview.propTypes = {
//   classes: PropTypes.object.isRequired,
// };
// withStyles(styles)
export default (Readview);