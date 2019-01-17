import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {connect} from 'react-redux';
import ButtonMode from './ButtonMode';
import './userStyles.css';

const styles = theme => ({
  root: {
      marginTop:75,
      height: '87vh',
      overflow:'scroll',
      flexGrow:1 ,
      alignSelf: 'center',
      color: '#EAFBF7'
  },
  background: {
    background: '#EAFBF7',
    padding: 5
  },
  bio: {
    height: '58vh',
    boxSizing: 'border-box',
    textAlign:'jusitify',
    width: 200
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
    color: '#378674'
    
  },
  card: {
      maxWidth: 850,
      width: 'auto',
      height: '102%',
      marginTop:20,
      marginLeft: 30,
      padding:theme.spacing.unit*2, 
      display: 'flex',
      justify: 'space-around',
      color: '#378674'     
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
    width: '75%',
    color: '#378674' 
  },
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
  const { stories } = this.props;
  // let storyShow = stories.map((story,id) => {
  //   return(
  //     <div key={story.story_id}>
  //       <h3>{story.title}</h3>
  //       <ul className={classes.background}>
  //         <li style={{wordWrap: 'break-word'}}>{story.description}</li>
  //         <li>{story.is_complete}</li>
  //       </ul>  
  //     </div>
  //   )
  // });

  return (  
    <div className={classes.root}>
        <div className={classes.itemBio}>
        <Card className={classes.card}>
          <div>
            <div className='profile'>
              <CardMedia
                className={classes.media}
                image={this.props.proPic}
                title={this.props.userName}
                />
                <ButtonMode 
                label='URL'
                placeHolder='Picture URL'
                change={this.handlePicture}
                rows='1'
              />
            </div> 
              
            <div className={classes.titles}>
               <h3>{this.props.userName}</h3>
            </div>
            <div className={classes.titles}>
            <h3>Bio</h3>
            <div className={classes.background}>
              <div className={classes.bio} >
                {this.props.bio}
                <ButtonMode 
                    label='Bio'
                    placeHolder='Tell us about you.'
                    change={this.handleBio}
                    rows='4'
                  />
              </div>
            </div> 
            </div>
              <div className={classes.buttonHolder}>
                
              </div>  
          </div>
          <div className='contributionBox'>
              <div className={classes.titles}>
                  <h3>Your stories</h3>
               </div>
              <div className='contributions'>
                <ul>
                  {/* {storyShow} */}
                </ul>
              </div>
          </div>
        </Card>
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
};
  
function mapStateToProps(state){
  const {userId, profilePic} = state;
  return {
    userId,
    profilePic      
  }
};

export default connect(mapStateToProps,{})(withStyles(styles)(UserCard));
