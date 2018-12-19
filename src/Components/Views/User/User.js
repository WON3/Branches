import React, {Component} from 'react';

import ProfileCard from './ProfileCard';
import { FormHelperText } from '@material-ui/core';
import {connect} from 'react-redux';
// import {} from '../../ducks/reducer';
import axios from 'axios';

//Need Redux initialState for username, user Badge, profile pic, stories in work

class User extends Component{
    constructor(props){
        super(props)
        this.state = {
            userId:''
        }
    }
    
    componentDidMount(){
        //axios.get('/api/profile')
        //on login redux state should have the user id and get teh 
        //profile pic and add to state. Then here we can access it by getting 
        //initial state.
    }
    
    render(){
        return(
            <div style={{display:'flex',justifyContent:'space-around', alignItems:'center'}}>
                <ProfileCard 
                    name='Ry'
                />
                <ProfileCard 
                    name='Tris'
                />
                <ProfileCard 
                    name='Pais'
                />
            </div>
        )
    }
}


//map state to props.
export default User;