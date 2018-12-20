import React, {Component} from 'react';

import ProfileCard from './ProfileCard';
import { FormHelperText } from '@material-ui/core';
import {connect} from 'react-redux';
import {updateProfilePic} from '../../../ducks/reducer';



//Need Redux initialState for username, user Badge, profile pic, stories in work

class User extends Component{
    constructor(props){
        super(props)
        this.state = {
            userId:'',
            userName:''
        }
    }
    
    componentDidMount(){
        const {userId, userName} = this.props;
        this.setState({userId:userId, userName:userName})
        
    }

    changePic(val){
        this.setState({profilePic:val})
        this.props.updateProfilePic(val)
    }
    
    render(){
        return(
            <div style={{display:'flex',justifyContent:'space-around', alignItems:'center'}}>
                <ProfileCard 
                    name={this.state.userName}
                    profilePic={this.state.profilePic}
                    changePic ={this.changePic}
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

function mapStateToProps (state) {
    const {userId, userName } = state;
    return {
        userId,
        userName
    }
}
export default connect(mapStateToProps, {updateProfilePic})(User);