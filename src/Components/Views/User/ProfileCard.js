import React, {Component} from 'react';
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
import Input from '@material-ui/core/Input';

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
      maxWidth: 1100,
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
  
  class UserCard extends Component {
    constructor(props){
        super(props);
        this.state = {
          tempPro:'',
          open: false,
          profilePicture:''
        }
        this.modalOpen = this.modalOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handlePicture = this.handlePicture.bind(this);
        this.handlePictureURL = this.handlePictureURL.bind(this);
      }
      
    

    // componentDidMount(){
    //   const {userId, profilePic} = this.props;
    //   this.setState({profilePicture:profilePic});
    //   // axios.get(`/api/profile/${userId}`).then(res=>{
        
    //   //   let {profilePic} = res.data[0];
    //   //   this.setState({profilePic})
    //   // })
    // }

    
    handlePicture(){
      debugger
      let {tempPro} = this.state;
      this.props.changePic(tempPro);
      this.setState({open:false});
    };

    handlePictureURL(val){
       this.setState({tempPro:val})
    };  

    handleClose(){
        this.setState({open: false});
    };
    modalOpen(){
      this.setState({open:true});
    };
    
    render() {
      const { classes } = this.props;
      const {stories} = this.props;
      let storyShow = stories.map((story,id) => {
        return(
          <div value={story.story_id}>
              <h3>{story.title}</h3>
              <li>{story.description}</li>
              <li>{story.is_complete}</li>
          </div>
        )
      });

      return (  
      <div className={classes.rootD}>
        <Grid container>
          <Grid className={classes.itemFix} >
          <Card className={classes.card}>
           <CardMedia
            className={classes.media}
            image={this.props.proPic}
            title={this.props.userName}
            />
            <div>
              <Button 
                className={classes.button}
                onClick={this.modalOpen}
                >Change pic
              </Button>
              <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={this.state.open}
                onClose={this.handleClose}
                >
                  <div className={classes.paper}>
                    <Input
                      onChange={(e)=>{this.handlePictureURL(e.target.value)}}
                      placeholder="New picture url"
                      className={classes.input}
                      inputProps={{
                        'aria-label': 'Description',
                      }}></Input>
                      <Button 
                        onClick={this.handlePicture}
                        className={classes.button} 
                        color="secondary">Submit</Button>                  
                  </div>
              </Modal>
            </div>       
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
                  <ul>
                    {storyShow}
                  </ul>
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