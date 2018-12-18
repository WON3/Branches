import React, { Component } from 'react';
import './Contribute.css'



export default class ContributionCard extends Component {

    render() {
        return (
            <div className="cc">
                <div className="card">
                    <h1>{this.props.title}</h1>
                    <p>
                        {this.props.description}
                    </p>
                    <p>
                        {this.props.contribution}
                    </p>
                </div>
            </div>
        )
    }
}