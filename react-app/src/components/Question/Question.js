import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { loadQuestionFromBackend } from "../../store/question"
import QuestionBlock from "../QACBlocks/QuestionBlock"


const Question = () => {
  const {id} = useParams()
  const questionData = useSelector(state => state.question)
  const currentSessionUser = useSelector(state => state.session.user)
  const [isLoaded, setIsLoaded] = useState(false)

  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    dispatch(loadQuestionFromBackend(id))
    .then(() => {setIsLoaded(true)})
  }, [dispatch, id])

  return (
    <div className="thread-holder">
      <div className="question-top-of-page">
        {isLoaded && (
          <QuestionBlock questionData={questionData}/>
        )}
      </div>

    </div>
  )
}

export default Question
