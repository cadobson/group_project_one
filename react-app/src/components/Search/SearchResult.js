// import "./search.css"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useHistory } from "react-router-dom"
import OneQuestion from "../Questions/OneQuestion"


export const SearchResult = () => {

    const { q } = useParams()

    const result = useSelector(state => state.search);
    console.log("Search results: ", result)


    return (
      <>
        <div className="search-results-all-questions">
          <div className="search-results-header">
            <h1>Search Results</h1>
          </div>
          <div className="border-bar" />
          {result.Result && (
            <>
              {result.Result.map((question) => {
                return <OneQuestion key={question.id} question={question} />
              })}
            </>
          )}

        </div>
      </>
    )
}
