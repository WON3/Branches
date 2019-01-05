import React from "react";
import "./Buttons.css";
import Button from "@material-ui/core/Button";
import { createMuiTheme } from '@material-ui/core/styles';

function Buttons(props) {
  return (
    <div className="button">
    <Button variant="contained" color="primary">
      LOGIN
    </Button>
    </div>
  );
}

/*const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#ff4400',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#0066ff',
      main: '#0044ff',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffcc00',
    },
    // error: will use the default color
  },
}); */

const theme = createMuiTheme({
  overrides: {
    MuiButton: { // Name of the component ⚛️ / style sheet
      root: { // Name of the rule
        color: 'white', // Some CSS
      },
    },
  },
});

export default Buttons;

/*submit buttons, logout buttons, home button shared, */
