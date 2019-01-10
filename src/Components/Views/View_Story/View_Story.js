import React, { Component } from 'react';
import axios from 'axios';
import './View_Story.css';
import RenderCont from './RenderCont';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';


class ViewStory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contribution: {},
            open: false
        }
        this.reset = this.reset.bind(this)
    }
    handleTooltipClose = () => {
        this.setState({ open: false });
    };


    handleTooltipOpen = () => {
        this.setState({ open: true });
    };
    componentDidMount() {
        const { story_id } = this.props.match.params
        axios.get(`/api/contributions/${story_id}`)
            .then((res) =>
                this.setState({ contribution: res.data }),
                this.reset()
            )
            .catch(err => console.log('axios create error', err))
    }

    reset(){
        this.setState({
            contribution: ''
        })
    }

    render() {
        if (!this.state.contribution.story) {
            return <div>Loading</div>
        }

        const contributions = this.state.contribution.contributions.map((contribution) => <RenderCont contribution={contribution} />)
        const prior_contributions_id = this.state.contribution.contributions[this.state.contribution.contributions.length - 1].id
        return (
            <div className="body">
                <div style={{ textAlign: "center", padding: "10px" }} className="head">
                    <h1>{this.state.contribution.story.title}</h1>
                    <p>~~~~~Preface~~~~~</p>
                    <h3>{this.state.contribution.story.description}</h3>
                </div>
                <div>{contributions}</div>
                <div className="butt">
                    <Link to={`/contribute/${this.props.match.params.story_id}/${prior_contributions_id}`}>
                        <Button>Create Contribution</Button>
                    </Link>
                </div>
            </div>
        )
    }
}

export default ViewStory;