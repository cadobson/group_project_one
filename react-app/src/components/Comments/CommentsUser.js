import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useHistory } from "react-router-dom"
import { getUserComments } from "../../store/comments"


export const CommentsUser = () => {
    const dispatch = useDispatch();
    const {userId} =  useParams()
    

    const allComments = useSelector(state => state?.comments)
    console.log(allComments, ' this is allcommentsobj')
   
    
   

    useEffect(() => {
        dispatch(getUserComments(userId))
    }, [dispatch]);

    return (
        <div>
            {allComments?.undefined?.comments?.map((ele,idx) =><li key={idx}>
                    {ele}
            </li>)}
            
        </div>
    )
}