import CommentBlock from "./CommentBlock"
import UserBlock from "./UserBlock"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import {sendAnswerDeleteRequest} from "../../store/answer"
import { loadQuestionFromBackend } from "../../store/question"
import EditAnswer from "./EditAnswer"
import NewComment from "./NewComment"

const AnswerBlock = ({answerData}) => {
  const {body, Answerer, Comments, id} = answerData

  const showComments = Comments.length !== 0
  const [showEdit, setShowEdit] = useState(false)
  const [showNewComment, setShowNewComment] = useState(false)

  const currentSessionUser = useSelector(state => state.session.user) || {id: 0}
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

      <div className="interactions">
        {currentSessionUser.id > 0 && (
          <div className="new-comment-button-controls">
            <button className="new-comment-button" onClick={() => setShowNewComment(!showNewComment)}>New Comment</button>

          </div>
        )}


        {currentSessionUserId === Answerer.id && (
        <div className="answer-block-owner-controls">
          <button className="edit-delete-qac" onClick={() => setShowEdit(!showEdit)}>Edit</button>
          <button className="edit-delete-qac" onClick={handleDelete}>Delete</button>

        </div>
        )}
      </div>
      <div className="edit-and-new-forms">
        {showNewComment && (
          <div>
            <NewComment answerId={id} setShowNewComment={setShowNewComment} />
          </div>
        )}
        {showEdit && (
          <div>
            <EditAnswer answerData={answerData}/>
          </div>
        )}
      </div>

      {showComments && Comments.map(comment => {
        return (
          <CommentBlock key={comment.id} commentData={comment}/>
        )
      })}

    </div>
    )
}


export default AnswerBlock
