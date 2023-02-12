import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useHistory } from "react-router-dom"
import { loadQuestionsByUserId } from "../../store/questions"
import OneQuestion from "./OneQuestion"

export const UseridQuestions = () => {
    const dispatch = useDispatch();
    const { userId } = useParams()

    const allQuestions = useSelector(state => state?.questions)

    useEffect(() => {
        dispatch(loadQuestionsByUserId(userId))
    }, [dispatch, userId])

    return (
        <div>
            {allQuestions && allQuestions?.Questions?.map(ele => {
                // return <a href={`/questions/${ele.id}`}>
                //     <li key={ele.id}>{ele.title}</li>
                // </a>
                return <OneQuestion key={ele.id} question={ele} />
            })}
        </div>
    )
}
