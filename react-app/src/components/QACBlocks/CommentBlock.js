import UserBlock from "./UserBlock"
import { useState } from "react"
import { useSelector } from "react-redux"
import "./QACBlocks.css"
import EditComment from "./EditComment"

const CommentBlock = ({ commentData }) => {
  const [showEdit, setShowEdit] = useState(false)

  const { id, body, Commenter } = commentData

  const currentSessionUser = useSelector(state => state.session.user)
  const currentSessionUserId = currentSessionUser.id

  const handleDelete = () => {

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
