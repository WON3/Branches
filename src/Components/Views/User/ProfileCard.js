import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';

const styles = theme => ({
  rootD: {
      flexGrow:1,
      marginTop:75,
      height: '87vh'
  },
  container: {
    height: 'fill',
    
  }, 
    itemFix: {
      height:'80vh',
    },
    itemFixT:{
      height:'80vh',
      width: '82vw'
  },
  card: {
      maxWidth: 1200,
      width: 'auto',
      height: '95%',
      marginTop:10,
      margin: '4%',
      padding:theme.spacing.unit*2,
      
    },
    media: {
      width: 'fill',
      paddingTop: '56.25%', // 16:9
    },
    paper: {
      position: 'absolute',
      top:'35%',
      left:'35%',
      width: theme.spacing.unit * 50,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing.unit * 4,
    },
  });
  
  class UserCard extends React.Component {
    constructor(props){
      super(props)
      this.state = { 
        open: false,
        profilePic:'https://i.pinimg.com/236x/33/fe/73/33fe73c8629b599c835c9d76e360f8bc--daffy-duck-duck-duck.jpg'
      };
    }
    

    componentDidMount(){
      const {userId} = this.props;
      axios.get(`/api/profile/${userId}`).then(res=>{
        console.log(res.data)
        let {profilePic} = res.data[0];
        this.setState({profilePic})
      })
    }
    
    handleClick = event => {
      this.setState({
        anchorEl: event.currentTarget,
      });
    };
  
    handleClose = () => {
      this.setState({
        anchorEl: null,
      });
    };
  
    handlePicture(val){
      this.props.changePic(val);
    }

    handleOpen = () => {
      this.setState({ 
          open: true 
        });
    };

    handleClose = () => {
        this.setState({ 
            open: false 
        });
    };
    

    render() {
      const { classes } = this.props;
      return (  
      <div className={classes.rootD}>
        <Grid container>
          <Grid className={classes.itemFix} >
          <Card className={classes.card}>
           <CardMedia
            className={classes.media}
            image={this.state.profilePic}
            title={this.props.userName}
            onClick={(e)=>{this.handlePicture(e.target.value)}}
          />
          <Button 
            className='openMode'
            onClick={this.handleOpen}
            variant="contained">Change pic
            </Button>
            <Modal
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              open={this.state.open}
              onClose={this.handleClose}
              >
                <div className={classes.paper}>
                  <input>New url or local file...</input>
                </div>
            </Modal>       
          <CardHeader
            title={this.props.userName}
            subheader="Somewhere,somestate"
            />

            <CardHeader title='Bio' />
              <CardContent>
                <Typography paragraph>
                  {this.props.bio}
                </Typography>
              </CardContent>
          </Card>
          </Grid>
          <Grid className={classes.itemFixT}>
            <Card className={classes.card}>
            <CardContent>
                <CardHeader title='Works'/>
                <Typography paragraph>
                  current works go here
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          </Grid>
          </div>
        
      );
    }
  }
  
  UserCard.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  function mapStateToProps(state){
    const {userId, profilePic} = state;
    return {
      userId,
      profilePic      
    }
  }

  export default connect(mapStateToProps,{})(withStyles(styles)(UserCard));