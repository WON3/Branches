import React, {Component} from 'react';
import ProfileCard from './ProfileCard';
import {connect} from 'react-redux';
import {updateProfilePic} from '../../../ducks/reducer';



//Need Redux initialState for username, user Badge, profile pic, stories in work

class User extends Component{
    constructor(props){
        super(props)
        this.state = {
            userId:'',
            userName:'RyGuy',
            bio:'dtidnfd'
        }
    }
    
    // componentDidMount(){
    //     const {userId, userName} = this.props;
    //     this.setState({userId:userId, userName:userName})
        
    // }

    changePic(val){
        this.setState({profilePic:val})
        this.props.updateProfilePic(val)
    }
    
    render(){
        return(
            <div>
                <ProfileCard 
                    userName={this.state.userName}
                    profilePic={this.state.profilePic}
                    changePic ={this.changePic}
                    bio={this.state.bio}
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