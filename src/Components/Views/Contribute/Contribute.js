import React from 'react';
import ContributionCard from './ContributionCard'
// import { setPriority } from 'os';
import axios from 'axios';

class Contribute extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contribution: []
        }
    }

    // console.log(params)
    componentDidMount() {
        // const {story_id} = this.props.match.params.story_id
        console.log(this.props)
        debugger
        // axios.get(`/api/contributions`)
        // .then((res) =>
        //         this.setState({ contribution: res.data })
        //     )
        //     .catch(err => console.log('axios create error', err))
    }

    render() {
        let contributionCard = this.state.contribution.push((contribution) => {
            return <ContributionCard    
            key={contribution.id} 
            title={contribution.title} 
            description={contribution.description} 
            contribution={contribution.contribution} />
        })
        return (
            <div>
                {contributionCard}
            </div>
        )
    }
}

export default Contribute;