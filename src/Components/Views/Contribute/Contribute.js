import React from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import './Contribute.css'

class Contribute extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: 0,
            contribution: "",
            is_accepted: false,
            multiline: 'Controlled'
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
        this.setState({
            contribution: e.target.value,
        })
    }
    handleSubmit(e) {
        e.preventDefault();
        let { user_id, contribution, is_accepted } = this.state;
        if (contribution) {
            let contributions = {
                user_id,
                story_id: this.props.match.params.story_id,
                contribution,
                is_accepted,
                prior_contribution_id: this.props.match.params.prior_contribution_id
            }
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
        const { classes } = this.props;
        return (
            <div className="contribute">
                <form noValidate autoComplete="off">
                    <h1 className="add">Add contribution</h1>
                    <TextField id="outlined-multiline-flexible"
                        label="Continue the story here!"
                        multiline
                        rowsMax="4"
                        margin="normal"
                        variant="outlined" 
                        onChange={this.handleChange} />
                    <Button style={{ margin: "auto" }} size="large" color="default" onClick={this.handleSubmit}>Submit Contribution</Button>
                </form>
            </div>
        )
    }
}

export default Contribute;