import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import ButtonMode from './ButtonMode';

const styles = theme => ({
  rootD: {
      flexGrow:1,
      marginTop:75,
      height: '87vh',
      overflow:'scroll',
  },
  container: {
    height: 'fill',
  },
  background: {
    background: '#EAFBF7',
  },
  bio: {
    height: 140,
    boxSizing: 'border-box',
    textAlign:'jusitify'
  },
  button: {
    background:'#378674',
    marginTop: 5,
    marginLeft: '62.3%',
  }, 
  itemFix: {
    height:'80vh',
    height: '-webkit-fill-available',
    margin: 'auto',
    width: '-webkit-fill-available',
    maxWidth: '40%'
  },
  card: {
      maxWidth: 1100,
      width: 'auto',
      height: '98%',
      marginTop:25,
      margin: '4%',
      marginLeft: 30,
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
    titles: {
      textAlign: 'center',
      alignSelf: 'center',
      fontFamily: 'Slabo'
    }
  });
  
  class UserCard extends Component {
    constructor(props){
        super(props);
        this.state = {
          tempPro:'',
          open: false,
          openTwo: false,
          profilePicture:''
        }
       
        this.handlePicture = this.handlePicture.bind(this);
        this.handleBio = this.handleBio.bind(this);
      }
      
    
        
    handlePicture(val){
      this.props.changePic(val);
      this.setState({open:false});
    };

    handleBio(val){
      this.props.changeBio(val)
      this.setState({openTwo:false});
    };

    
    
    render() {
      const { classes } = this.props;
      const {stories} = this.props;
      let storyShow = stories.map((story,id) => {
        return(
          <div key={story.story_id}>
              <h3>{story.title}</h3>
              <ul className={classes.background}>
                <li>{story.description}</li>
                <li>{story.is_complete}</li>
              </ul>  
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
                <ButtonMode 
                  label='URL'
                  placeHolder='Picture URL'
                  change={this.handlePicture}
                  rows='1'
                />
              </div>
              <CardHeader
                className={classes.titles}
                title={this.props.userName}
                subheader="Somewhere"
                />
              <CardHeader className={classes.titles} title='Bio' />
              <CardContent className={classes.background}>
                <Typography className={classes.bio} paragraph>
                  {this.props.bio}
                </Typography>
              </CardContent> 
              <div>
                <ButtonMode 
                    label='Bio'
                    placeHolder='Tell us about you.'
                    change={this.handleBio}
                    rows='4'
                  />
               
            </div>
            </Card>
          </Grid>
          <Grid className={classes.itemFixT}>
            <Card className={classes.card}>
            <CardContent>
                <CardHeader 
                  className={classes.titles}
                  title='Works'/>
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
    changePic: PropTypes.string,
    bio: PropTypes.string,
    changeBio: PropTypes.func,
    proPic: PropTypes.string,
    stories: PropTypes.array
  }
  
  function mapStateToProps(state){
    const {userId, profilePic} = state;
    return {
      userId,
      profilePic      
    }
  }

  export default connect(mapStateToProps,{})(withStyles(styles)(UserCard));
