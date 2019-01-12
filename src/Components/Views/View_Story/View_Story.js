import React, { Component } from 'react';
import axios from 'axios';
import './View_Story.css';
import RenderCont from './RenderCont';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import LoadingIcon from '../LoadingIcon/LoadingIcon'


class ViewStory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contribution: {},
            open: false
        }
    }
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
                {/* <LoadingIcon /> */}
                LOADING!!!
            </div>
        }

        const contributions = this.state.contribution.contributions.map((contribution) => <RenderCont contribution={contribution} />)
        const lastContribution = this.state.contribution.contributions[this.state.contribution.contributions.length - 1]
        const prior_contributions_id = lastContribution ? lastContribution.id : 0

        return (
            <div className="body">
                <div style={{ textAlign: "center", padding: "10px" }} className="head">
                    <h1>{this.state.contribution.story.title}</h1>
                    <p>~~~~~Preface~~~~~</p>
                    <h3>{this.state.contribution.story.description}</h3>
                </div>
                <div className="contribution">{contributions}</div>
                <div className="butt">
                    <Link to={`/dashboard`}>
                        <Button size="large">Home</Button>
                    </Link>
                    <Link to={`/contribute/${this.props.match.params.story_id}/${prior_contributions_id}`}>
                        <Button size="large">Create Contribution</Button>
                    </Link>
                </div>
            </div>
        )
    }
}

export default ViewStory;