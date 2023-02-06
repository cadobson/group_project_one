import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useHistory } from "react-router-dom"
import { addComment } from "../../store/comment"

export const AddComment = () => {
    const { answerId } = useParams();

    const dispatch = useDispatch();
    const history = useHistory();

    const [body, setBody] = useState('')
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            body
        }

        let createNewComment;

        createNewComment = await dispatch(addComment(answerId,payload)).catch(async (res) => {
            setErrors([])
            const error = await res.json();
            console.log(error)
            if (error) setErrors([error])
        });



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
                    value={body}
                    onChange={e => setBody(e.target.value)}
                    required
                />
            </label>
            <button
                className='comment-post'
                type='submit'
            >
                post
            </button>
        </form >
    )

}