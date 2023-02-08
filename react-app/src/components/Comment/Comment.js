import React from "react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useHistory } from "react-router-dom"
import { loadComment } from "../../store/comment"

const Comment = () =>{
    const{ commentId } = useParams();
    console.log(commentId, 'This is the comment Id')
    const commentData = useSelector(state =>state.comment);
    console.log(commentData, ' this is comment Data')
    const dispatch = useDispatch();

    useEffect(() =>{
        dispatch(loadComment(commentId))
    },[dispatch])

    return (
        <div>
            <div>{commentData?.comment?.id}</div>
            <div>{commentData?.comment?.body}</div>
        </div>
    )
}

export default Comment