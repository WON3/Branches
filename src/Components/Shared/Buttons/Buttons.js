import React from 'react';
import './Buttons.css';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import { ButtonBase } from '@material-ui/core';

function App() {
  return (
    <Button variant="contained" color="primary">
      Hello World
    </Button>
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));

export default Buttons;





/*submit buttons, logout buttons, home button shared, */
