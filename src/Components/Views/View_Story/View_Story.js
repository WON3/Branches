import React, { Component } from 'react';
import axios from 'axios';
import './View_Story.css';
import RenderCont from './RenderCont';
import Readview from './Readview';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import LoadingIcon from '../LoadingIcon/LoadingIcon';
import Switch from '@material-ui/core/Switch';
import { connect } from 'react-redux';
import { getUser } from '../../../ducks/reducer';



class ViewStory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contribution: {},
            open: false,
            checkedA: true,
            checkedB: true,
            userId: '',
            isReaderViewEnabled: false
        }
    }

    componentDidMount() {
        setTimeout(() => {
            debugger
            this.setState({
                isReaderViewEnabled: true
            })
        }, 3 * 1000)
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
            .catch(err => console.log('axios create error', err))
    }



    render() {
        if (!this.state.contribution.story) {
            return <div className="load">
                <LoadingIcon />
            </div>
        }

        const contributions = this.state.contribution.contributions.map((contribution) => <RenderCont contribution={contribution} />)
        const contribution = this.state.contribution.contributions.map((contribution) => <Readview contribution={contribution} />)
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
                </div>
            )
        } else {
            return (
                <div className="body">

                    <div style={{ textAlign: "center" }} className="head">
                        <h1>{this.state.contribution.story.title}</h1>
                        <p style={this.state.isReaderViewEnabled ? { display: "none" } : { display: "block" }}>~~~~~Preface~~~~~</p>
                        <h3 style={this.state.isReaderViewEnabled ? { display: "none" } : { display: "block" }}>{this.state.contribution.story.description}</h3>
                        <Switch defaultChecked value="checkedF" color="default" checked={this.state.checkedA}
                            onChange={this.handleChange('checkedA')}
                            value="checkedA" />
                        <p style={this.state.isReaderViewEnabled ? { display: "none" } : { display: "block" }}>Reader View</p>
                    </div>

                    <div className="contribution">{contribution}</div>
                    <div className="butt">
                        <Link to={`/dashboard`}>
                            <Button size="large">Home</Button>
                        </Link>
                        {isUserLoggedIn}
                    </div>
                </div>
            )
        }
    }
}


function mapStateToProps(state) {
    const { userId } = state;
    return {
        userId
    }
}

export default connect(mapStateToProps, { getUser })(ViewStory);