import "./search.css"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useHistory } from "react-router-dom"


export const SearchResult = () => {

    const { q } = useParams()

    const result = useSelector(state => {
        console.log(state, 'this is the state in the component')
        return state?.search
    });


    return (
        <div className='search-return'>
            <div>Results:</div>
            <div className="user-portion">
                {result && result.Result && result.Result.map(ele => {
                    return ele && ele.answers && ele.answers.map(user => {
                        return (
                            <div className="search-result-container">
                                <div style={{display:"flex",borderBottom:"1px solid",justifyContent:"space-around",margin:"0 10px"}}id="search-result-user">
                                    <li style={{ listStyleType: "none" }}>{user.Answerer.profileimg}</li>

                                    <li style={{ listStyleType: "none" }}>{user.Answerer.first_name}</li>
                                    <li style={{ listStyleType: "none" }}>{user.Answerer.last_name}</li>

                                </div>
                                <a className="search-result-question" href ={`/questions/${ele.id}`}>

                                    <h5>{ele.title}</h5>
                                    <li style={{ listStyleType: "none" }}>{ele.body}</li>
                                </a>
                            </div>
                        )
                    })
                })}
            </div>

        </div>
    )
}