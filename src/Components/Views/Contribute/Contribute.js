import React from 'react';
import axios from 'axios';
import './Contribute.css'

class Contribute extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: 1,
            story_id: 1,
            contribution: "",
            is_accepted: false,
            prior_contribution_id: 0
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    handleChange(e) {
        this.setState({
            contribution: e.target.value,
        })
        console.log(this.state.contribution)
    }
    handleSubmit(e) {
        e.preventDefault();
        let { user_id, story_id, contribution, is_accepted, prior_contribution_id } = this.state;
        if (user_id) {
            let contributions = {
                user_id,
                story_id,
                contribution,
                is_accepted,
                prior_contribution_id
            }
            debugger
            axios.post('/api/contribution', contributions)
            .then(res => {
                this.props.addContribution(res.data);
            })
            .catch(err => console.log("ya done fudged up", err))
        } else {
            console.log('Put something in the field!!')
        }
    }


    render() {

        return (
            <div className="contribute">
                <form>
                <span>Add contribution</span>
                <input type="text" value={this.state.contribution} onChange={this.handleChange}/>
                <button onClick={this.handleSubmit}>Submit Contribution</button>
                </form>
            </div>
        )
    }
}

export default Contribute;