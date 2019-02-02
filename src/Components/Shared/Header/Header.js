import React, { Component } from "react";
import "./Header.css";
import { connect } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import * as actions from "../../../ducks/reducer";
import { Link } from "react-router-dom";
import axios from "axios";
const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
});

class Header extends Component {
  constructor(props) {
    super(props);
    this.state ={
      serverErrorMessage:''
    }
    this.handleLogout = this.handleLogout.bind(this);
  }
  handleLogout() {
    axios.post("/user/logout")
    .then(() => {
      this.props.logout();
    })
    .catch(err =>{
      this.setState({serverErrorMessage:' Server error'})
    });;
  }
  render() {
    const { classes, userName } = this.props;
    const loggedInButton =
      userName !== "" ? (
        <div className="profile-button">
          Hello, <Link to="/user">{userName.toUpperCase()}</Link>
          <br />
          <span onClick={this.handleLogout}
         >Logout</span>
        </div>
      ) : (
        <Link className="profile-button" to="/Login">
          Login
        </Link>
      );
    return (
      <div style={this.props.isReadView ? {display:"none"}:{display:"block"}}>
        {" "}
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: this.props.openClose
          })}
        >
          <Toolbar
            className="header-inner-container"
            disableGutters={!this.props.openClose}
          >
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={() => {
                this.props.makeOpenClose(this.props.openClose);
              }}
              className={classNames(
                classes.menuButton,
                this.props.openClose && classes.hide
              )}
            >
              <MenuIcon />
            </IconButton>
            <div>Branches</div>
            <div>{loggedInButton}</div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
Header.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default connect(
  state => state,
  actions
)(withStyles(styles, { withTheme: true })(Header));
