
import UserBlock from "../QACBlocks/UserBlock"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import {sendAnswerDeleteRequest} from "../../store/answer"
import { loadQuestionFromBackend } from "../../store/question"


const OneAnswer = ({answerData}) => {
  const {body, Answerer, Comments, id} = answerData

  const [showEdit, setShowEdit] = useState(false)
  const [showNewComment, setShowNewComment] = useState(false)

  const currentSessionUser = useSelector(state => state.session.user)
  const currentSessionUserId = currentSessionUser.id

  const questionId = useParams()
  const dispatch = useDispatch()

  const handleDelete = (e) => {
    e.preventDefault()
    dispatch(sendAnswerDeleteRequest(id))
      .then(() => {dispatch(loadQuestionFromBackend(questionId.id))})
  }

  return (
    <div className="answer-block">
      <div className="question-block-author">
        <UserBlock userData={Answerer}/>
      </div>
      <div className="answer-block-body">
        {body}
      </div>





    </div>
    )
}


export default OneAnswer
