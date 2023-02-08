import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { loadAnswerFromBackend } from "../../store/answer"
import AnswerBlock from "../QACBlocks/AnswerBlock"

const Answer = () => {
  const {id} = useParams()
  const answerData = useSelector(state => state.answer)
  const currentSessionUser = useSelector(state => state.session.user)
  const [isLoaded, setIsLoaded] = useState(false)

  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    dispatch(loadAnswerFromBackend(id))
    .then(() => {setIsLoaded(true)})
    // .then(() =>{console.log})
  }, [dispatch, id])

  return (
    <div className="thread-holder">
      <div className="question-top-of-page">
        The question will go here
      </div>
      <div className="answer-holder">

        {isLoaded && (
          <AnswerBlock answerData={
            answerData
          } />
        ) }
      </div>
    </div>
  )

}

export default Answer
