import React, { Component } from 'react';
import axios from 'axios';
import './View_Story.css';
import RenderCont from './RenderCont'


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
        axios.get(`/api/contributions/${story_id}`)
            .then((res) =>
                this.setState({ contribution: res.data })
            )
            .catch(err => console.log('axios create error', err))
    }

    render() {
        if (!this.state.contribution.story) {
            return <div>Loading</div>
        }

        const contributions = this.state.contribution.contributions.map((contribution) => <RenderCont contribution={contribution} />)

        return (
            <div className="body">
                <div style={{textAlign:"center", padding:"10px"}} className="head">
                    <h1>{this.state.contribution.story.title}</h1>
                    <p>~~~~~Preface~~~~~</p>
                    <h3>{this.state.contribution.story.description}</h3>
                </div>
                <div>{contributions}</div>
            </div>
        )
    }
}
 export default ViewStory;