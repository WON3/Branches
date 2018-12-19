const initialState = {
    //user
    userName:'',
    userId:'',
    userProfilePic:'',

    
    //story
    storyId:'',
    storyBody:'',
    storyAddition:''

}

const GET_USER = 'GET_USER';
const GET_STORY = 'GET_STORY';
const STORY_ADDITION = 'STORY_ADDITION';


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

export default reducer;
