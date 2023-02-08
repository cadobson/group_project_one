import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useHistory } from "react-router-dom"
import { loadSearchResult } from "../../store/search"


export const SearchDb=() => {
    const dispatch = useDispatch()
    console.log('hello')
    const result = useSelector(state => {
        console.log(state, 'this is the state in the component')
        return state?.search
    } );

    console.log(result, ' this is the result on the component')


    const [input, setInput] = useState('')




    const handleSubmit = async (e) => {
        e.preventDefault();

        dispatch(loadSearchResult(input))
    }


    return(
        <form
            className='search-form'
            onSubmit={handleSubmit}
        >

            <label>
                search
                <input
                    type='text'
                    name='body'
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    required
                />
            </label>
            <button
                className='search-form'
                type='submit'
            >
                submit
            </button>
            {result && (
                <ul>
                    {result.map(ele => (
                        <li>{ele.body}</li>

                    ))}
                </ul>
            )}
        </form >
    )









}