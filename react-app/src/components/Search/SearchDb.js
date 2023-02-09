import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useHistory } from "react-router-dom"
import { loadSearchResult } from "../../store/search"
import "./search.css"

export const SearchDb = () => {
    const dispatch = useDispatch()
    const hisotry = useHistory()
    console.log('hello')
    const result = useSelector(state => {
        console.log(state, 'this is the state in the component')
        return state?.search
    });

    console.log(result, ' this is the result on the component')


    const [input, setInput] = useState('')




    const handleSubmit = async (e) => {
        e.preventDefault();

        const searchResult = dispatch(loadSearchResult(input)).then(() => hisotry.push('/search/result'))


    }


    return (
        <>
            <div className="search-container">
                <i class="fa-solid fa-magnifying-glass"></i>

                <form
                    className='search-form'
                    onSubmit={handleSubmit}
                >
                    <label>

                        <input
                            type='text'
                            name='body'
                            placeholder="search buora"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            required
                        />

                    </label>
                </form >

            </div>



            <div className='search-returnValues'>
                {result && (

                    <ul>

                        {result?.Result?.map(ele => (
                            <li>{ele.body}</li>

                        ))}
                    </ul>
                )}
            </div>
        </>

    )

}