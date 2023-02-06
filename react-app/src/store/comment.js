
const GET_COMMENT='comment/GET_COMMENT'
const POST_COMMENT='comment/POST_COMMENT'

const getComment = (comment) =>({
    type:GET_COMMENT,
    comment
})

const newComment = (comment) =>({
    type:POST_COMMENT,
    comment
})


export const loadComment =(commentId) =>async(dispatch) => {
    const res = await fetch(`/api/comments/${commentId}`);
    
    if(res.ok) {
        const comment = await res.json();
        dispatch(getComment(comment))
    }
}

export const addComment = (answerId,comment) => async(dispatch) => {
    console.log('hello1')
    const res = await fetch(`/api/answers/${answerId}`,{
        method:'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(comment)
    })
    console.log('hello2')
    if(res.ok){
        const  data = await res.json();
        console.log(data, ' this is data')
        dispatch(newComment(data));
        return data
    }
}

const commentReducer = (state = {},action) =>{
    switch(action.type) {
        case GET_COMMENT:{
            const newComment = {};
            newComment.comment = action.comment;
            console.log(newComment)
            return newComment
        };

        case POST_COMMENT:{
            const newState = {...state};
            newState[action.comment.id] =action.comment
        };

        default:{
            return state
        }
    }
}

export default commentReducer