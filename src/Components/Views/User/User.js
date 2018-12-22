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
            bio:'dtidnfd',
            profilePic:'https://i.pinimg.com/236x/33/fe/73/33fe73c8629b599c835c9d76e360f8bc--daffy-duck-duck-duck.jpg',
            
        }
        this.changePic = this.changePic.bind(this);
    }
    
    // componentDidMount(){
    //     const {userId, userName} = this.props;
    //     this.setState({userId:userId, userName:userName})
        
    // }

    changePic(val){
        debugger
        this.setState({profilePic:val})
        this.props.updateProfilePic(val)
    }
    
    render(){
        return(
            <div>
                <ProfileCard 
                    userName={this.state.userName}
                    changePic ={this.changePic}
                    bio={this.state.bio}
                    profilePic={this.state.proPic}
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
