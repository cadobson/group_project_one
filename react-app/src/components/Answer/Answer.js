import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { loadAnswerFromBackend } from "../../store/answer"

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
  }, [dispatch, id])

  return (
    <div className="thread-holder">
      <div className="question-top-of-page">
        The question will go here
      </div>
      <div className="answer-holder">
        <p>The answer will go here.</p>
        <p>This is the page for one answer with id {id}</p>
      </div>
    </div>
  )

}

export default Answer
