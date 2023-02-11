import UserBlock from "./UserBlock"
import { useState } from "react"
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux"
import "./QACBlocks.css"
import EditComment from "./EditComment"
import { deleteComment } from "../../store/comment"
import { useHistory } from "react-router-dom"

const CommentBlock = ({ commentData }) => {
  const [showEdit, setShowEdit] = useState(false)
  const dispatch = useDispatch()

  const { id, body, Commenter } = commentData

  const currentSessionUser = useSelector(state => state.session.user)
  const currentSessionUserId = currentSessionUser.id

  const history = useHistory()


  const handleDelete = (e) => {
    e.preventDefault()

    dispatch(deleteComment(id))
      .then(() => {
        window.location.reload()
        // TODO: Clean this up to work with react
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
