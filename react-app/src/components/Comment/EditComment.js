import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useHistory } from "react-router-dom"
import { editComment } from "../../store/comment"


export const EditComment =() =>{
    const { commentId } = useParams();

    const dispatch = useDispatch();
    const history = useHistory();

    const comment = useSelector(state => state.comment)
    console.log(comment, " this is update comment page")

    const { body } = comment

    const [newBody, setBody] = useState(body);
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            body:newBody
        };

        let editNewComment = await dispatch(editComment(payload, commentId)).catch(async (res) => {
            setErrors([])
            const error = await res.json();
            if (error) setErrors([error])
        })


    }
    return (
        <form
            className='comment-form'
            onSubmit={handleSubmit}
        >
            <div className='comment-error'>
                {errors?.map((error, idx) => <li key={idx}>{error.message}</li>)}

            </div>
            <label>
                Comments
                <input
                    type='text'
                    name='body'
                    value={newBody}
                    onChange={e => setBody(e.target.value)}
                    required
                />
            </label>
            <button
                className='comment-post'
                type='submit'
            >
                Edit
            </button>
        </form >
    )




}