import React, { Component } from 'react';
import axios from 'axios';
import './View_Story.css';
import RenderCont from './RenderCont';
import ReadView from './Readview';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import LoadingIcon from '../LoadingIcon/LoadingIcon';
import Switch from '@material-ui/core/Switch';
import {connect} from 'react-redux';
import * as Actions from '../../../ducks/reducer';
import ErrorModal from '../ErrorModal/ErrorModal';
import {storyBuilder} from './services/pageBuilder'



class ViewStory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contribution: {},
            open: false,
            checkedA: true,
            checkedB: true,
            userId: '',
            serverErrorMessage:'',
            isReaderViewEnabled: false

        }
    }



    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    handleTooltipClose = () => {
        this.setState({ open: false });
    };


    handleTooltipOpen = () => {
        this.setState({ open: true });
    };
    componentDidMount() {
        const { story_id } = this.props.match.params
        axios.get(`/contributions/${story_id}`)
            .then((res) =>
                this.setState({ contribution: res.data }),
            )
            .catch(err =>{
                let er = err.response.data.message;
                this.setState({serverErrorMessage: er})
            })
            setTimeout(() => {
                this.props.toggleReadview(this.props.isReadView)
                this.setState({
                    isReaderViewEnabled: true
                })
            }, 3 * 1000)
    }



    render() {
        let errorMessage = this.state.serverErrorMessage && <ErrorModal error = {this.state.serverErrorMessage}/>       
        if (!this.state.contribution.story) {
            return <div className="load">
                <LoadingIcon />
            </div>
        }

        const contributions = this.state.contribution.contributions.map((contribution) => <RenderCont contribution={contribution} />)
        const lastContribution = this.state.contribution.contributions.reduce((object, element) => {
            if (element.id > object.id) {
                object = element
            }
            return object
        }, { id: 0 })
        const prior_contributions_id = lastContribution ? lastContribution.id : 0;
        const isUserLoggedIn = this.props.userId ? <Link to={`/contribute/${this.props.match.params.story_id}/${prior_contributions_id}`}><Button size="large">Create Contribution</Button></Link> : ''

        if (!this.state.checkedA) {
            return (
                <div className="body">

                    <div style={{ textAlign: "center", padding: "10px" }} className="head">
                        <h1>{this.state.contribution.story.title}</h1>
                        <p>~~~~~Preface~~~~~</p>
                        <h3>{this.state.contribution.story.description}</h3>
                        <Switch defaultChecked value="checkedF" color="default" checked={this.state.checkedA}
                            onChange={this.handleChange('checkedA')}
                            value="checkedA" />
                        <p>User View</p>
                    </div>
                    <div className="contribution">{contributions}</div>

                    <div className="butt">
                        <Link to={`/dashboard`}>
                            <Button size="large">Home</Button>
                        </Link>
                        {isUserLoggedIn}
                    </div>
                    {errorMessage}
                </div>
            )
        } else {
            return (
                <div className="read-view-main">
                    <Switch defaultChecked value="checkedF" color="default" checked={this.state.checkedA}
                        onChange={this.handleChange('checkedA')}
                        value="checkedA" />

                    <div style={{ textAlign: "left" }} className="read-view-container">
                        <div className="read-view-title">
                            {this.state.contribution.story.title} {" "}
                            <Switch defaultChecked value="checkedF" color="default" checked={this.state.checkedA}
                        onChange={this.handleChange('checkedA')}
                        value="checkedA" />
                        <i class="material-icons">
visibility
</i>
                        </div>
                        <div style={this.state.isReaderViewEnabled ? { display: "none" } : { display: "block" }}>
                            <p>~~~~~Preface~~~~~</p>
                            <h3 style={this.state.isReaderViewEnabled ? { display: "none" } : { display: "block" }}>{this.state.contribution.story.description}</h3>
                        </div>
                        <ReadView pages={storyBuilder(this.state.contribution.contributions, 270)} />
                        <div className="butt" style={this.state.isReaderViewEnabled ? { display: "none" } : { display: "block" }}>
                            <Link to={`/dashboard`}>
                                <Button size="large">Home</Button>
                            </Link>
                            {isUserLoggedIn}
                        </div>
                    </div>
                    <div style={{display: "none"}} className="contribution">{contributions}</div>
                    <div style={{display: "none"}} className="butt">
                        <Link to={`/dashboard`}>
                            <Button size="large">Home</Button>
                        </Link>
                        {isUserLoggedIn}
                    </div>
                    {errorMessage}
                </div>
            )
        }
    }
}





export default connect(state => state, Actions)(ViewStory);