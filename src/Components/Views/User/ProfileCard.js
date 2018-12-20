import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ImageAvatars from './ImageAvatars';
import axios from 'axios';
import {connect} from 'react-redux';

const styles = theme => ({
    card: {
      maxWidth: 400,
      marginTop: 85,
      width: 400,
      
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    actions: {
      display: 'flex',
    },
    expand: {
      transform: 'rotate(0deg)',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
      marginLeft: 'auto',
      [theme.breakpoints.up('sm')]: {
        marginRight: -8,
      },
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  });
  
  class UserCard extends React.Component {
    state = { 
      expanded: false,
      profilePic:'https://i.pinimg.com/236x/33/fe/73/33fe73c8629b599c835c9d76e360f8bc--daffy-duck-duck-duck.jpg'
    };

    componentDidMount(){
      const {userId} = this.props;
      axios.get(`/api/profile/${userId}`).then(res=>{
        console.log(res.data)
        let {profilePic} = res.data[0];
        this.setState({profilePic})
      })
    }
    
    handleExpandClick = () => {
      this.setState(state => ({ expanded: !state.expanded }));
    };
  
    render() {
      const { classes } = this.props;
  
      return (
        <Card className={classes.card}>
        <ImageAvatars
        profilePic={this.state.profilePic} />
          <CardHeader
            avatar={
              <ImageAvatars 
                aria-label="Recipe" 
                className={classes.avatar}
                profilePic={this.state.profilePic}
                >
                {this.props.name}
              </ImageAvatars>
              
            }
            action={
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            }
            title="Users name/username ..."
            subheader="Somewhere,somestate"
          />
          <CardMedia
            className={classes.media}
            image="/static/images/cards/paella.jpg"
            title="Paella dish"
          />
          <CardActions className={classes.actions} disableActionSpacing>
            <IconButton aria-label="Add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="Share">
              <ShareIcon />
            </IconButton>
            <IconButton
              className={classnames(classes.expand, {
                [classes.expandOpen]: this.state.expanded,
              })}
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="Show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>Method:</Typography>
              <Typography paragraph>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae amet, aliquid nulla 
                repellendus dolores adipisci nihil doloremque. Voluptates id velit ab itaque ipsam laboriosam, 
                repudiandae, quae sint sed natus omnis.
              </Typography>
              <Typography paragraph>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae amet, aliquid nulla
                repellendus dolores adipisci nihil doloremque. Voluptates id velit ab itaque ipsam laboriosam, 
                repudiandae, quae sint sed natus omnis.
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
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