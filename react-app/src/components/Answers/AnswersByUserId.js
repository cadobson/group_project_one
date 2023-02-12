import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useHistory } from "react-router-dom"
import { loadAnswersByUserId } from "../../store/answers"

export const AnswersByUserId = () => {
    const dispatch = useDispatch();
    const {userId} = useParams();

    const allAnswers = useSelector(state => state?.answers)

    console.log(allAnswers, ' this is all answers')

    useEffect(() =>{
        dispatch(loadAnswersByUserId(userId))
    },[dispatch,userId])

    return (
        <div>

            {allAnswers && allAnswers.Answers && allAnswers.Answers.map(ele =>{return ele && ele.answers && ele.answers.map(answer =>{
                return <a href={`/answers/${answer.id}`}>{answer.body}</a>
            })})}
        </div>
        )
}

    