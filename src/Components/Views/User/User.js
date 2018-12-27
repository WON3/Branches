import React, {Component} from 'react';
import ProfileCard from './ProfileCard';
import {connect} from 'react-redux';
import {updateProfilePic} from '../../../ducks/reducer';
import axios from 'axios';



//Need Redux initialState for username, user Badge, profile pic, stories in work

class User extends Component{
    constructor(props){
        super(props)
        this.state = {
            userId:'1',
            userName:'RyGuy',
            bio:'',
            proPic:'data:image/jpeg;base64,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'           
        }
        this.changePic = this.changePic.bind(this);
    }
    
    componentDidMount(){
        // const {userId, userName} = this.props;
        // this.setState({userId:userId, userName:userName})
        let {userId} = this.state;
        axios.get(`/api/profile/${userId}`)
            .then(res=>{
            const {username, bio, url } = res.data;
            this.setState({userName:username, bio:bio, url:url})   
        } );   
    }
    

    changePic(val){
        this.setState({proPic:val})
        this.props.updateProfilePic(val)
    }
    
    render(){
        return(
            <div>
                <ProfileCard 
                    userName={this.state.userName}
                    changePic ={this.changePic}
                    bio={this.state.bio}
                    proPic={this.state.proPic}
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
