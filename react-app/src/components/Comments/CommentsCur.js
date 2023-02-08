import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useHistory } from "react-router-dom"
import { getCurUserComments } from "../../store/comments"


export const CommentsCur = () => {
    const dispatch = useDispatch();

    const allCommentsObj = useSelector(state => state?.comments)

    const allComments = Object.values(allCommentsObj);

    console.log(allComments)

    useEffect(() => {
        dispatch(getCurUserComments())
    }, [dispatch]);

    return (
        <div>
            {allComments?.map(comment => <li key={comment.id}> {comment.body}</li>)}
            
        </div>
    )
}