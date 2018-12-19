import React, {Component} from 'react';
import Register from '../Register/Register';

import {connect} from 'react-redux';
import {getUser} from '../../../ducks/reducer';


class Login extends Component{
    
    
    render(){
        return(
            <div>
                <h1>hi</h1>
                <Register/>
            </div>
        )
    }
}

export default connect(null, {getUser})(Login);