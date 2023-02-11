import CommentBlock from "./CommentBlock"
import UserBlock from "./UserBlock"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import {sendAnswerDeleteRequest} from "../../store/answer"
import { loadQuestionFromBackend } from "../../store/question"
import EditAnswer from "./EditAnswer"

const AnswerBlock = ({answerData}) => {
  const {body, Answerer, Comments, id} = answerData

  const showComments = Comments.length !== 0
  const [showEdit, setShowEdit] = useState(false)

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

      {currentSessionUserId === Answerer.id && (
        <div className="answer-block-owner-controls">
          <button className="edit-delete-qac" onClick={() => setShowEdit(!showEdit)}>Edit</button>
          <button className="edit-delete-qac" onClick={handleDelete}>Delete</button>
          {showEdit && (
            <div>
              <EditAnswer answerData={answerData}/>
            </div>
          )}
        </div>
      )}


      {showComments && Comments.map(comment => {
        return (
          <CommentBlock commentData={comment}/>
        )
      })}

    </div>
    )
}


export default AnswerBlock
