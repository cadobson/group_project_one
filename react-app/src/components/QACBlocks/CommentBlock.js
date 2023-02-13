import UserBlock from "./UserBlock"
import { useState } from "react"
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux"
import "./QACBlocks.css"
import EditComment from "./EditComment"
import { deleteComment } from "../../store/comment"
import { useHistory, useParams } from "react-router-dom"
import { loadQuestionFromBackend } from "../../store/question"

const CommentBlock = ({ commentData }) => {
  const [showEdit, setShowEdit] = useState(false)
  const dispatch = useDispatch()

  const { id, body, Commenter } = commentData

  const currentSessionUser = useSelector(state => state.session.user) || {id: 0}
  const currentSessionUserId = currentSessionUser.id

  const questionId = useParams()

  const handleDelete = (e) => {
    e.preventDefault()

    dispatch(deleteComment(id))
      .then(() => {
        dispatch(loadQuestionFromBackend(questionId.id))
      })

  }

  return (
    <div className="comment-block">
      <div className="question-block-author">
        <UserBlock userData={Commenter}/>
      </div>
      <div className="comment-block-body">
        {body}
      </div>
      {currentSessionUserId === Commenter.id && (
        <div className="comment-block-owner-controls">
          <button className="edit-delete-qac" onClick={() => setShowEdit(!showEdit)}>Edit</button>
          <button className="edit-delete-qac" onClick={handleDelete}>Delete</button>

          {showEdit && (
            <div>
              <EditComment commentData={commentData}/>
            </div>
          )}
        </div>
      )}

    </div>
  )
}

export default CommentBlock
