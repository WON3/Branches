const initialState = {
    //user
    userName:'',
    userId:'',
    userProfilePic:'',

    
    //story
    storyId:'',
    storyBody:'',
    storyAddition:'',

  //nav drawer
  openClose:false

}

const GET_USER = 'GET_USER';
const GET_STORY = 'GET_STORY';
const STORY_ADDITION = 'STORY_ADDITION';
const OPEN_CLOSE = 'OPEN_CLOSE';

const UPDATE_PROFILEPIC = 'UPDATE_PROFILEPIC';

function reducer (state = initialState, action) {
    let {payload} = action;

    switch (action.type) {
        case GET_USER:
            return Object.assign({}, state, {
                userId: payload.userId,
                userName: payload.userName
            });
        case GET_STORY:
            return Object.assign({}, state, {
                storyId: payload.storyId,
                storyBody: payload.storyBody
            });
            case OPEN_CLOSE:
            return Object.assign({}, state, {
                openClose: payload.open,
            });
        case UPDATE_PROFILEPIC:
            return Object.assign({}, state, {
                userProfilePic: payload.profilePic
            })
        default:
            return state;
    }
}

/////////////////////User///////////////////////////
export function getUser (userId, userName) {
    return {
        type: GET_USER,
        payload: {
            userId,
            userName
        }
    }
}
export function updateProfilePic(profilePic){
    return {
        type: UPDATE_PROFILEPIC,
        payload: {profilePic}
    }
}

///////////////Story//////////////////////
export function getStory (storyId, storyBody) {
    return {
        type: GET_STORY,
        payload: {
            storyId,
            storyBody
        }
    }
}
export function storyAddition (storyAddition) {
    return {
        type: STORY_ADDITION,
        payload: {
            storyAddition
        }
    }
}

export function makeOpenClose(open){
    return{
        type: OPEN_CLOSE,
        payload: {
            open:!open
        }
    }

}

export default reducer;
