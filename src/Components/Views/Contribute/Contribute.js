import React from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './Contribute.css'
import { Link } from 'react-router-dom';
import ErrorModal from '../ErrorModal/ErrorModal';

class Contribute extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: 0,
            contribution: "",
            is_accepted: false,
            multiline: 'Controlled',
            prior_contribution: {},
            serverErrorMessage:'' 
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        axios.get(`/contributions/last_contribution/${this.props.match.params.prior_contribution_id}`)
        .then((res)=>{
            this.setState({
                prior_contribution: res.data
            })
        })
        .catch(err =>{
            let er = err.respons.data.message;
            this.setState({serverErrorMessage:er})
          });
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

            
            axios.post('/contributions', contributions)
            .then(res => {
                this.props.history.push(`/view_story/${this.props.match.params.story_id}`)
            })
            .catch(err =>{
                let er = err.respons.data.message;
                this.setState({serverErrorMessage:er})
              });

        } else {
            console.log('Put something in the field!!')
        }
    }
    

    render() {
        let errorMessage = this.state.serverErrorMessage && <ErrorModal error = {this.state.serverErrorMessage}/>       
        return (
            <div className="contribute">
                <form noValidate autoComplete="off">
                    <h1 className="add">Add contribution</h1>
                    <h3 className="prior">
                       ~ Branch off the last contribution ~
                       <p>{this.state.prior_contribution.contribution}</p>
                    </h3>
                    <TextField
                        value={this.state.contribution}
                        id="outlined-multiline-flexible"
                        label="Continue the story here!"
                        multiline
                        rowsMax="4"
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleChange} />
                    <div className="butt">
                        <Link style={{ textDecoration: "none" }} to={`/view_story/${this.props.match.params.story_id}`}>
                            <Button size="large" style={{ width: "125px", textDecoration: "none" }}>Go Back To Story</Button>
                        </Link>
                        <Button type="submit" style={{ margin: "auto" }} size="large" color="default" onClick={this.handleSubmit}>Submit Contribution</Button>
                    </div>
                </form>
                {errorMessage}
            </div>
        )
    }
}

export default Contribute;