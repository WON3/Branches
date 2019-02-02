import React, { Component } from 'react';
import ProfileCard from './ProfileCard';
import { connect } from 'react-redux';
import { updateProfilePic, updateBio } from '../../../ducks/reducer';
import axios from 'axios';
import ErrorModal from '../ErrorModal/ErrorModal';
import { debug } from 'util';

class User extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userId: '',
            userName: '',
            bio: '',
            proPic: '',
            stories: [],
            serverErrorMessage: ''
        }
        this.changePic = this.changePic.bind(this);
        this.changeBio = this.changeBio.bind(this);
    }


    componentDidMount(){
        const {userName, userId} = this.props;
        this.setState({proPic:`https://robohash.org/${userId}?set=set4`})
        this.setState({userName:userName, userId:userId})
        axios.get(`/user/profile/${userId}`)
        .then(res=>{
            const {username, bio, stories } = res.data;
            this.setState({userName:username, bio:bio, stories:stories}) 
            return axios.get(`/user/profilePic/${userId}`)  
        })
        .then(res => {
                if(!res.data[0]){
                   this.setState({proPic:`https://robohash.org/${userId}?set=set4`})    

                }
                this.setState({ proPic: res.data[0]['url'] })
            })

        .catch(err=>{
            this.setState({serverErrorMessage:' Server error'})
        }); 
    } 


    changePic(val) {
        this.setState({ proPic: val });
        this.props.updateProfilePic(val);
        const {userId} = this.state;
        axios.put(`/user/profilePic/${userId}`, {url:val})
        .then(res => {   
        })
        .catch(err=>{
            this.setState({serverErrorMessage:' Server error'})
        })

    };

    changeBio(val) {
        const userId = this.state.userId;
        this.setState({ bio: val });
        this.props.updateBio(val);
        axios.put(`/user/bio/${userId}?bio=${val}`)
            .then(res=>{
        }).catch(err=>{
            this.setState({serverErrorMessage:' Server error'})
        })
    };

    render() {
        let errorMessage = this.state.serverErrorMessage && <ErrorModal error={this.state.serverErrorMessage} />
        return (
            <div>
                <ProfileCard
                    userName={this.state.userName}
                    changePic={this.changePic}
                    bio={this.state.bio}
                    changeBio={this.changeBio}
                    proPic={this.state.proPic}
                    stories={this.state.stories}
                />
                {errorMessage}
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { userId, userName } = state;
    return {
        userId,
        userName
    }
}
export default connect(mapStateToProps, { updateProfilePic, updateBio })(User);
