import React, { Component } from "react";
import axios from "axios";
import "./Dashboard.css";
import RenderCont from "../View_Story/RenderCont";
import { Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Link } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import ErrorModal from "../ErrorModal/ErrorModal";
import LandingModal from "../Dashboard/LandingModal";
import TextField from "@material-ui/core/TextField";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredStories: [],
      stories: [],
      open: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleKeyPress = event => {
    if (event.key === "Enter") {
      this.login();
    }
  };

  componentDidMount() {
    axios
      .get(`/api/Dashboard`)
      .then(res => {
        const stories = res.data;
        this.setState({ stories });
      })
      .catch(err => {
        this.setState({ serverErrorMessage: " Server error" });
      });
  }

  render() {
    const stories = this.state.filteredStories.map(story => {
      return (
        <Card className="storybox" key={story.story_id}>
          <CardContent>
            <div className="storyname">{story.title}</div>
            <div className="description">{story.description}</div>

            <Link to={`/view_story/${story.story_id}`}>
              <button className="view">View story</button>
            </Link>
            <button className="view">Add to Favorites</button>
          </CardContent>
        </Card>
      );
    });
    return (
      <div className="idk">
        <div className="dashboard">
          {stories}
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left"
            }}
            open={this.state.open}
            autoHideDuration={6000}
            onClose={this.handleClose}
            message={<p>This is your dashboard. Choose your actions wisely!</p>}
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                onClick={this.handleClose}
              >
                <CloseIcon />
              </IconButton>
            ]}
          />
        </div>
        <TextField
          id="outlined-search"
          label="Search field"
          type="search"
          margin="normal"
          variant="outlined"
          onChange={this.handleChange}
          style={{
            backgroundColor: "#EAFBF7",
            color: "#378674",
            borderRadius: 5,
            fontFamily: "sans-serif",
            fontSize: 50,
            fontWeight: 700
          }}
        />
        <h3 className="storydash">Stories Dashboard</h3>
      </div>
    );
  }
}
export default Dashboard;
