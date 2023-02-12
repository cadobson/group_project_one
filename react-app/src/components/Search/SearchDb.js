import "./search.css"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useHistory } from "react-router-dom"
import { loadSearchResult } from "../../store/search"


export const SearchDb = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    // console.log(result, ' this is the result on the component')


    const [input, setInput] = useState('')




    const handleSubmit = async (e) => {
        e.preventDefault();

        const searchResult = dispatch(loadSearchResult(input))

        if(searchResult){
            history.push('/search/result')
        }

    }


    return (
        <>
            <div className="search-container">
                <i className="fa-solid fa-magnifying-glass"></i>

                <form
                    className='search-form'

                    onSubmit={handleSubmit}
                >
                    <label>

                        <input
                            id="search-input"
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
        </>

    )

}
