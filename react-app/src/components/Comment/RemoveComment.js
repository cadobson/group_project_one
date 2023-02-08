import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useHistory } from "react-router-dom"
import { deleteComment } from "../../store/comment"


export const RemoveComment = () =>{
    const { commentId } =  useParams();
    const [errors, setErrors] = useState([])
    const dispatch = useDispatch()

    return (
        <button
            onClick={() =>{
                dispatch(deleteComment(commentId)).catch(async (res) => {
                    setErrors([]);
                    const error = await res.json();
                    if (error) setErrors([error])
                })
            }}
        
        >
        delete comment
        </button>
    )
}