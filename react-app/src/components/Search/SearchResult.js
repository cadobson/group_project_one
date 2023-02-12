import "./search.css"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useHistory } from "react-router-dom"
import UserBlock from "../QACBlocks/UserBlock"


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
                                <a href={`/users/${user.Answerer.id}`}>
                                    <div style={{ display: "flex", borderBottom: "1px solid rgb(216, 212, 212", justifyContent: "flex-start", margin: "0 10px" }} id="search-result-user">
                                        {/* <li style={{ listStyleType: "none" }}>{user.Answerer.profileimg}</li> */}
                                        <UserBlock userData={user.Answerer}/>

                                        {/* <li style={{ listStyleType: "none", margin: "3px" }}>{user.Answerer.first_name}</li>
                                        <li style={{ listStyleType: "none", margin: "3px" }}>{user.Answerer.last_name}</li> */}
                                    </div>
                                </a>
                                <a className="search-result-question" href={`/questions/${ele.id}`}>

                                    <h5 style={{ padding: "7px" }}>{ele.title}</h5>
                                    <li style={{ listStyleType: "none", padding: "7px" }}>{ele.body}</li>
                                </a>
                            </div>
                        )
                    })
                })}
            </div>

        </div>
    )
}