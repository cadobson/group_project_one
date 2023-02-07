import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useHistory } from "react-router-dom"
import { loadSearchResult } from "../../store/search"


export const SearchDb=() => {
    const dispatch = useDispatch()

    const result = useSelector(state => state?.search);

    console.log(result, " this is result")


    useEffect(() => {
        dispatch(loadSearchResult(result),[dispatch])
    })


    return(
        <div>  
            hello
        </div>
    )









}