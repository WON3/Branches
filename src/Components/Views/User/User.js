import React, {Component} from 'react';
import ProfileCard from './ProfileCard';
import {connect} from 'react-redux';
import {updateProfilePic, updateBio} from '../../../ducks/reducer';
import axios from 'axios';

class User extends Component{
    constructor(props){
        super(props)
        this.state = {
            userId:'',
            userName:'',
            bio:'',
            proPic:'',
            stories: []
        }
        this.changePic = this.changePic.bind(this);
        this.changeBio = this.changeBio.bind(this);
    }
    
    componentDidMount(){
        const {userName,userId} = this.props;
        this.setState({userName:userName, userId:userId})
        axios.get(`/api/profile/${userId}`)
            .then(res=>{
            const {username, bio, url, stories } = res.data;
            console.log(res.data)
            this.setState({userName:username, bio:bio, url:url, stories:stories})   
        });
          
    };
    
    changePic (val) {
        this.setState({proPic:val});
        this.props.updateProfilePic(val);
        axios.put(`/api/profilePic/${this.state.userId}`).then(res => {
            console.log(res.data);
        })
    };

    changeBio (val) {
        const userId = this.state.userId;
        this.setState({ bio:val });
        this.props.updateBio(val);
        axios.put(`/api/bio/${userId}?bio=${val}`).then(res=>{
            console.log(res.data)
        })
    };
    
    render(){
        return(
            <div>
                <ProfileCard 
                    userName={this.state.userName}
                    changePic ={this.changePic}
                    bio={this.state.bio}
                    changeBio={this.changeBio}
                    proPic={this.state.proPic}
                    stories={this.state.stories}
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
export default connect(mapStateToProps, {updateProfilePic, updateBio})(User);
