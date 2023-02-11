const GET_COMMENT='comment/GET_COMMENT'
const POST_COMMENT='comment/POST_COMMENT'
const UPDATE_COMMENT ='comment/UPDATE_COMMENT'
const DELETE_COMMENT = 'comment/DELETE_COMMENT'

const getComment = (comment) =>({
    type:GET_COMMENT,
    comment
})

const newComment = (comment) =>({
    type:POST_COMMENT,
    comment
})

const updateComment=(comment) =>({
    type:UPDATE_COMMENT,
    comment
})

const removeComment = (commentId) => ({
    type:DELETE_COMMENT,
    commentId
})

export const loadComment =(commentId) =>async(dispatch) => {
    const res = await fetch(`/api/comments/${commentId}`);

    if(res.ok) {
        const comment = await res.json();
        dispatch(getComment(comment))
    }
}

export const addComment = (answerId,comment) => async(dispatch) => {
  const reqObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(comment)
  }
  const res = await fetch(`/api/answers/${answerId}`,reqObj)

  if(res.ok){
    console.log("Posted a new comment. Res: ", res)
      const  data = await res.json();
      console.log("Posted a new comment. Data: ", data)
      dispatch(newComment(data));
      return data
  }

}

export const editComment = (comment, commentId) => async(dispatch) =>{
    const res = await fetch(`/api/comments/${commentId}`,{
        method:'put',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(comment)
    });
    if(res.ok){
        const data = await res.json();
        dispatch(updateComment(data));
        return data

    }
}

export const deleteComment =(commentId) => async dispatch => {
    const res = await fetch(`/api/comments/${commentId}`,{
        method:'delete'
    });
    if(res.ok){
        dispatch(removeComment(commentId))
    }
    return res
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
            newState[action.comment.id] =action.comment;
            return newState
        };

        case UPDATE_COMMENT:{
            const newState = {...state};
            newState[action.comment.id] = action.comment;
            return newState
        };

        case DELETE_COMMENT:{
            const newState = {...state};
            delete newState[action.id];
            return newState
        }

        default:{
            return state
        }
    }
}

export default commentReducer
