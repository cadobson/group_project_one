import "./search.css"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useHistory } from "react-router-dom"


export const SearchResult = () => {

    const result = useSelector(state => {
        console.log(state, 'this is the state in the component')
        return state?.search
    });


    return(
        <div className='search-returnValues'>
                {result && (

                    <ul>

                        {result?.Result?.map(ele => (
                            <ul>
                                <li>Question:{ele.title}</li>
                                <li>-{ele.answers}</li>
                            </ul>

                        ))}
                    </ul>
                )}
            </div>
    )
}