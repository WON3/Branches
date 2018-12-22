import React from "react";
import "./Buttons.css";
import Button from "@material-ui/core/Button";

function Buttons(props) {
  return (
    <div className="button">
    <Button variant="contained" color="primary">
      LOGIN
    </Button>
    </div>
  );
}

export default Buttons;

/*submit buttons, logout buttons, home button shared, */
