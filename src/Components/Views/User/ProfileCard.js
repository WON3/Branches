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
  root: {
      marginTop:75,
      height: '87vh',
      overflow:'scroll',
      flexGrow:1 ,
      alignSelf: 'center'
  },
  cardHolder : {
    display: 'flex',
    flexDirection:'row',
    maxWidth: '850px',
    margin: 'auto',
    flexWrap:'wrap',
  },
  background: {
    background: '#EAFBF7',
    padding: 5
  },
  bio: {
    height: 140,
    boxSizing: 'border-box',
    textAlign:'jusitify'
  },
  button: {
    background:'#378674',
    marginTop: 5,
    margin: 'auto',
    
  }, 
  itemBio: {
    height: 'auto',
    width: 850,
    minWidth: 500,
    margin: 'auto',
    
  },
  card: {
      maxWidth: 850,
      width: 'auto',
      height: '102%',
      marginTop:20,
      marginLeft: 30,
      padding:theme.spacing.unit*2, 
      display: 'flex',
      justify: 'space-around'     
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
      fontFamily: 'Slabo',
      width: '75%'
    },
    works: {
      width: '75%',
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
                <li style={{wordWrap: 'break-word'}}>{story.description}</li>
                <li>{story.is_complete}</li>
              </ul>  
          </div>
        )
      });

      return (  
      <div className={classes.root}>
        <div className={classes.cardHolder}>
         <Grid className={classes.itemBio}>
          <Card className={classes.card}>
              
              <div>
              <CardMedia
                className={classes.media}
                image={this.props.proPic}
                title={this.props.userName}
                />
              <div className={classes.buttonHolder}>
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
              <div className={classes.buttonHolder}>
                <ButtonMode 
                    label='Bio'
                    placeHolder='Tell us about you.'
                    change={this.handleBio}
                    rows='4'
                  />
                </div>  


            </div>
            <div className={classes.works}>
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
            </div>
            </Card>
          </Grid>
          </div> 
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
