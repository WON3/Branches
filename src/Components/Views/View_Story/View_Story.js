import React, { Component } from 'react';
import axios from 'axios';
import './View_Story.css';
import RenderCont from './RenderCont';
import ReadView from './Readview';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import LoadingIcon from '../LoadingIcon/LoadingIcon';
import Switch from '@material-ui/core/Switch';
import { connect } from 'react-redux';
import * as Actions from '../../../ducks/reducer';
import ErrorModal from '../ErrorModal/ErrorModal';
import { storyBuilder } from './services/pageBuilder'
import Icons from '@material-ui/icons/Visibility'



class ViewStory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contribution: {},
            open: false,
            checkedA: true,
            checkedB: true,
            userId: '',
            serverErrorMessage: '',
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

    handleReadviewEnable = () => {
        this.props.toggleReadview(this.props.isReadView);
        this.setState({
            isReaderViewEnabled: !this.state.isReaderViewEnabled
        })
    }

    componentDidMount() {
        const { story_id } = this.props.match.params
        axios.get(`/contributions/${story_id}`)
            .then((res) =>
                this.setState({ contribution: res.data }),
            )
            .catch(err =>{
                this.setState({serverErrorMessage: ' Server error'})
            })
        }, 3 * 1000)
    }



    render() {
        let errorMessage = this.state.serverErrorMessage && <ErrorModal error={this.state.serverErrorMessage} />
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
                <div className="read-view-er">

                    <div className="head">
                        <div className="header">
                            <div style={{ margin: "auto 0px" }}>
                                {this.state.contribution.story.title} {" "}
                            </div>
                            <div className="headerRight">
                                    <Switch defaultChecked value="checkedF" color="default" checked={this.state.checkedA}
                                        onChange={this.handleChange('checkedA')}
                                        value="checkedA" />
                                <i style={{ margin: "auto" }} onClick={this.handleReadviewEnable} class="material-icons">{!this.state.isReaderViewEnabled ? `visibility` : `visibility_off`}</i>
                            </div>
                        </div>
                    </div>

                    <div className="afterHeader">
                        <div style={{ textAlign: "center" }}>
                            <p>~Preface~</p>
                        </div>
                        <h3>{this.state.contribution.story.description}</h3>
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

                    <div style={{ textAlign: "left" }} className="read-view-container">
                        <div className="read-view-title">
                            <div style={{ margin: "auto 0" }}>
                                {this.state.contribution.story.title} {" "}
                            </div>
                            <div className="headerRight">
                                <div style={this.state.isReaderViewEnabled ? { opacity: "0" } : { opacity: "1" }} className="switch">
                                    <Switch defaultChecked value="checkedF" color="default" checked={this.state.checkedA}
                                        onChange={this.handleChange('checkedA')}
                                        value="checkedA" />
                                </div>
                                <i style={{ margin: "auto" }} onClick={this.handleReadviewEnable} class="material-icons">{!this.state.isReaderViewEnabled ? `visibility` : `visibility_off`}</i>
                            </div>
                        </div>
                        <div>
                            <div style={this.state.isReaderViewEnabled ? { display: "none" } : { display: "block" }}>
                                <h3 style={this.state.isReaderViewEnabled ? { display: "none" } : { display: "block" }}>{this.state.contribution.story.description}</h3>
                            </div>
                            <ReadView pages={storyBuilder(this.state.contribution.contributions, 270)} />
                        </div>
                        <div className="butt" style={this.state.isReaderViewEnabled ? { display: "none" } : { display: "block" }}>
                            <Link to={`/dashboard`}>
                                <Button size="large">Home</Button>
                            </Link>
                            {isUserLoggedIn}
                        </div>
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
        }
    }
}





export default connect(state => state, Actions)(ViewStory);