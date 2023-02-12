import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useHistory } from "react-router-dom"
import { loadAnswersByUserId } from "../../store/answers"
import OneAnswer from "../Questions/OneAnswer"

export const AnswersByUserId = () => {
    const dispatch = useDispatch();
    const {userId} = useParams();
    const [isLoaded, setIsLoaded] = useState(false)

    const allAnswers = useSelector(state => state.answers)
    console.log("ALL ANSWERS", allAnswers.Answers)



    useEffect(() =>{
        dispatch(loadAnswersByUserId(userId))
        .then(() => {setIsLoaded(true)})
    }, [dispatch,userId])

    return (
        <div>
          {isLoaded && allAnswers.Answers.map((ele) => {return <><div>One Answer:</div><OneAnswer key={ele.id} answerData={ele} /></>})}
            {/* {isLoaded  && allAnswers.Answers.map(ele =>{return ele && ele.answers && ele.answers.map(answer =>{
                // return <a href={`/answers/${answer.id}`}>{answer.body}</a>
                return <><div>One Answer:</div><OneAnswer key={answer.id} answerData={answer} /></>
            })})} */}
        </div>
        )
}
