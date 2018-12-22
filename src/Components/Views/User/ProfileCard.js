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
      super(props);
      this.state = { 
        open: false,
        tempPro:'',
        default:'data:image/png;base64,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'
      };
      
      this.handleOpen = this.handleOpen.bind(this);
      this.handleClose = this.handleClose.bind(this);
      this.handlePicture = this.handlePicture.bind(this);

    }
    

    // componentDidMount(){
    //   const {userId} = this.props;
    //   axios.get(`/api/profile/${userId}`).then(res=>{
    //     console.log(res.data)
    //     let {profilePic} = res.data[0];
    //     this.setState({profilePic})
    //   })
    // }
    
  
    handlePicture(){
      debugger
      let {tempPro} = this.state;
      this.props.changePic(tempPro);
    }

    handlePictureURL(val){
      this.setState({tempPro:val})
    }

    handleOpen(){
          this.setState({ 
          open: true 
        });
    };

    handleClose(){
        this.setState({ 
            open: false 
        });
    };
    

    render() {
      const { classes, profilePic } = this.props;
      let url = !profilePic ? this.state.default:profilePic;

      return (  
      <div className={classes.rootD}>
        <Grid container>
          <Grid className={classes.itemFix} >
          <Card className={classes.card}>
           <CardMedia
            className={classes.media}
            image={url}
            title={this.props.userName}
            />
            <div>
              <Button 
                className={classes.button}
                onClick={this.handleOpen}
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