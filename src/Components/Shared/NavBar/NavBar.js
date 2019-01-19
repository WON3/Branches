import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import {connect} from 'react-redux';
import {makeOpenClose} from '../../../ducks/reducer';
import { Link } from "react-router-dom";
import './NavBar.css'

 const drawerWidth = 240;
 const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {

    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
   
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
});
 class NavBar extends React.Component {
   render() {
    const authenticatedList = [
        {name: "Dashboard", path: "/", shouldShow: true},
        {name: "My Profile", path: "/user", shouldShow: this.props.userId ? true : false},
        {name: "Login", path: "/Login", shouldShow: !this.props.userId ? true : false},
        {name: "Create Story", path: "/create_one", shouldShow: this.props.userId ? true : false},
        {name: "Logout"}
    ];   
    
        
    const { classes, theme, openClose } = this.props;
    // console.log(this.props.makeOpenClose);
    const authenticatedListComponents = authenticatedList.filter(e=>e.shouldShow).map((item)=>{
        return <Link to={item.path} key={item.name}><ListItem>{item.name}</ListItem></Link>
    })
     return (
      <div className={classes.root}>
      
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={openClose}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton padding-bottom='35px' onClick= {()=>this.props.makeOpenClose(this.props.openClose)}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <List>
          {authenticatedListComponents}
          </List>
        </Drawer>
      </div>
    );
  }
}
 NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};
const mapStateToProps = state=>{return {openClose: state.openClose, userId: state.userId}};

 const StyleComp = withStyles(styles, { withTheme: true })(NavBar);

 const ConnectedComponent = connect(mapStateToProps, {makeOpenClose})(StyleComp);

  export default ConnectedComponent;
