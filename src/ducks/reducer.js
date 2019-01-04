const initialState = {
    //user
    userName:'',
    userId:'',
    userProfilePic:'',
    bio:'',    
    //story
    storyId:'',
    storyBody:'',
    storyAddition:'',

  //nav drawer
    openClose:false,
    storyGuideTitle: '',
    storyGuideDescripton: '',
    storyGuidePOV: '',
    storyGuideFork: '',
    storyGuideMod: ''
}

const GET_USER = 'GET_USER';
const GET_STORY = 'GET_STORY';
const STORY_ADDITION = 'STORY_ADDITION';
const OPEN_CLOSE = 'OPEN_CLOSE';
const UPDATE_BIO = 'UPDATE_BIO';
const UPDATE_PROFILEPIC = 'UPDATE_PROFILEPIC';

const ADD_TITILE = 'ADD_TITLE';
const ADD_DESCRIPTION = 'ADD_DESCRIPTION';
const ADD_POV = 'ADD_POV';
const ADD_FORK_RESTRICTION = 'ADD_FORK_RESTRICTION';
const ADD_MODERATOR_RESTRICTION = 'ADD_MODERATOR_RESTRICTION';
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

export function updateBio(bio){
    return{
        type: UPDATE_BIO,
        payload: {bio}
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


export function addTitle(storyGuideTitle){
    return {
        type: ADD_TITILE,
        payload: storyGuideTitle
    }
}
export function addDescripton(storyGuideDescripton){
    return {
        type: ADD_DESCRIPTION,
        payload: storyGuideDescripton
    }
}
export function addPOV(storyGuidePOV){
    return {
        type: ADD_POV, 
        payload: storyGuidePOV
    }
}
export function addForkRestriction(storyGuideFork){
    return {
        type: ADD_FORK_RESTRICTION,
        payload: storyGuideFork
    }
}
export function addModerator(storyGuideMod){
    return {
        type: ADD_MODERATOR_RESTRICTION,
        payload: storyGuideMod
    }
}
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
            });
        case ADD_TITILE:
            return Object.assign({}, state, {
                storyGuideTitle: action.payload
            })
        case ADD_DESCRIPTION:
            return Object.assign({}, state, {
                storyGuideDescripton: action.payload
            })
        case ADD_POV:
            return Object.assign({}, state, {
                storyGuidePOV: action.payload
            })
        case ADD_FORK_RESTRICTION:
            return Object.assign({}, state, {
                storyGuideFork: action.payload
            })
        case ADD_MODERATOR_RESTRICTION:
            return Object.assign({}, state, {
                storyGuideMod: action.payload
            })
        case UPDATE_BIO:
            return Object.assign({},state, {
                bio: action.payload
            })
        default:
            return state;
    }
}

export default reducer;
