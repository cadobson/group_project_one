const GET_USER ='comments/GET_USER'
const GET_CUR ='comments/GET_CUR_USER'


const getCur = (comments) =>({
    type: GET_CUR,
    comments
})

const getUser = (comments) => ({
    type:GET_USER,
    comments
})

export const getCurUserComments = () => async dispatch => {
    const res = await fetch('/api/comments/current');
    if(res.ok) {
        const comments = await res.json();
        dispatch(getCur(comments))
    }
}

export const getUserComments = (userId) => async dispatch => {
    const res = await fetch(`/api/user/${userId}/comments`);
    if(res.ok) {
        const comments = await res.json();
        console.log(comments,'comments in reducer')
        dispatch(getCur(comments))
    }
}


const commentsReducer = (state = {}, action) => {
    switch(action.type) {

        case GET_CUR:{
            const comments = {};
            action.comments.Comments.forEach(comment => {
                comments[comment.id] = comment;

            })
            return comments
        };

        case GET_USER: {
            const comments = {...action.Comments};

            
            console.log(comments,'comment in reducer')
            return comments
        }


        default:{
            return state
        }
    }
}




export default commentsReducer