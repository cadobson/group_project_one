

const CommentBlock = ({ commentData }) => {
  const { body, Commenter } = commentData
  const { commenterName, commenterProfileImg } = Commenter

  return (
    <div className="comment-block">
      <div className="comment-block-author">
        {commenterName}
      </div>
      <div className="comment-block-body">
        Comment:
        {body}
      </div>
    </div>
  )
}

export default CommentBlock
