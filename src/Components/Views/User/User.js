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
    componentWillMount(){
        const {userId} = this.props;
        axios.get(`/api/profilePic/${userId}`).then(res => {
            this.setState({proPic:res.data[0]['url']})
                       
        })
    };

    componentDidMount(){
        const {userName,userId} = this.props;
        this.setState({userName:userName, userId:userId})
        axios.get(`/api/profile/${userId}`)
            .then(res=>{
            const {username, bio, stories } = res.data;
            this.setState({userName:username, bio:bio, stories:stories})   
        });
          
    };
    
    changePic (val) {
        this.setState({proPic:val});
        this.props.updateProfilePic(val);
        const {userId} = this.state;
        axios.put(`/api/profilePic/${userId}`, {url:val}).then(res => {
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
