import React, {Component} from 'react';

import ProfileCard from './ProfileCard';
import { FormHelperText } from '@material-ui/core';


//Need Redux initialState for username, user Badge, profile pic, stories in work

class User extends Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }
    
    
    
    render(){
        return(
            <div style={{display:'flex',justifyContent:'space-around'}}>
                <ProfileCard 
                    name='Ry'
                />
                <ProfileCard 
                    name='Tris'
                />
                <ProfileCard 
                    name='Pais'
                />
                <div>current works</div>
                <div>profile</div>


            </div>
        )
    }
}
export default User;